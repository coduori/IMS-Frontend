import {React, useContext, useRef} from 'react';
import { useNavigate } from "react-router";
import {Link, useParams} from 'react-router-dom';

import { FormGroup, InputGroup, Text , Button, Checkbox} from '@blueprintjs/core';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu';
import RolesCheckBoxes from '../../../components/Users/RolesCheckboxes';
import UserContext from '../../../store/UserContext';
import BranchesContext from '../../../store/BranchesContext';




const AddUser = () => {

    const rolesObject = [{
        _id: "1",
        role_code: "IMS_ASSIGN_ROLES",
        system_id: "2"
    }, {
        _id: "2",
        role_code: "IMS_CHECK_INCIDENT",
        system_id: "2"
    }, {
        _id: "3",
        role_code: "IMS_RECORD_INCIDENT",
        system_id: "2"
    }, {
        _id: "4",
        role_code: "MAIN_MANAGE_BRANCHES",
        system_id: "1"
    }, {
        _id: "5",
        role_code: "IMS_MANAGE_INCIDENT_TYPES",
        system_id: "2"
    }, {
        _id: "6",
        role_code: "MAIN_MANAGE_USERS",
        system_id: "1"
    }, {
      _id: "7",
      role_code: "IMS_VIEW_REPORTS",
      system_id: "2"
    }, {
      _id: "8",
      role_code: "MAIN_ASSIGN_ROLES",
      system_id: "1"
  }]

    const systemsObject = [{
        _id: "1",
        sytem_name: "Main Bank System",
        sytem_code: "MAIN"
    },{
        _id: "2",
        sytem_name: "Incidents Management System",
        sytem_code: "IMS"
    }]


    const navigate = useNavigate();
    const usercontext = useContext(UserContext);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const rolesRef = useRef();


    // useEffect(() => {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
    //         },
    //     };
    //     let get_user_url = `http://localhost:3001/admin/users/getOneUser/${user._id}`
    //     fetch(get_user_url, options)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw Error(response.status);
    //         }
    //         return response.json(); 
    //     })
    //     .then(responseData => {
    //         console.log(responseData)
    //         setUser(responseData.userRecord);
    //     })
    //     .catch (err => {
    //         console.log("Error");
    //         console.log(err);
    //     });
    // }, []);

    function addUserHandler(event) {
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
            last_name: enteredLastName,
            email: enteredEmail,
            roles: rolesPayload
        }
        console.log(postData)

        // const options = {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        //     },
        // };
        // let add_user_url = `http://localhost:3001/admin/users/addUser/${user._id}`
        // fetch(add_user_url, options)
        // .then(response => {
        //     if (!response.ok) {
        //         throw Error(response.status);
        //     }
        //     return response.json(); 
        // })
        // .then(responseData => {
        //     console.log(responseData)
        //     return navigate('/admin/users')
        //     // setUser(responseData.userRecord);
        // })
        // .catch (err => {
        //     console.log("Error");
        //     console.log(err);
        // });
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
                    </div>

                    <h5 className="mt-4 ml-3">Assign Roles</h5>

                    <div className="system-roles-groups ml-5 mb-3" ref={rolesRef}>

                    {systemsObject.map((system) => {
                        
                        return <FormGroup
                            label={`${system.sytem_name} Roles`}
                            labelFor={`${system.sytem_name}-input`}
                            labelFor="main-roles-input"
                            className="system-roles-group"
                        >
                            {rolesObject.map((role) => {
                                    if (role.system_id === system._id) {
                                        return <Checkbox
                                                    label={role.role_code}
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
