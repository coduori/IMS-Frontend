import {React, useEffect, useContext, useState, useRef, useCallback} from 'react';
import {Link} from 'react-router-dom';
import { FormGroup, InputGroup, Text , Button} from '@blueprintjs/core';
import {Classes, Popover2} from "@blueprintjs/popover2"

import UserContext from '../../store/UserContext';


function IncidentTableRow (props) {

    const incident = props.incident;
    const usercontext = useContext(UserContext);
    const number = props.num + 1;
    const incident_date = new Date(incident.incident_date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
    const closeCommentRef = useRef();
    const incidentRowRef = useRef();

    function deleteIncidentHandler (event) {
        event.preventDefault();
        const row_element = incidentRowRef.current
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let delete_incident_url = `http://localhost:3005/incidents/deleteIncident/${incident._id}`
        fetch(delete_incident_url, options)
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

    function closeIncidentHandler (event) {

    }

    function actionButtons (status) {
        if (status === 'DRAFT') {
            return (
            <>
            <Link to={`/edit-incident/${incident._id}`}>
                {/* <button type="button" className="btn btn-xs btn-primary ">Edit</button> */}
                <Button className= {`ml-3`} text="Edit" intent="success"/>
            </Link>
            <Popover2
                interactionKind="click"
                popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
                placement="bottom"
                content={
                    <div>
                        <h5>Delete</h5>
                        <p>Are you sure you want to delete this incident</p>
                        <Button className= {`ml-3 ${Classes.POPOVER2_DISMISS}` } text="Delete" onClick={deleteIncidentHandler} intent="danger"/>
                        <Button className= {`ml-3 ${Classes.POPOVER2_DISMISS}` } text="Dismiss" intent="secondary"/>
                    </div>
                }
                renderTarget={({ isOpen, ref, ...targetProps }) => (
                    <Button {...targetProps} elementRef={ref} intent="danger" text="Delete" className= {`ml-3` }/>
                )}
            />
            </>
            )
        } else if (status === 'SUBMITTED') {
            return (
                <>
                <Link to={`/view-incident/${incident._id}`}>
                    <button type="button" className="btn btn-xs btn-primary ">View</button>
                </Link>
                </>
            )
        } else if (status === 'OPEN') {
            return (
                <>
                <Link to={`/view-incident/${incident._id}`}>
                    <button type="button" className="btn btn-xs btn-primary ">View</button>
                </Link>

                <Popover2
                interactionKind="click"
                popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
                placement="bottom"
                content={
                    <div>
                        <h5>Close</h5>
                        <p>Are you sure you want to close this incident</p>
                        <FormGroup
                            label="Close comments:"
                            labelFor="close-comment-input"
                            inline={true}
                        >
                            <InputGroup id="close-comment-input"
                                        placeholder="Close Message"
                                        inputRef={closeCommentRef}/>
                        </FormGroup>

                        <Button className= {`ml-3 ${Classes.POPOVER2_DISMISS}` } text="Close" onClick={closeIncidentHandler} intent="success"/>
                        <Button className= {`ml-3 ${Classes.POPOVER2_DISMISS}` } text="Dismiss" intent="secondary"/>
                    </div>
                }
                renderTarget={({ isOpen, ref, ...targetProps }) => (
                    <Button {...targetProps} elementRef={ref} intent="success" text="Close" className= {`ml-3` } small={true}/>
                )}
            />
                <Link to="/edit-incident">
                    <button type="button" className="btn btn-xs btn-primary ">Close</button>
                </Link>
                </>
            )
        } else if (status === 'CLOSED') {
            return (
                <>
                <Link to={`/view-incident/${incident._id}`}>
                <button type="button" className="btn btn-xs btn-primary ">View</button>
                </Link>
                </>
            )
        }
    }

    return (
        <tr ref={incidentRowRef}>
            <th scope="row">{number}</th>
            <td> <Text title="Incident Description" ellipsize={true}> {incident.incident_description}</Text> </td>
            <td> {incident.recorded_by} </td>
            <td> {incident.branch_id} </td>
            <td> {incident.incident_type_id} </td>
            <td> {incident.reported_by} </td>
            <td> {incident_date} </td>
            <td> {incident.incident_status} </td>
            <td style={{whiteSpace: 'nowrap'}}>
                {actionButtons(incident.incident_status)}
            </td>
        </tr>
    );
}

export default IncidentTableRow;