import {React, useEffect, useContext, useState, useRef} from 'react';
import { useNavigate } from "react-router"
import {FormGroup, InputGroup, Button} from "@blueprintjs/core"
import {Classes, Popover2} from "@blueprintjs/popover2"

// import "../../node_modules/@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import UserContext from '../../store/UserContext';


function BranchesTableRow (props) {

    const [branch, setBranch] = useState(props.branch);
    const editBranchNameRef = useRef();
    const editBranchCodeRef = useRef();
    const branchRowRef = useRef();
    const number = props.num + 1;
    const usercontext = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.jwt}`
            },
        };
        let get_branch_url = `http://localhost:3001/admin/branches/getOneBranch/${branch._id}`
        fetch(get_branch_url, options)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json(); 
        })
        .then(responseData => {
            console.log(responseData)
            setBranch(responseData.branchRecord);
        })
        .catch (err => {
            console.log("Error");
            console.log(err);
        });
    }, []);

    

    function editBranchHandler (event) {
        
        event.preventDefault();
        console.log(editBranchNameRef.current.value)

        const enteredBranchName = editBranchNameRef.current.value;
        const enteredBranchCode = editBranchCodeRef.current.value;

        const postData = {
            branch_name: enteredBranchName,
            branch_code: enteredBranchCode
        };
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: JSON.stringify(postData),
        };
        let edit_branch_url = `http://localhost:3001/admin/branches/updateBranch/${branch._id}`
        fetch(edit_branch_url, options)
          .then(response => {
              if (!response.ok) {
                  throw Error(response.status);
              }
              return response.json();
          })
          .then(responseData => {
              console.log(responseData);
              setBranch(responseData.updatedBranch)
          })
          .catch(e => {
              console.log(e);
          });
    }

    function deleteBranchHandler (event) {
        event.preventDefault();
        const row_element = branchRowRef.current
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let delete_branch_url = `http://localhost:3001/admin/branches/deleteBranch/${branch._id}`
        fetch(delete_branch_url, options)
          .then(response => {
              if (!response.ok) {
                  throw Error(response.status);
              }
              return response.json();
          })
          .then(responseData => {
              console.log(responseData);
              row_element.remove()
          })
          .catch(e => {
              console.log(e);
          });
      }

    function actionButtons () {
        return (
            <>

            <Popover2
                interactionKind="click"
                popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
                placement="bottom"
                content={
                    <div>
                        <h5>Edit</h5>
                        <FormGroup
                            label="Branch Name:"
                            labelFor="branch-name-input"
                            inline={true}
                            
                        >
                            <InputGroup id="branch-name-input" placeholder="Branch Name" defaultValue={branch.branch_name} inputRef={editBranchNameRef}/>
                        </FormGroup>

                        <FormGroup
                            label="Branch Code:"
                            labelFor="branch-code-input"
                            inline={true}
                        >
                            <InputGroup id="branch-code-input" placeholder="Branch Code" defaultValue={branch.branch_code} inputRef={editBranchCodeRef}/>
                        </FormGroup>
 
                        <Button text="Save" onClick={editBranchHandler} intent="success"/>
                        <Button className= {`ml-3 ${Classes.POPOVER2_DISMISS}` } text="Dismiss" />
                    </div>
                }
                renderTarget={({ isOpen, ref, ...targetProps }) => (
                    <Button {...targetProps} elementRef={ref} intent="primary" text="Edit"/>
                )}
            />
             <Popover2
                interactionKind="click"
                popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
                placement="bottom"
                content={
                    <div>
                        <h5>Delete</h5>
                        <p>Are you sure you want to delete this branch</p>
                        <Button className= {`ml-3 ${Classes.POPOVER2_DISMISS}` } text="Delete" onClick={deleteBranchHandler} intent="danger"/>
                        <Button className= {`ml-3 ${Classes.POPOVER2_DISMISS}` } text="Dismiss" intent="secondary"/>
                    </div>
                }
                renderTarget={({ isOpen, ref, ...targetProps }) => (
                    <Button {...targetProps} elementRef={ref} intent="danger" text="Delete" className= {`ml-3` }/>
                )}
            />
            
            </>
        )
    }

    return (
        <tr ref={branchRowRef}>
            <th scope="row">{number}</th>
            <td> {branch.branch_name} </td>
            <td> {branch.branch_code} </td>
            <td style={{whiteSpace: 'nowrap'}}>
                {actionButtons()}
            </td>
        </tr>
    );
}

export default BranchesTableRow;