import {React, useEffect, useContext} from 'react';
import { useNavigate } from "react-router"
import {Link} from 'react-router-dom'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import IncidentTable from './IncidentEntry/IncidentTable'

import UserContext from '../../store/UserContext'
import IncidentsContext from '../../store/IncidentsContext';
import IncidentTypesContext from '../../store/IncidentTypesContext';
import BranchesContext from '../../store/BranchesContext';
const Home = (props) => {
  const navigate = useNavigate();
  const usercontext = useContext(UserContext);
  const incidentscontext = useContext(IncidentsContext);
  const incidenttypescontext = useContext(IncidentTypesContext);
  const branchescontext = useContext(BranchesContext);

  useEffect(() => {
    
    let did_refresh_access_token = false;
    let errors = []
    const refreshed_access_token = null;
    let getIncidentsUrl = 'http://localhost:3005/incidents/getIncidentsView';
    async function fetchData() {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        try {
            const response = await fetch(getIncidentsUrl, options);
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                incidentscontext.setIncidents(responseData.incidentRecords);
                branchescontext.setBranches(responseData.branches);
                incidenttypescontext.setIncidentTypes(responseData.incident_types);
            } else {
                const responseData = await response.json();
                console.log(responseData);

                if (responseData.error && responseData.error === "EXPIRED_ACCESS_TOKEN") {
                    const refresh_options = {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                        },
                    };
                  const refresh_access_token_url = 'http://127.0.0.1:3000/auth/token/refresh'
                  const refreshTokenResponse = await fetch(refresh_access_token_url, refresh_options);
                  
                  if(refreshTokenResponse.ok) {
                      const responseData = await refreshTokenResponse.json();
                      console.log(responseData)
                      usercontext.setAccessToken(responseData.accessToken);
                      console.log(usercontext.accessToken)
                      refreshed_access_token = responseData.accessToken
                      did_refresh_access_token = true;
                  } else {
                      console.log("Error Refreshing Token")
                      errors.push({message: "Error Refreshing Token"})
                  }
                } else {
                  console.log(responseData);
                  errors.push({message: "Error Fetching Incidents Data"})
                }
            }
        } catch (failedResponse) {
          console.log("true")
        // console.log(await failedResponse.data)
        }
    }

    fetchData();
    console.log(did_refresh_access_token)
    if (did_refresh_access_token) {
      fetchData();
    }
    console.log(errors)
  },
  [usercontext.refreshToken, usercontext.accessToken, usercontext.setAccessToken]);

  function deleteIncident (incident_id) {

  }

  function approveIncident (incident_id) {

  }

  return (
    <div className="wrapper">  
      <div>
        <Header loggedInUser={props.loggedInUser}/>
        <Menu />
        <div className="content-wrapper"> {/* Content Wrapper. Contains page content */}
          <div className="content-header">  {/* Content Header (Page header) */}
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12 mr-2">
                  <Link to="/incident-entry">
                    <button className="mt-2 btn btn-primary float-right">Record Incident</button>
                  </Link>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>
          </div>
          <div className="content"> {/* /.content-header */}  {/* Main content */}
            <div className="container-fluid">
              <div className="wrapper">
                <IncidentTable 
                incidentsData={incidentscontext.incidents}
                approveIncident={approveIncident}
                deleteIncident={deleteIncident}
                />
              </div>
            </div>  {/* /.container-fluid */}
          </div>  {/* /.content */}
        </div>  {/* /.content-wrapper */}
        <Footer />
      </div>
    </div>
  )
}

export default Home
