import React, {useState, useRef, useContext, useEffect} from "react";
import { useNavigate } from "react-router";
import {Link, useParams} from 'react-router-dom';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu';
import ActionComponent from '../../../components/Incidents/ActionComponent';

import UserContext from '../../../store/UserContext';
import IncidentTypesContext from '../../../store/IncidentTypesContext';
import BranchesContext from '../../../store/BranchesContext';

import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const EditIncident = (props) => {
    const navigate = useNavigate();
    const usercontext = useContext(UserContext);
    const incidenttypescontext = useContext(IncidentTypesContext);
    const branchescontext = useContext(BranchesContext);

    const branchRef = useRef();
    const alertedByRef = useRef();
    const incidentTypeRef = useRef();
    const incidentDescriptionRef = useRef();
    const actionsRef = useRef();
    

    const {incidentid} = useParams();
    const [editingIncident, setEditingIncident] = useState({})
    const [incidentDate, setIncidentDate] = useState(new Date());
    const [roles, setRoles] = useState([]);
    const [didLoadData, setDidLoadData] = useState(false);


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

    function editIncidentHandler (event) {
        event.preventDefault();
        const targetElement = event.target.getAttribute("id");
        const incident_status = targetElement == 'submitdraft' ? 'DRAFT'
                            : targetElement == 'submitapproval' ? 'SUBMITTED'
                            : null
        
        const enteredBranch = branchRef.current.value;
        const enteredAlertedBy = alertedByRef.current.value;
        const enteredIncidentType = incidentTypeRef.current.value;
        const enteredIncidentDescription = incidentDescriptionRef.current.value;

        const actions_container = actionsRef.current;
        const actions_elements_array = [...actions_container.getElementsByClassName("inc-action")];

        let actionsPayload = [];
        actions_elements_array.map(action_element => {
            const actionPayload = action_element.classList.contains("inc-further-action")
                ? {type: 'FURTHER_ACTION', description: action_element.value} 
                : action_element.classList.contains("inc-action") 
                ? {type: 'ACTION', description: action_element.value}
                : null;
            actionsPayload.push(actionPayload);
        });

        const postData = {
            branch_id: enteredBranch,
            incident_type: enteredIncidentType,
            incident_status: incident_status,
            incident_description: enteredIncidentDescription,
            incident_date: incidentDate,
            reported_by:enteredAlertedBy,
            actions: actionsPayload
        };

        console.log(postData)
        
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: JSON.stringify(postData),
        };
        let edit_incident_url = `http://localhost:3005/incidents/editIncident/${incidentid}`;
        fetch(edit_incident_url, options)
            .then(response => {
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

    function deleteIncidentHandler (event) {
        event.preventDefault();
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let delete_incident_url = `http://localhost:3005/incidents/deleteIncident/${incidentid}`
        fetch(delete_incident_url, options)
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
                        <h5 class="card-header">Edit Incident<h3 className="mt-3">STATUS: {editingIncident.incident_status}</h3></h5>
                        <div class="card-body">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <label>Branch Code</label>
                                    <select class="form-select form-control" aria-label="Default select example" ref={branchRef}>
                                    <option value={editingIncident.branch_id}>{branchescontext.branches.find(({_id}) => _id == editingIncident.branch_id).branch_code}</option>
                                    {branchescontext.branches.map((branch) => {
                                        return branch.deleted == false ? <option value={branch.id}>{branch.branch_code}</option> : null
                                    })}
                                    </select>
                                </div>
                                <div className="col">
                                    <label>Reported by</label>
                                    <input type="text" className="form-control" defaultValue={editingIncident.reported_by} ref={alertedByRef}/>
                                </div>
                            </div>
                            <div className="m-4"></div>
                            <div className="row">
                                <div className="col">
                                    <label>Date</label>
                                    <DatePicker 
                                        selected={new Date(editingIncident.incident_date)}
                                        onChange={(date) => setIncidentDate(date)}
                                        minDate={new Date(moment().subtract(1, 'months').format())}
                                        maxDate={new Date()}
                                        className="form-control"/>
                                    </div>
                                <div className="col">
                                <label>Incident Type</label>
                                <select class="form-select form-control" aria-label="Default select example" ref={incidentTypeRef}>
                                    <option defaultValue={editingIncident.incident_type_id}>{incidenttypescontext.incident_types.find(({_id}) => _id === editingIncident.incident_type_id).incident_type}</option>
                                    {incidenttypescontext.incident_types.map((incident_type) => {
                                    return incident_type.deleted == false ?  <option value={incident_type.id}>{incident_type.incident_type}</option> : null
                                    })}
                                </select>
                                </div>
                            </div>
                    <div className="m-5">
                        </div>
                        <div className="row">
                        <div className="col">
                        <label >Incident Description</label>
                        <textarea type="text" className="form-control" placeholder="Incident Description" defaultValue={editingIncident.incident_description} ref={incidentDescriptionRef}/>
                        </div>
                    </div>
                    <div className="incident_actions mb-4" ref={actionsRef}>
                        {incidentactions.map(action => {
                        return action.type === 'ACTION'
                        ? <ActionComponent action_class="inc-action" action_label="Action" action ={action}/>
                        : action.type === 'FURTHER_ACTION'
                        ? <ActionComponent action_class="inc-action inc-further-action" action_label="Further Action" action ={action}/>
                        : null
                        })}     
                    </div>
                    <div className="mb-4"></div>
                    <div className="row ">
                    <div className="mr-auto">
                        <button id="submitdraft" type="button" className="btn btn-primary" onClick={editIncidentHandler}>Save</button>
                        <button id="submitapproval" type="button" className="ml-3 btn btn-success" onClick={editIncidentHandler}>Save and submit</button>
                        <button id="delete_btn" type="button" className="ml-3 btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete_modal">Delete</button>
                    </div>
                    </div>
                    </form>
    
                    <div className="modal fade" id="delete_modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this post?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn btn-primary" onClick={deleteIncidentHandler}>Save changes</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-target="#delete_modal">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
        </div>
                    <div className="card-footer"> </div>
                    </div>
                    </div>
                    </div>
    
    
                </div>
    
            <Footer />
    </div>
        );
    }
  
};

export default EditIncident;
