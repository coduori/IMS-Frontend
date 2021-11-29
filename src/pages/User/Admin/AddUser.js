import {React, useContext, useRef, useEffect, useState} from 'react';
import { useNavigate } from "react-router";
import {Link, useParams} from 'react-router-dom';

import { FormGroup, InputGroup, Text , Button, Checkbox} from '@blueprintjs/core';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu';
import UserContext from '../../../store/UserContext';
import BranchesContext from '../../../store/BranchesContext';




const AddUser = () => {

    const navigate = useNavigate();
    const usercontext = useContext(UserContext);
    const [roles, setRoles] = useState([]);
    const [systems, setSystems] = useState([]);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const rolesRef = useRef();
    const passwordRef = useRef();


    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let add_user_url = `http://localhost:3001/admin/users/register`

        async function fetchData() {
          const response = await fetch(add_user_url, options);
          if (response.ok) {
            const responseData = await response.json()
            setRoles(responseData.roles);
            setSystems(responseData.systems);
          } else {
            throw Error(response.status);
          }
        }
          
        fetchData();
    }, []);

    function addUserHandler(event) {
        event.preventDefault();
        let rolesPayload = []

        const enteredFirstName = firstNameRef.current.value
        const enteredLastName = lastNameRef.current.value
        const enteredEmail = emailRef.current.value
        const enteredPassword = passwordRef.current.value

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
            roles: rolesPayload,
            password: enteredPassword,
        }
        console.log(postData)

        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: JSON.stringify(postData)
        };
        let add_user_url = `http://localhost:3001/admin/users/`
        fetch(add_user_url, options)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json(); 
        })
        .then(responseData => {
            console.log(responseData)
            return navigate('/admin/users')
            // setUser(responseData.userRecord);
        })
        .catch (err => {
            console.log("Error");
            console.log(err);
        });
    }

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
                    <h5 class="card-header">Register User</h5>
                    <div class="card-body">
                    <h5 className="mt-4 ml-3">User Details</h5>
                    <div className="user-details ml-5">
                    <FormGroup
                        label="First Name:"
                        labelFor="first-name-input"
                        inline={true}
                        
                    >
                        <InputGroup id="first-name-input" placeholder="First Name" inputRef={firstNameRef}/>
                    </FormGroup>

                    <FormGroup
                        label="Last Name:"
                        labelFor="last-name-input"
                        inline={true}
                        
                    >
                        <InputGroup id="last-name-input" placeholder="Last Name" inputRef={lastNameRef}/>
                    </FormGroup>

                    <FormGroup
                        label="Email:"
                        labelFor="email-input"
                        inline={true}
                    >
                        <InputGroup id="email-input" placeholder="Email" inputRef={emailRef}/>
                    </FormGroup>

                    <FormGroup
                        label="Password:"
                        labelFor="password-input"
                        inline={true}
                    >
                        <InputGroup id="password-input" placeholder="Password" inputRef={passwordRef}/>
                    </FormGroup>
                    
                    </div>

                    <h5 className="mt-4 ml-3">Assign Roles</h5>

                    <div className="system-roles-groups ml-5 mb-3" ref={rolesRef}>

                    {systems.map((system) => {
                        return <FormGroup
                            label={`${system.system_name} Roles`}
                            labelFor={`${system.system_name}-input`}
                            labelFor="main-roles-input"
                            className="system-roles-group"
                        >
                            {roles.map((role) => {
                                    if (role.system_id === system._id) {
                                        return <Checkbox
                                                    label={role.role_name}
                                                    value={role._id}
                                                    className="system-role-checkbox"
                                                    />
                                    } else {
                                        return null
                                    }
                            })}                            
                        </FormGroup>
                    })}

                    </div>

                    <Button className= {`ml-3`} text="Save" intent="success" type="button" onClick={addUserHandler}/>
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

export default AddUser
