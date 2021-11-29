import {React, useEffect, useContext, useState, useCallback, useRef} from 'react';
import { Dialog, Classes, FormGroup, InputGroup, Button} from '@blueprintjs/core';

import BranchesContext from '../../../store/BranchesContext';
import UserContext from '../../../store/UserContext'

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import BranchesTable from '../../../components/Branches/BranchesTable';


const AddBranch = () => {

    const branchescontext = useContext(BranchesContext);
    const [branchList, setBranchList] = useState(branchescontext.branches)
    const usercontext = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const handleButtonClick = useCallback(() => setIsOpen(!isOpen), []);
    const handleClose = useCallback(() => setIsOpen(false), []);
    const addBranchNameRef = useRef();
    const addBranchCodeRef = useRef();
    
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let getBranchesUrl = 'http://localhost:3001/admin/branches/getAllBranches';
        fetch(getBranchesUrl, options)
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                // usercontext.setJwt("");
                // usercontext.setIsLoggedIn(false);
                // localStorage.clear();
                console.log("Error");
                // history.replace('/users/login')
            } 
            return response.json(); 
        })
        .then(responseData => {
          console.log(responseData);
          setBranchList(responseData.branches);
        })
        .catch (err => {
            console.log("Err");
            console.log(err);
        });
      },
      []);

    function DialogFooter(props) {
        return (
            <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button onClick={props.handleClose}>Close</Button>
                </div>
            </div>
        );
    }

    function DialogBody() {
        return (
            <div className={Classes.DIALOG_BODY}>
                <div>
                    <FormGroup
                        label="Branch Name:"
                        labelFor="branch-name-input"
                        inline={true}
                        
                    >
                        <InputGroup id="branch-name-input" placeholder="Branch Name" inputRef={addBranchNameRef}/>
                    </FormGroup>

                    <FormGroup
                        label="Branch Code:"
                        labelFor="branch-code-input"
                        inline={true}
                    >
                        <InputGroup id="branch-code-input" placeholder="Branch Code" inputRef={addBranchCodeRef}/>
                    </FormGroup>

                    <Button className= {`ml-3 ${Classes.DIALOG_CLOSE_BUTTON}` } text="Save" onClick={addBranchHandler} intent="success"/>
                    <Button className= {`ml-3 ${Classes.DIALOG_CLOSE_BUTTON}` } text="Dismiss" />
                </div>
            </div>
        );
    }
    

    function addBranchHandler (event) {
        event.preventDefault();
        console.log(addBranchNameRef.current.value)

        const enteredBranchName = addBranchNameRef.current.value;
        const enteredBranchCode = addBranchCodeRef.current.value;

        const postData = {
            branch_name: enteredBranchName,
            branch_code: enteredBranchCode
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: JSON.stringify(postData),
        };
        let add_branch_url = `http://localhost:3001/admin/branches/add`
        fetch(add_branch_url, options)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);
                setBranchList(responseData.branches);
            })
            .catch(e => {
                console.log(e);
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
                            <button className="mt-2 btn btn-primary float-right" onClick={handleButtonClick}>Add Branch</button>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>
            </div>
            
            <div className="content"> {/* /.content-header */}  {/* Main content */}
            <div className="container-fluid">
              <div className="wrapper">
                <BranchesTable 
                branchesData={branchList}
                />

                <Dialog isOpen={isOpen}
                        onClose={handleClose}
                        title="Add Branch"
                        isCloseButtonShown={true}>
                    <DialogBody />
                    <DialogFooter handleClose={handleClose} /> 
                </Dialog>

              </div>
            </div>  {/* /.container-fluid */}
          </div>  {/* /.content */}
        
            </div>
            <Footer />
        </div>
    )
}

export default AddBranch
