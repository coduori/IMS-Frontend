import React, {useState, useRef, useContext} from "react";
import { useNavigate } from "react-router"
import Footer from '../../../components/Footer'
import {Link} from 'react-router-dom'
import "react-datepicker/dist/react-datepicker.css";
import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import ActionComponent from '../../../components/ActionComponent'
import DatePicker from "react-datepicker";
import UserContext from '../../../store/UserContext';
import IncidentsContext from "../../../store/IncidentsContext";



const IncidentEntry = () => {
  const navigate = useNavigate();
  const usercontext = useContext(UserContext);
  const incidentscontext = useContext(IncidentsContext);
  const [incidentDate, setIncidentDate] = useState(new Date());
  const branchRef = useRef();
  const alertedByRef = useRef();
  const incidentTypeRef = useRef();
  const incidentDescriptionRef = useRef();
  const actionsRef = useRef();

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
    
    // if(enteredIncidentAction !== '' && enteredIncidentFurtherAction !== ''){
    //   payloadActions = [
    //     {type: 'ACTION', description: enteredIncidentAction},
    //     {type: 'FURTHER_ACTION', description: enteredIncidentFurtherAction}
    // ]
    // } else if (enteredIncidentAction !== '' && enteredIncidentFurtherAction == '') {
    //   payloadActions = [
    //     {type: 'ACTION', description: enteredIncidentAction}
    // ]
    // } else {
    //   payloadActions = []
    // }

    const postData = {
        branch_id: enteredBranch,
        incident_type: enteredIncidentType,
        incident_status: incident_status,
        incident_description: enteredIncidentDescription,
        incident_date: incidentDate,
        reported_by:enteredAlertedBy,
        actions: actionsPayload
    };

    console.log(JSON.stringify(postData));
    console.log(usercontext);

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
          incidentscontext.setIncidents(responseData.incidentRecords);
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
                          <option defaultValue>Cape Town</option>
                          <option value="Kimberly">Kimberly</option>
                          <option value="JohannesBurg">Johannesburg</option>
                          <option value="Dubarn">Dubarn</option>
                        </select>
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" placeholder="Alerted By" ref={alertedByRef}/>
                      </div>
                    </div>
                    <div className="row mb-5">
                      <div className="col">
                        <DatePicker selected={incidentDate} onChange={(date) => setIncidentDate(date)} className="form-control"/>
                      </div>
                      <div className="col">
                        <select className="form-select form-control" aria-label="Default select example" ref={incidentTypeRef}>
                          <option defaultValue>Fire</option>
                          <option value="Fraud">Fraud</option>
                          <option value="Theft">Theft</option>
                          <option value="Vandalism">Vandalism</option>
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
                      <ActionComponent action_class="inc-action"/>
                      <ActionComponent action_class="inc-action inc-further-action"/>
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
