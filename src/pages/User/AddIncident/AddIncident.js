import {React, useEffect, useContext, useState, useCallback, useRef} from 'react';
import { Dialog, Classes, FormGroup, InputGroup, Button} from '@blueprintjs/core';

import IncidentTypesContext from '../../../store/IncidentTypesContext';
import UserContext from '../../../store/UserContext';

import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import IncidentTypesTable from '../../../components/IncidentTypes/IncidentTypesTable';


const AddIncident = () => {

    const incidenttypesscontext = useContext(IncidentTypesContext);
    const usercontext = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const handleButtonClick = useCallback(() => setIsOpen(!isOpen), []);
    const handleClose = useCallback(() => setIsOpen(false), []);
    const addIncidentTypeRef = useRef();
    
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let get_incident_types_url = 'http://localhost:3005/incidents/incidentTypes';
        fetch(get_incident_types_url, options)
        .then(response => {
            if (response.status === 401 || response.status === 403) {
                console.log("Error");
            } 
            return response.json(); 
        })
        .then(responseData => {
          console.log(responseData);
          incidenttypesscontext.setIncidentTypes(responseData.msg)
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
                        label="Incident Type:"
                        labelFor="incident-type-input"
                        inline={true}
                    >
                        <InputGroup id="incident-type-input" placeholder="Incident Type" inputRef={addIncidentTypeRef}/>
                    </FormGroup>

                    <Button className= {`ml-3 ${Classes.DIALOG_CLOSE_BUTTON}` } text="Save" onClick={addIncidentTypeHandler} intent="success"/>
                </div>
            </div>
        );
    }
    

    function addIncidentTypeHandler (event) {
        event.preventDefault();
        console.log(addIncidentTypeRef)

        const enteredIncidentType = addIncidentTypeRef.current.value;

        const postData = {
            incident_type: enteredIncidentType,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: JSON.stringify(postData),
        };
        let add_incident_type_url = `http://localhost:3005/incidents/addincidenttype`
        fetch(add_incident_type_url, options)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.status);
                }
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);
                incidenttypesscontext.setIncidentTypes(responseData.incident_types)
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
                            <button className="mt-2 btn btn-primary float-right" onClick={handleButtonClick}>Add Incident Type</button>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>
            </div>
            
            <div className="content"> {/* /.content-header */}  {/* Main content */}
            <div className="container-fluid">
              <div className="wrapper">
                <IncidentTypesTable 
                incidentTypesData={incidenttypesscontext.incident_types}
                />

                <Dialog isOpen={isOpen}
                        onClose={handleClose}
                        title="Add Incident Type"
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

export default AddIncident
