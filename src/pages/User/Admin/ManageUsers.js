import {React, useContext, useRef, useEffect, useState} from 'react';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { Button} from '@blueprintjs/core';

import UserTable from '../../../components/Users/UserTable'
import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu';

import UserContext from '../../../store/UserContext';


const ManageUsers = () => {

    // const userList = [{
    //     _id: "1",
    //     first_name: "Antony",
    //     last_name: "Kivai",
    //     email: "antony@gmail.com",
    // },{
    //     _id: "2",
    //     name: "",
    //     first_name: "Claude",
    //     last_name: "Oduori",
    //     email: "claude@gmail.com",
    // },{
    //     _id: "3",
    //     first_name: "Zulqadar",
    //     last_name: "Ali",
    //     email: "zulqadar@gmail.com",
    // },{
    //     _id: "4",
    //     first_name: "Winnie",
    //     last_name: "Ochieng",
    //     email: "winnie@gmail.com"
    // }]

    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    const usercontext = useContext(UserContext);
    const [didLoadData, setDidLoadData] = useState(false);

    useEffect(() => {
    
        let did_refresh_access_token = false;
        let errors = []
        let get_users_url = `http://localhost:3001/admin/users/`;
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                },
            };
            try {
                const response = await fetch(get_users_url, options);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData);
                    setUsers(responseData.users);
                    setDidLoadData(true);
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
                    errors.push({message: "Error Fetching Users Data"});
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
                                <Link to={`/admin/users/add`}>
                                    <Button className= {`ml-3`} text="Register User" intent="success" type="button"/>
                                </Link>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>
                    </div>
                    <div className="content"> {/* /.content-header */}  {/* Main content */}
                        <div className="container-fluid">
                            <div className="wrapper">
                                {console.log(users)}
                                <UserTable 
                                usersData={users}
                                />

                            </div>
                        </div>  {/* /.container-fluid */}
                    </div>  {/* /.content */}     
                </div>
                <Footer />
            </div>
        )
    }
}

export default ManageUsers;
