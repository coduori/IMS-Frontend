import React from 'react';

import UserTableRow from './UserTableRow'

const UserTable = (props) => {
    const loadedUsers = props.usersData;
    console.log(loadedUsers)
    return (
        <>
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">List of Users</h3>
            </div>
            <div className="card-body">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        loadedUsers.map((loadedUser, index) => {
                            return <UserTableRow user={loadedUser}
                                key={loadedUser._id}
                                num={index}
                                />
                        })
                        }
                    </tbody>
                </table>
            </div> 
        </div>
        </>
    )
}

export default UserTable
