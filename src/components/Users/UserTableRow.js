import {React, useEffect, useContext, useState, useRef} from 'react';
import {Link} from 'react-router-dom';

import {FormGroup, InputGroup, Button} from "@blueprintjs/core"
import {Classes, Popover2} from "@blueprintjs/popover2"

import UserContext from '../../store/UserContext';


function UserTableRow (props) {

    const [user, setUser] = useState(props.user);
    const number = props.num + 1;
    const usercontext = useContext(UserContext);
    const userRowRef = useRef();

//     useEffect(() => {
//         const options = {
//             method: 'GET',
//             headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
//             },
//         };
//         let get_user_url = `http://localhost:3001/admin/users/getOneUser/${user._id}`
//         fetch(get_user_url, options)
//         .then(response => {
//             if (!response.ok) {
//                 throw Error(response.status);
//             }
//             return response.json(); 
//         })
//         .then(responseData => {
//             console.log(responseData)
//             setBranch(responseData.userRecord);
//         })
//         .catch (err => {
//             console.log("Error");
//             console.log(err);
//         });
//     }, []);


    // function deleteUserHandler (event) {
    //     event.preventDefault();
    //     const row_element = userRowRef.current
    //     const options = {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
    //         },
    //     };
    //     let delete_branch_url = `http://localhost:3001/admin/users/deleteUser/${user._id}`
    //     fetch(delete_branch_url, options)
    //       .then(response => {
    //           if (!response.ok) {
    //               throw Error(response.status);
    //           }
    //           return response.json();
    //       })
    //       .then(responseData => {
    //           console.log(responseData);
    //           row_element.remove()
    //       })
    //       .catch(e => {
    //           console.log(e);
    //       });
    //   }

    function actionButtons () {
        return (
            <>
            <Link to={`/admin/users/edit/${user._id}`}>
                <Button className= {`ml-3`} text="Edit" intent="success" type="button"/>
            </Link>
            </>
        )
    }

    return (
        <tr ref={userRowRef}>
            <th scope="row">{number}</th>
            <td> {user.first_name} </td>
            <td> {user.surname} </td>
            <td> {user.email} </td>
            <td style={{whiteSpace: 'nowrap'}}>
                {actionButtons()}
            </td>
        </tr>
    );
}

export default UserTableRow;