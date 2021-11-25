import React, {useState, useRef, useContext} from "react";
import { useNavigate } from "react-router";
import {Link, useParams} from 'react-router-dom';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu';
import ActionComponent from '../../../components/Incidents/ActionComponent';

import UserContext from '../../../store/UserContext';
import IncidentsContext from "../../../store/IncidentsContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ViewIncident = (props) => {
  const {incidentid} = useParams();
  const navigate = useNavigate();

  const usercontext = useContext(UserContext);
  const incidentscontext = useContext(IncidentsContext);

  const rejectRef = useRef();
  const closeRef = useRef();
  
  let editing_incident = null;
  incidentscontext.incidents.map(function(incident) {
    if(incident._id === incidentid) {
      editing_incident = incident;
    }
  });
  console.log(editing_incident)
  const [incidentDate, setIncidentDate] = useState(new Date(editing_incident.incident_date));
  const incidentactions = [
    {
    type: 'ACTION',
    description: editing_incident.action
  },
  {
    type: 'FURTHER_ACTION',
    description: editing_incident.further_action
  } 
  ]

  function approveIncidentHandler (event) {
    event.preventDefault();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        },
    };

    const approve_incident_url = `http://localhost:3005/incidents/approveIncident/${incidentid}`;
    fetch(approve_incident_url, options)
      .then(response => {
          console.log(response.status);
          if (response.status === 403) {
              // usercontext.setJwt("");
              // usercontext.setIsLoggedIn(false);
              // localStorage.clear();
          }
          return response.json();
      })
      .then(responseData => {
          console.log(responseData);
          document.querySelector(".modal-backdrop").remove();
          return navigate('/home');
      })
      .catch(e => {
          console.log(e);
      });
  }

  function rejectIncidentHandler (event) {
    event.preventDefault();
    const rejectionMessage = rejectRef.current.value;
    const messagePayload = JSON.stringify({comment: rejectionMessage})
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        },
        body: messagePayload
    };
    let reject_incident_url = `http://localhost:3005/incidents/rejectIncident/${incidentid}`
    fetch(reject_incident_url, options)
      .then(response => {
          if (!response.ok) {
              throw Error(response.status);
          }
          return response.json();
      })
      .then(responseData => {
          console.log(responseData);
          document.querySelector(".modal-backdrop").remove();
          return navigate('/home');
      })
      .catch(e => {
          console.log(e);
      });
  }

  function closeIncidentHandler (event) {
    event.preventDefault();
    const closingMessage = closeRef.current.value;
    const messagePayload = JSON.stringify({comment: closingMessage})
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        },
        body: messagePayload
    };
    let close_incident_url = `http://localhost:3005/incidents/closeIncident/${incidentid}`
    fetch(close_incident_url, options)
      .then(response => {
          if (!response.ok) {
              throw Error(response.status);
          }
          return response.json();
      })
      .then(responseData => {
          console.log(responseData);
          document.querySelector(".modal-backdrop").remove();
          return navigate('/home');
      })
      .catch(e => {
          console.log(e);
      });
  }

  function actionButtons (status) {
    if (status === 'DRAFT') {
        return (
        <>
        <Link to={`/edit-incident/${editing_incident._id}`}>
            <button type="button" className="btn btn-xs btn-primary ">Edit</button>
        </Link>
        <button type="button" className="ml-3 btn btn-xs btn-danger" data-bs-toggle="modal" data-bs-target="#delete_modal">Delete</button>
        </>
        )
    } else if (status === 'SUBMITTED' && editing_incident.recorded_by !== usercontext.name) {
      console.log(editing_incident.recorded_by);
      console.log(usercontext.name);
        return (
            <>
            
            <button type="button" className="ml-3 btn btn-xs btn-success" data-bs-toggle="modal" data-bs-target="#approve_modal">Approve</button>
            <button type="button" className="ml-3 btn btn-xs btn-danger" data-bs-toggle="modal" data-bs-target="#reject_modal">Reject</button>
            </>
        )
    } else if (status === 'OPEN' && editing_incident.recorded_by !== usercontext.name) {
        return (
            <>
            <button type="button" className="ml-3 btn btn-xs btn-success" data-bs-toggle="modal" data-bs-target="#closure_modal">Close</button>
            </>
        )
    }
}

  return (
    <div className="wrapper">
        <Header />
        <Menu />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          <div classname="content-header">
            <div className="container-fluid">
              <div className="row mb-2">

              </div>{/* /.row */}
            </div>
          </div>

          <div className="content">
            <div className="container-fluid">
              <div className="wrapper"></div>

              <div class="card mx-3">
              <h5 class="card-header">View Incident <h3 className="mt-3">STATUS: {editing_incident.incident_status}</h3></h5>
              
              <div class="card-body">
              <form>
                <div className="row">
                  <div className="col">
                    <label>Branch Code</label>
                    <input type="text" className="form-control" defaultValue={editing_incident.branch_id} readOnly/>
                  </div>
                  <div className="col">
                  <label>Reported by</label>
                    <input type="text" className="form-control" defaultValue={editing_incident.reported_by} readOnly/>
                  </div>
                </div>
                <div className="m-4"></div>
                <div className="row">
                  <div className="col">
                    <label>Date</label>
                    <DatePicker selected={incidentDate} readOnly className="form-control"/>
                  </div>
                  <div className="col">
                    <label>Incident Type</label>
                    <input type="text" className="form-control" defaultValue={editing_incident.incident_type} readOnly/>
                  </div>
                </div>
                <div className="m-5"></div>
                <div className="row">
                  <div className="col">
                    <label >Incident Description</label>
                    <textarea type="text" className="form-control" placeholder="Incident Description" defaultValue={editing_incident.incident_description} readOnly/>
                  </div>
                </div>
                <div className="incident_actions mb-4">
                  {incidentactions.map(action => {
                    return action.type === 'ACTION'
                    ? <ActionComponent action_class="inc-action" action_label="Action" action ={action} readonly={true} />
                    : action.type === 'FURTHER_ACTION'
                    ? <ActionComponent action_class="inc-action inc-further-action" action_label="Further Action" action ={action} readonly={true}/>
                    : null
                  })}     
                </div>
                <div className="mb-4"></div>
                <div className="row ">
                  <div className="mr-auto">
                    {actionButtons(editing_incident.incident_status)}
                  </div>
                </div>
              </form>

              <div className="modal fade" id="approve_modal">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Approve Incident</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                      </button>
                    </div>
                    <div className="modal-body">
                        <p>Confirm Action: Approve Incident</p>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn btn-success" onClick={approveIncidentHandler} data-bs-dismiss="modal" data-target="#approve_modal">Save changes</button>
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-target="#approve_modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="reject_modal">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Approve Incident</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                      </button>
                    </div>
                    <div className="modal-body">
                        <textarea defaultValue="Enter reason for rejecting incident" ref={rejectRef}></textarea>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn btn-danger" onClick={rejectIncidentHandler} data-bs-dismiss="modal" data-target="#reject_modal">Save changes</button>
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-target="#reject_modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="closure_modal">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Close Incident</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                      </button>
                    </div>
                    <div className="modal-body">
                        <textarea defaultValue="Enter reason for closing incident" ref={closeRef}></textarea>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn btn-primary" onClick={closeIncidentHandler} data-bs-dismiss="modal" data-target="#closure_modal">Save changes</button>
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-target="#closure_modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
  </div>
                <div className="card-footer"> </div>
                </div>
                </div>
                </div>


            </div>

        <Footer />
</div>
  );
};

export default ViewIncident;
