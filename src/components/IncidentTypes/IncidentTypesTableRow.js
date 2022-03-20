import {React, useEffect, useContext, useState, useRef, useCallback} from 'react';
import { useNavigate } from "react-router"
import {FormGroup, InputGroup, Button} from "@blueprintjs/core"
import {Classes, Popover2} from "@blueprintjs/popover2"

// import "../../node_modules/@blueprintjs/popover2/lib/css/blueprint-popover2.css";

import UserContext from '../../store/UserContext';


function IncidentTypesTableRow (props) {

    const [incident_type, setIncidentType] = useState(props.incident_type);
    const addIncidentTypeRef = useRef();
    const incidentTypeRowRef = useRef();
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
        let get_incident_type_url = `http://localhost:3005/incidents/incidentTypes/${incident_type._id}`
        fetch(get_incident_type_url, options)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            }
            return response.json(); 
        })
        .then(responseData => {
            console.log(responseData)
            setIncidentType(responseData.msg)
        })
        .catch (err => {
            console.log("Error");
            console.log(err);
        });
    }, []);

    

    function editIncidentTypeHandler (event) {
        
        event.preventDefault();
        console.log(addIncidentTypeRef.current.value)

        const enteredIncidentType = addIncidentTypeRef.current.value;

        const postData = {
            incident_type: enteredIncidentType,
        };
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
            body: JSON.stringify(postData),
        };
        let edit_branch_url = `http://localhost:3005/incidents/incidentTypes/${incident_type._id}`
        fetch(edit_branch_url, options)
          .then(response => {
              if (!response.ok) {
                  throw Error(response.status);
              }
              return response.json();
          })
          .then(responseData => {
              console.log(responseData);
              setIncidentType(responseData.updatedIncidentType)
          })
          .catch(e => {
              console.log(e);
          });
    }

    function deleteIncidentTypeHandler (event) {
        event.preventDefault();
        const row_element = incidentTypeRowRef.current
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let delete_incident_type_url = `http://localhost:3005/incidents/incidentTypes/${incident_type._id}`
        fetch(delete_incident_type_url, options)
          .then(response => {
              if (!response.ok) {
                  throw Error(response.status);
              }
              return response.json();
          })
          .then(responseData => {
              console.log(responseData);
              row_element.remove()
              
            //   return navigate('/home');
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
                            label="Incident Type:"
                            labelFor="incident-type-input"
                            inline={true}
                            
                        >
                            <InputGroup id="incident-type-input" placeholder="Incident Type" defaultValue={incident_type.incident_type} inputRef={addIncidentTypeRef}/>
                        </FormGroup>

 
                        <Button text="Save" onClick={editIncidentTypeHandler} intent="success"/>
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
                        <p>Are you sure you want to delete this Incident Type</p>
                        <Button className= {`ml-3 ${Classes.POPOVER2_DISMISS}` } text="Delete" onClick={deleteIncidentTypeHandler} intent="danger"/>
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
        <tr ref={incidentTypeRowRef}>
            <th scope="row">{number}</th>
            <td> {incident_type.incident_type} </td>
            <td style={{whiteSpace: 'nowrap'}}>
                {actionButtons()}
            </td>
        </tr>
    );
}

export default IncidentTypesTableRow;