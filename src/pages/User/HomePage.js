import {React, useEffect, useContext, useState} from 'react';
import { useNavigate } from "react-router"
import {Link} from 'react-router-dom'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import UserIncidentChart from '../../components/Charts/UserIncidents';
import { ErrorNotification } from "../../components/Messages/ErrorNotification";

import UserContext from '../../store/UserContext'

const HomePage = (props) => {
  const navigate = useNavigate();
  const usercontext = useContext(UserContext);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        },
    };

    let get_user_roles = `http://localhost:3001/admin/users/roles`

    async function fetchData() {
      const response = await fetch(get_user_roles, options);
      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        setRoles(responseData.roles)
        // setLoggedInUserRoles(responseData.loggedInUserRoles)
      } else {
        throw Error("Error");
      }
    }
    
    fetchData();

}, []);
  function setErrorNotifications(errors) {
      errors.map(error => {
          console.log(error.message)
          ErrorNotification.show({icon: "warning-sign", message: error.message, timeout: 4000, intent: "danger"});
      })
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
                  {/* <Link to="/incident-entry">
                    <button className="mt-2 btn btn-primary float-right">Record Incident</button>
                  </Link> */}
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>
          </div>
          <div className="content"> {/* /.content-header */}  {/* Main content */}
            <div className="container-fluid">
              <div className="wrapper">
                <div className="charts-section">
                  {roles.includes("IMS_VIEW_USER_REPORTS")
                  ? <UserIncidentChart setErrorNotifications={setErrorNotifications}/> 
                  : null }
                
                </div>

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

export default HomePage
