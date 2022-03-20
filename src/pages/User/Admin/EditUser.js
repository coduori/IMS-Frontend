import {React, useContext, useRef, useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import {Link, useParams} from 'react-router-dom';

import { FormGroup, InputGroup, Text , Button, Checkbox} from '@blueprintjs/core';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu';
import RolesCheckBoxes from '../../../components/Users/RolesCheckboxes';
import UserContext from '../../../store/UserContext';
import BranchesContext from '../../../store/BranchesContext';




const EditUser = () => {
    const {userid} = useParams();
    const [editingUser, setEditingUser] = useState({});
    const [loggedInUserId, setLoggedInUserId] = useState("");
    const [systems, setSystems] = useState([]);
    const [roles, setRoles] = useState([])
    const [didLoadData, setDidLoadData] = useState(false);
    const navigate = useNavigate();
    const usercontext = useContext(UserContext);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const rolesRef = useRef();

    useEffect(() => {
    
        let did_refresh_access_token = false;
        let errors = []
        let get_user_url = `http://localhost:3001/admin/users/${userid}`;
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                },
            };
            try {
                const response = await fetch(get_user_url, options);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData);
                    setEditingUser(responseData.user);
                    setLoggedInUserId(responseData.loggedinUserId);
                    setSystems(responseData.systems);
                    setRoles(responseData.roles)
                    setDidLoadData(true)
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
                        errors.push({message: "Error Fetching User Data"});
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

    function editUserHandler(event) {
        event.preventDefault();
        let rolesPayload = []

        const enteredFirstName = firstNameRef.current.value
        const enteredLastName = lastNameRef.current.value
        const enteredEmail = emailRef.current.value

        const system_roles_array = [...rolesRef.current.getElementsByClassName('system-roles-group')]
        system_roles_array.map((system_roles) => {
            const checkbox_array = [...system_roles.getElementsByClassName('system-role-checkbox')]
            checkbox_array.map((checkbox) => {
                const input = checkbox.firstChild
                if (input.checked) {
                    rolesPayload.push(input.value)
                }
            })
        })

        const postData = {
            first_name: enteredFirstName,
            surname: enteredLastName,
            email: enteredEmail,
            roles: rolesPayload
        }
        console.log(postData)

        const options = {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: JSON.stringify(postData)
        };
        let edit_user_url = `http://localhost:3001/admin/users/edit/${userid}`
        async function fetchData() {
          const response = await fetch(edit_user_url, options);
          if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            navigate('/admin/users')
          } else {
            const responseData = await response.json()
            console.log(responseData)
            // throw Error(response.json());
          }
        }

        fetchData();
    }
    if (!didLoadData) {
        return "Loading"
    } else {
        return (
            <div className="wrapper">
                <Header />
                <Menu/>
                <div className="content-wrapper">
                <div className="content-header">  {/* Content Header (Page header) */}
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-12 mr-2">
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>
                </div>
                
                <div className="content"> {/* /.content-header */}  {/* Main content */}
                    <div className="container-fluid">
                    <div className="wrapper">
                        <div class="card mx-3">
                        <h5 class="card-header">Edit User</h5>
                        <div class="card-body">
                        <h5 className="mt-4 ml-3">User Details</h5>
                        <div className="user-details ml-5">
                        <FormGroup
                            label="First Name:"
                            labelFor="first-name-input"
                            inline={true}
                            
                        >
                            <InputGroup id="first-name-input" placeholder="First Name" defaultValue={editingUser.userRecord.first_name} inputRef={firstNameRef} disabled={true}/>
                        </FormGroup>

                        <FormGroup
                            label="Last Name:"
                            labelFor="last-name-input"
                            inline={true}
                        >
                            <InputGroup id="last-name-input" placeholder="Last Name" defaultValue={editingUser.userRecord.surname} inputRef={lastNameRef} disabled={true}/>
                        </FormGroup>

                        <FormGroup
                            label="Email:"
                            labelFor="email-input"
                            inline={true}
                        >
                            <InputGroup id="email-input" placeholder="Email" defaultValue={editingUser.userRecord.email} inputRef={emailRef} disabled={true}/>
                        </FormGroup>
                        </div>

                        <h5 className="mt-4 ml-3">Assign Roles</h5>

                        <div className="system-roles-groups ml-5 mb-3" ref={rolesRef}>
                            {console.log(editingUser.userRecord._id, loggedInUserId)}
                        { systems.map((system) => {
                            
                            return <FormGroup
                                label={`${system.system_name} Roles`}
                                labelFor={`${system.system_name}-input`}
                                labelFor="main-roles-input"
                                className="system-roles-group"
                            >
                                {roles.map((role) => {
                                    
                                    const roleMatchesCheck = editingUser.roles.map((userRole) => {
                                        if (userRole.role_id === role._id) {
                                            return {check: "SUCCESS", userRole, role}
                                        } else {
                                            return {check: "FAIL", userRole, role}
                                        }
                                    })
                                    const gb = roleMatchesCheck.filter(function(val) { return val.check == "SUCCESS" })
                                    const bg = roleMatchesCheck.filter(function(val) { return val.check == "FAIL" })

                                    if (gb.length > 0) {
                                        const gf = roles.find(rol => rol._id == gb[0].userRole.role_id)
                                        if (gf.system_id === system._id) {
                                            return <Checkbox
                                                        label={role.role_name}
                                                        defaultChecked={true}
                                                        value={role._id}
                                                        className="system-role-checkbox"
                                                    />
                                        } else {
                                            return null
                                        }
                                    } else {
                                        // const fg = role._id === bg[0].userRole.role_id ? role : null
                                        if (role.system_id === system._id) {
                                            return <Checkbox
                                                        label={role.role_name}
                                                        value={role._id}
                                                        className="system-role-checkbox"
                                                    />
                                        } else {
                                            return null
                                        }
                                    }
                                })}                            
                            </FormGroup>
                        })}

                        </div>
                        { editingUser.userRecord._id === loggedInUserId 
                        ? null 
                        : <Button className= {`ml-3`} text="Save" intent="success" type="button" onClick={editUserHandler}/>
                        }
                        </div>


                        <div className="card-footer"> </div>
                        </div>
                    </div>
                    </div>  {/* /.container-fluid */}
                </div>  {/* /.content */}
            
                </div>
                <Footer />
            </div>
        )
    }
}

export default EditUser
