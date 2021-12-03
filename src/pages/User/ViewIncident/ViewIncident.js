import React, {useState, useRef, useContext, useEffect, useCallback} from "react";
import { useNavigate } from "react-router";
import {Link, useParams} from 'react-router-dom';
import { Dialog, Classes, FormGroup, InputGroup, Button, TextArea} from '@blueprintjs/core';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu';
import ActionComponent from '../../../components/Incidents/ActionComponent';

import UserContext from '../../../store/UserContext';
import IncidentTypesContext from '../../../store/IncidentTypesContext';
import BranchesContext from '../../../store/BranchesContext';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ViewIncident = (props) => {
    const {incidentid} = useParams();
    const navigate = useNavigate();

    const usercontext = useContext(UserContext);
    const incidenttypescontext = useContext(IncidentTypesContext);
    const branchescontext = useContext(BranchesContext);

    const [editingIncident, setEditingIncident] = useState({})
    const [incidentDate, setIncidentDate] = useState(new Date());
    const [didLoadData, setDidLoadData] = useState(false);
    const [roles, setRoles] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
    const [isCloseDialogOpen, setIsCloseDialogOpen] = useState(false);

    const handleDeleteDialogButtonClick = useCallback(() => setIsDeleteDialogOpen(!isDeleteDialogOpen), []);
    const handleDeleteDialogClose = useCallback(() => setIsDeleteDialogOpen(false), []);

    const handleApproveDialogButtonClick = useCallback(() => setIsApproveDialogOpen(!isApproveDialogOpen), []);
    const handleApproveDialogClose = useCallback(() => setIsApproveDialogOpen(false), []);

    const handleCloseDialogButtonClick = useCallback(() => setIsCloseDialogOpen(!isCloseDialogOpen), []);
    const handleCloseDialogClose = useCallback(() => setIsCloseDialogOpen(false), []);

    const rejectRef = useRef();
    const closeRef = useRef();

    useEffect(() => {
    
        let did_refresh_access_token = false;
        let errors = []
        let get_incident_url = `http://localhost:3005/incidents/${incidentid}`;
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                },
            };
            try {
                const response = await fetch(get_incident_url, options);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData);
                    setEditingIncident(responseData.incident);

                    let get_user_roles_url = `http://localhost:3001/admin/users/roles`
                    const user_roles_response = await fetch(get_user_roles_url, options);
                    if (user_roles_response.ok) {
                        const userRolesResponseData = await user_roles_response.json();
                        setRoles(userRolesResponseData.roles)
                        setDidLoadData(true);
                    } else {
                        errors.push({message: "Error Fetching User Roles"})
                    }
                } else {
                    const responseData = await response.json();
                    console.log(responseData);

                    if (responseData.error && responseData.error === "EXPIRED_ACCESS_TOKEN") {
                        const refresh_options = {
                            method: 'GET',
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                            },
                        };
                        const refresh_access_token_url = 'http://127.0.0.1:3000/auth/token/refresh'
                        const refreshTokenResponse = await fetch(refresh_access_token_url, refresh_options);
                        
                        if(refreshTokenResponse.ok) {
                            const responseData = await refreshTokenResponse.json();
                            usercontext.setAccessToken(responseData.accessToken);
                            did_refresh_access_token = true;
                        } else {
                            console.log("Error Refreshing Token")
                            errors.push({message: "Error Refreshing Token"})
                        }
                    } else {
                        console.log(responseData);
                        errors.push({message: "Error Fetching Incidents Data"})
                    }
                }
            } catch (failedResponse) {
            
            }
        }

        fetchData();
        if (did_refresh_access_token) {
            fetchData();
        }
        console.log(errors)
    }, [usercontext.refreshToken, usercontext.accessToken, usercontext.setAccessToken]);

    const incidentactions = [
        {
            type: 'ACTION',
            description: editingIncident.action
        },
        {
            type: 'FURTHER_ACTION',
            description: editingIncident.further_action
        }
    ]

    function DialogFooter(props) {
        return (
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button onClick={props.handleClose}>Dismiss</Button>
                </div>
            </div>
        );
    }

    function approveIncidentHandler (event) {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };

        const approve_incident_url = `http://localhost:3005/incidents/approveIncident/${incidentid}`;
        fetch(approve_incident_url, options)
        .then(response => {
            console.log(response.status);
            if (response.status === 403) {
                // usercontext.setJwt("");
                // usercontext.setIsLoggedIn(false);
                // localStorage.clear();
            }
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);
            return navigate('/incidents');
        })
        .catch(e => {
            console.log(e);
        });
    }

    function rejectIncidentHandler (event) {
        event.preventDefault();
        const rejectionMessage = rejectRef.current.value;
        const messagePayload = JSON.stringify({comment: rejectionMessage})
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: messagePayload
        };
        let reject_incident_url = `http://localhost:3005/incidents/rejectIncident/${incidentid}`
        fetch(reject_incident_url, options)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);
            document.querySelector(".modal-backdrop").remove();
            return navigate('/home');
        })
        .catch(e => {
            console.log(e);
        });
    }

    function closeIncidentHandler (event) {
        event.preventDefault();
        const closingMessage = closeRef.current.value;
        const messagePayload = JSON.stringify({comment: closingMessage})
        console.log(closingMessage)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: messagePayload
        };
        let close_incident_url = `http://localhost:3005/incidents/closeIncident/${incidentid}`
        fetch(close_incident_url, options)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);
            return navigate('/home');
        })
        .catch(e => {
            console.log(e);
        });
    }

    function deleteIncidentHandler (event) {
        event.preventDefault()
        alert("Deleting")
    }

    function actionButtons (status) {
        if (status === 'DRAFT') {
            return (
                <>
                <Link to={`/edit-incident/${editingIncident._id}`}>
                    <Button className= {`ml-3`} text="Edit" intent="primary"/>
                </Link>           
                </>
            )
        } else if (status === 'SUBMITTED') {
            return (
                <>
                    <Button id="approve-btn" onClick={handleApproveDialogButtonClick} className= {`ml-3`} text="Approve" intent="success"/>
                    <Button id="reject-btn" onClick={handleApproveDialogButtonClick} className= {`ml-3`} text="Reject" intent="danger"/>
                    {/* <button type="button" className="ml-3 btn btn-xs btn-success" data-bs-toggle="modal" data-bs-target="#approve_modal">Approve</button>
                    <button type="button" className="ml-3 btn btn-xs btn-danger" data-bs-toggle="modal" data-bs-target="#reject_modal">Reject</button> */}
                </>
            )
        } else if (status === 'OPEN' && editingIncident.recorded_by !== usercontext.name) {
            return (
                <>
                    <Button id="approve-btn" onClick={handleCloseDialogButtonClick} className= {`ml-3`} text="Close" intent="success"/>
                    {/* <button type="button" className="ml-3 btn btn-xs btn-success" data-bs-toggle="modal" data-bs-target="#closure_modal">Close</button> */}
                </>
            )
        } else {
            return null;
        }
    }

    if (!didLoadData) {
        return "isLoading"
    } else {
        return (
            <div className="wrapper">
                <Header />
                <Menu />
                {/* Content Wrapper. Contains page content */}
                <div className="content-wrapper">
                <div classname="content-header">
                    <div className="container-fluid">
                    <div className="row mb-2">

                    </div>{/* /.row */}
                    </div>
                </div>

                <div className="content">
                    <div className="container-fluid">
                    <div className="wrapper"></div>

                    <div class="card mx-3">
                    <h5 class="card-header">View Incident <h3 className="mt-3">STATUS: {editingIncident.incident_status}</h3></h5>
                    
                    <div class="card-body">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <label>Branch Code</label>
                                    <input type="text"
                                        className="form-control"
                                        defaultValue={branchescontext.branches.find(({_id}) => _id == editingIncident.branch_id).branch_code}
                                        readOnly
                                    />
                                </div>
                                <div className="col">
                                    <label>Reported by</label>
                                    <input type="text" className="form-control" defaultValue={editingIncident.reported_by} readOnly/>
                                </div>
                            </div>
                            <div className="m-4"></div>
                            <div className="row">
                                <div className="col">
                                    <label>Date</label>
                                    <DatePicker selected={incidentDate} readOnly className="form-control"/>
                                </div>
                                <div className="col">
                                    <label>Incident Type</label>
                                    <input type="text"
                                        className="form-control"
                                        defaultValue={incidenttypescontext.incident_types.find(({_id}) => _id === editingIncident.incident_type_id).incident_type}
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className="m-5"></div>
                            <div className="row">
                                <div className="col">
                                    <label >Incident Description</label>
                                    <textarea type="text" className="form-control" placeholder="Incident Description" defaultValue={editingIncident.incident_description} readOnly/>
                                </div>
                            </div>
                            <div className="incident_actions mb-4">
                                {incidentactions.map(action => {
                                    return action.type === 'ACTION'
                                    ? <ActionComponent action_class="inc-action" action_label="Action" action ={action} readonly={true} />
                                    : action.type === 'FURTHER_ACTION'
                                    ? <ActionComponent action_class="inc-action inc-further-action" action_label="Further Action" action ={action} readonly={true}/>
                                    : null
                                })}     
                            </div>
                            <div className="mb-4"></div>
                            <div className="row ">
                                <div className="mr-auto">
                                    {actionButtons(editingIncident.incident_status)}
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="card-footer"> </div>
                    <Dialog isOpen={isDeleteDialogOpen}
                        onClose={handleDeleteDialogClose}
                        title="Delete Incident"
                        isCloseButtonShown={true}
                    >
                        <div className={Classes.DIALOG_BODY}>
                            <div>
                                <Button className= {`ml-3 ${Classes.DIALOG_CLOSE_BUTTON}` } text="Delete" onClick={deleteIncidentHandler} intent="danger"/>
                            </div>
                        </div>
                        <DialogFooter handleClose={handleDeleteDialogClose} /> 
                    </Dialog>

                    <Dialog isOpen={isApproveDialogOpen}
                        onClose={handleApproveDialogClose}
                        title="Approve Incident"
                        isCloseButtonShown={true}
                    >
                        <div className={Classes.DIALOG_BODY}>
                            <div>
                                <p>Confirm Action: Approve Incident</p>
                                <Button className= {`ml-3 ${Classes.DIALOG_CLOSE_BUTTON}` } text="Approve" onClick={approveIncidentHandler} intent="success"/>
                            </div>
                        </div>
                        <DialogFooter handleClose={handleApproveDialogClose} /> 
                    </Dialog>

                    <Dialog isOpen={isCloseDialogOpen}
                        onClose={handleCloseDialogClose}
                        title="Close Incident"
                        isCloseButtonShown={true}
                    >
                        <div className={Classes.DIALOG_BODY}>
                            <div>
                                <label htmlFor="close-textarea"></label>
                                <TextArea id="close-textarea" placeholder="Reason" inputRef={closeRef}></TextArea>
                                <Button className= {`ml-3 ${Classes.DIALOG_CLOSE_BUTTON}` } text="Close" onClick={closeIncidentHandler} intent="success"/>
                            </div>
                        </div>
                        <DialogFooter handleClose={handleCloseDialogClose} /> 
                    </Dialog>
                    </div>
                    </div>
                    </div>


                </div>
                <Footer />
            </div>
        )
    }
}

export default ViewIncident;
