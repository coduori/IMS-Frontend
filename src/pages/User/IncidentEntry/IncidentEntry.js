import React, {useState, useRef, useContext} from "react";
import { useNavigate } from "react-router";
import moment from "moment";

import Footer from '../../../components/Footer';
import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import ActionComponent from '../../../components/Incidents/ActionComponent'

import UserContext from '../../../store/UserContext';
import IncidentsContext from "../../../store/IncidentsContext";
import IncidentTypesContext from '../../../store/IncidentTypesContext';
import BranchesContext from '../../../store/BranchesContext';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IncidentEntry = () => {
  const navigate = useNavigate();
  const usercontext = useContext(UserContext);
  const incidentscontext = useContext(IncidentsContext);
  const incidenttypescontext = useContext(IncidentTypesContext);
  const branchescontext = useContext(BranchesContext);

  const [incidentDate, setIncidentDate] = useState(new Date());

  const branchRef = useRef();
  const alertedByRef = useRef();
  const incidentTypeRef = useRef();
  const incidentDescriptionRef = useRef();
  const actionsRef = useRef();

  const incidentactions = [
    {
    type: 'ACTION',
    description: ''
  },
  {
    type: 'FURTHER_ACTION',
    description: ''
  } 
  ]

  function submitIncidentHandler (event) {
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

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        },
        body: JSON.stringify(postData),
    };
    let add_incident_url = 'http://localhost:3005/incidents/add';
    fetch(add_incident_url, options)
      .then(response => {
          if (!response.ok) {
            throw Error(response.status);
        }
          return response.json();
      })
      .then(responseData => {
          console.log(responseData);
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
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">

            </div>{/* /.row */}
          </div>
        </div>

        <div className="content">
          <div className="container-fluid">
            <div className="wrapper">
              <div className="card mx-3">
                <h5 className="card-header">Incident Entry</h5>
                <div className="card-body">
                  <form>
                    <div className="row mb-4">
                      <div className="col">
                        <select className="form-select form-control" aria-label="Default select example" ref={branchRef}>
                          <option defaultValue>Select branch</option>
                          {branchescontext.branches.map((branch) => {
                            return <option value={branch._id}>{branch.branch_code}</option>
                          })}
                        </select>
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Alerted By" ref={alertedByRef}/>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col">
                        <DatePicker 
                        selected={incidentDate}
                        onChange={(date) => setIncidentDate(date)}
                        minDate={new Date(moment().subtract(1, 'months').format())}
                        maxDate={new Date()}
                        className="form-control"/>
                      </div>
                      <div className="col">
                        <select className="form-select form-control" aria-label="Default select example" ref={incidentTypeRef}>
                          <option defaultValue>Select Incident Type</option>
                          {incidenttypescontext.incident_types.map((incident_type) => {
                            return <option value={incident_type.id}>{incident_type.incident_type}</option>
                          })}
                          {/* <option defaultValue>Fire</option>
                          <option value="Fraud">Fraud</option>
                          <option value="Theft">Theft</option>
                          <option value="Vandalism">Vandalism</option> */}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <label >Incident Description</label>
                        <textarea type="text" className="form-control" placeholder="Enter incident description here..." ref={incidentDescriptionRef}/>
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
                    <div className="row ">
                      <div className="mr-auto">
                        <button id="submitdraft" type="button" className="btn btn-primary" onClick={submitIncidentHandler}>Save</button>
                        <button id="submitapproval" type="button" className="ml-3 btn btn-success" onClick={submitIncidentHandler}>Save and submit</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>

{/* /.content */}
{/* /.content-wrapper */}
      <Footer />
    </div>
  );
};

export default IncidentEntry;
