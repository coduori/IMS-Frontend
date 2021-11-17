import {React, useEffect, useContext} from 'react';
import { useNavigate } from "react-router"
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import IncidentTable from './IncidentEntry/IncidentTable'
import {Link} from 'react-router-dom'
import UserContext from '../../store/UserContext'
import IncidentsContext from '../../store/IncidentsContext';
const Home = (props) => {
  const navigate = useNavigate();
  const usercontext = useContext(UserContext);
  const incidentscontext = useContext(IncidentsContext);

  useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        },
    };
    let getIncidentsUrl = 'http://localhost:3005/incidents/getIncidentsView';
    fetch(getIncidentsUrl, options)
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
      incidentscontext.setIncidents(responseData.incidentRecords);
    })
    .catch (err => {
        console.log("Err");
        console.log(err);
    });
  },
  []);

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
                <IncidentTable incidentsData={incidentscontext.incidents}/>

                {/* <!-- Tabs navs --> */}
                {/* <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link active"
                      id="ex1-tab-1"
                      data-mdb-toggle="tab"
                      href="#ex1-tabs-1"
                      role="tab"
                      aria-controls="ex1-tabs-1"
                      aria-selected="true"
                      >Tab 1</a
                    >
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link"
                      id="ex1-tab-2"
                      data-mdb-toggle="tab"
                      href="#ex1-tabs-2"
                      role="tab"
                      aria-controls="ex1-tabs-2"
                      aria-selected="false"
                      >Tab 2</a
                    >
                  </li>
                  <li class="nav-item" role="presentation">
                    <a
                      class="nav-link"
                      id="ex1-tab-3"
                      data-mdb-toggle="tab"
                      href="#ex1-tabs-3"
                      role="tab"
                      aria-controls="ex1-tabs-3"
                      aria-selected="false"
                      >Tab 3</a
                    >
                  </li>
                </ul>
                <!-- Tabs navs --> */}

                {/* <!-- Tabs content --> */}
                {/* <div class="tab-content" id="ex1-content">
                  <div
                    class="tab-pane fade show active"
                    id="ex1-tabs-1"
                    role="tabpanel"
                    aria-labelledby="ex1-tab-1"
                  >
                    Tab 1 content
                  </div>
                  <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
                    Tab 2 content
                  </div>
                  <div class="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
                    Tab 3 content
                  </div>
                </div>
<!-- Tabs content --> */}
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
