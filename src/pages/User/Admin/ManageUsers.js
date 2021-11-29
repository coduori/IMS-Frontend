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

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let get_users_url = `http://localhost:3001/admin/users/`

        async function fetchData() {
          const response = await fetch(get_users_url, options);
          if (response.ok) {
            const responseData = await response.json()
            setUsers(responseData.users);
          } else {
            throw Error(response.status);
          }
        }
          
        fetchData();
    }, []);

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

export default ManageUsers;
