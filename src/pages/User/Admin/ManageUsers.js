import React from 'react'
import { Link } from 'react-router-dom';
import { Button} from '@blueprintjs/core';

import UserTable from '../../../components/Users/UserTable' 

const ManageUsers = () => {

    const userList = [{
        _id: "1",
        first_name: "Antony",
        last_name: "Kivai",
        email: "antony@gmail.com",
    },{
        _id: "2",
        name: "",
        first_name: "Claude",
        last_name: "Oduori",
        email: "claude@gmail.com",
    },{
        _id: "3",
        first_name: "Zulqadar",
        last_name: "Ali",
        email: "zulqadar@gmail.com",
    },{
        _id: "4",
        first_name: "Winnie",
        last_name: "Ochieng",
        email: "winnie@gmail.com"
    }]

    return (
	<div className="wrapper">
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
                        <UserTable 
                        usersData={userList}
                        />

                    </div>
                </div>  {/* /.container-fluid */}
            </div>  {/* /.content */}     
		</div>
	</div>
    )
}

export default ManageUsers;
