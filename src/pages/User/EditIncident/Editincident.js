import React, {useState, useRef, useContext} from "react";
import { useNavigate } from "react-router";
import {Link, useParams} from 'react-router-dom';

import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu';
import ActionComponent from '../../../components/Incidents/ActionComponent';

import UserContext from '../../../store/UserContext';
import IncidentsContext from "../../../store/IncidentsContext";
import IncidentTypesContext from '../../../store/IncidentTypesContext';
import BranchesContext from '../../../store/BranchesContext';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditIncident = (props) => {
  const navigate = useNavigate();

  const usercontext = useContext(UserContext);
  const incidentscontext = useContext(IncidentsContext);
  const incidenttypescontext = useContext(IncidentTypesContext);
  const branchescontext = useContext(BranchesContext);

  const branchRef = useRef();
  const alertedByRef = useRef();
  const incidentTypeRef = useRef();
  const incidentDescriptionRef = useRef();
  const actionsRef = useRef();
  

  const {incidentid} = useParams();

  // let editing_incident = null;
  // incidentscontext.incidents.map(function(incident) {
  //   if(incident._id === incidentid) {
  //     editing_incident = incident;
  //   }
  // });
  const editing_incident = incidentscontext.incidents.find(({_id}) => _id == incidentid)

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

  function editIncidentHandler (event) {
    event.preventDefault();
    const targetElement = event.target.getAttribute("id");
    const incident_status = targetElement == 'submitdraft' ? 'DRAFT'
                          : targetElement == 'submitapproval' ? 'SUBMITTED'
                          : null
    
    const enteredBranch = branchRef.current.value;
    const enteredAlertedBy = alertedByRef.current.value;
    const enteredIncidentType = incidentTypeRef.current.value;
    const enteredIncidentDescription = incidentDescriptionRef.current.value;

    const actions_container = actionsRef.current;
    const actions_elements_array = [...actions_container.getElementsByClassName("inc-action")];

    let actionsPayload = [];
    actions_elements_array.map(action_element => {
      const actionPayload = action_element.classList.contains("inc-further-action")
       ? {type: 'FURTHER_ACTION', description: action_element.value} 
       : action_element.classList.contains("inc-action") 
       ? {type: 'ACTION', description: action_element.value}
       : null;
      actionsPayload.push(actionPayload);
    });

    const postData = {
        branch_id: enteredBranch,
        incident_type: enteredIncidentType,
        incident_status: incident_status,
        incident_description: enteredIncidentDescription,
        incident_date: incidentDate,
        reported_by:enteredAlertedBy,
        actions: actionsPayload
    };

    console.log(postData)
    
    // const options = {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
    //     },
    //     body: JSON.stringify(postData),
    // };
    // let edit_incident_url = `http://localhost:3005/incidents/editIncident/${incidentid}`;
    // fetch(edit_incident_url, options)
    //   .then(response => {
    //       console.log(response.status);
    //       if (response.status === 403) {
    //           // usercontext.setJwt("");
    //           // usercontext.setIsLoggedIn(false);
    //           // localStorage.clear();
    //       }
    //       return response.json();
    //   })
    //   .then(responseData => {
    //       console.log(responseData);
    //       return navigate('/home');
    //   })
    //   .catch(e => {
    //       console.log(e);
    //   });
  }

  function deleteIncidentHandler (event) {
    event.preventDefault();
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        },
    };
    let delete_incident_url = `http://localhost:3005/incidents/deleteIncident/${incidentid}`
    fetch(delete_incident_url, options)
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
  <h5 class="card-header">Edit Incident<h3 className="mt-3">STATUS: {editing_incident.incident_status}</h3></h5>
  <div class="card-body">
  <form>
                <div className="row">
                  <div className="col">
                  <label>Branch Code</label>
                  <select class="form-select form-control" aria-label="Default select example" ref={branchRef}>
                  <option value={editing_incident.branch_id}>{branchescontext.branches.find(({_id}) => _id == editing_incident.branch_id).branch_code}</option>
                    {branchescontext.branches.map((branch) => {
                      return branch.deleted == false ? <option value={branch.id}>{branch.branch_code}</option> : null
                    })}
                  </select>
                  </div>
                  <div className="col">
                  <label>Reported by</label>
                    <input type="text" className="form-control" defaultValue={editing_incident.reported_by} ref={alertedByRef}/>
                  </div>
                </div>
                <div className="m-4">
                  </div>
                <div className="row">
                  <div className="col">
                  <label>Date</label>
                    <DatePicker selected={incidentDate} onChange={(date) => setIncidentDate(date)} className="form-control"/>
                  </div>
                  <div className="col">
                  <label>Incident Type</label>
                    <select class="form-select form-control" aria-label="Default select example" ref={incidentTypeRef}>
                      <option defaultValue={editing_incident.incident_type_id}>{incidenttypescontext.incident_types.find(({_id}) => _id == editing_incident.branch_id).branch_code}</option>
                      {incidenttypescontext.incident_types.map((incident_type) => {
                        return incident_type.deleted == false ?  <option value={incident_type.id}>{incident_type.incident_type}</option> : null
                      })}
                    </select>
                  </div>
                </div>
                <div className="m-5">
                  </div>
                  <div className="row">
                  <div className="col">
                    <label >Incident Description</label>
                    <textarea type="text" className="form-control" placeholder="Incident Description" defaultValue={editing_incident.incident_description} ref={incidentDescriptionRef}/>
                  </div>
                </div>
                <div className="incident_actions mb-4" ref={actionsRef}>
                  {incidentactions.map(action => {
                    return action.type === 'ACTION'
                    ? <ActionComponent action_class="inc-action" action_label="Action" action ={action}/>
                    : action.type === 'FURTHER_ACTION'
                    ? <ActionComponent action_class="inc-action inc-further-action" action_label="Further Action" action ={action}/>
                    : null
                  })}     
                </div>
                <div className="mb-4"></div>
                <div className="row ">
                <div className="mr-auto">
                  <button id="submitdraft" type="button" className="btn btn-primary" onClick={editIncidentHandler}>Save</button>
                  <button id="submitapproval" type="button" className="ml-3 btn btn-success" onClick={editIncidentHandler}>Save and submit</button>
                  <button id="delete_btn" type="button" className="ml-3 btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete_modal">Delete</button>
                </div>
                </div>
              </form>

              <div className="modal fade" id="delete_modal">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Delete Post</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                      </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this post?</p>
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn btn-primary" onClick={deleteIncidentHandler}>Save changes</button>
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-target="#delete_modal">Close</button>
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

export default EditIncident;
