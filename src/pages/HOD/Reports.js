import {React, useEffect, useContext} from 'react';
import { useNavigate } from "react-router"
import {Link} from 'react-router-dom'

import { Button, Card, Elevation } from '@blueprintjs/core';

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Menu from '../../components/Menu'

import UserContext from '../../store/UserContext'


const Reports = () => {
    const navigate = useNavigate();
    const usercontext = useContext(UserContext);
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
            },
        };
        let get_reports_url = 'http://localhost:3010/reports/getIncidentsView';
        let refreshed_access_token = false;
        let errors = []
        async function fetchData() {
            try {
                const response = await fetch(get_reports_url, options);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData);
                } else {
                    const responseData = await response.json();
                    console.log(responseData);
                    // responseData.errors.map(error => {
                    //     console.log(error.message)
                    //     ErrorNotification.show({icon: "warning-sign", message: error.message, timeout: 3000, intent: "danger"});
                    // })
    
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
                          refreshed_access_token = true;
                      } else {
                          console.log("Error Refreshing Token")
                          errors.push({message: "Error Refreshing Token"})
                      }
                    } else {
                      console.log(responseData);
                      errors.push({message: "Error Fetching Report Data"})
                    }
                }
            } catch (failedResponse) {
            // console.log(await failedResponse.data)
            }
        }
    
        // fetchData();
        if (refreshed_access_token) {
          fetchData();
        }
        console.log(errors)   
      },
      []);

    function downloadReportHandler (event) {
        event.preventDefault()
        console.log(event.target)
        const errors = []
            const download_report_url = 'http://localhost:3006/reports/download/userincidents';
            let refreshed_access_token = false;
            async function downloadReport() {
              const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                },
              };
              console.log("Making request")
              console.log(usercontext.accessToken);
                try {
                    const response = await fetch(download_report_url, options);
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log(responseData);
                    } else {
                        const responseData = await response.json();
                        if (responseData.error === "EXPIRED_ACCESS_TOKEN") {
                          console.log("Refreshing token")
                          console.log(usercontext.accessToken);
                          const refresh_access_token_url = 'http://127.0.0.1:3000/auth/token/refresh'
                          const refresh_options = {
                            method: 'GET',
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                            },
                          };
                          const refreshTokenResponse = await fetch(refresh_access_token_url, refresh_options);
    
                          if(refreshTokenResponse.ok) {
                            const responseData = await refreshTokenResponse.json();
                            usercontext.setAccessToken(responseData.accessToken)
                            console.log("New token")
                            console.log(responseData.accessToken);
                            console.log(usercontext.accessToken);
                            refreshed_access_token = true
                          } else {
                            console.log("Error Refreshing Token")
                            errors.push({message: "Error Refreshing Token"})
                          }
                        } else {
                          console.log(responseData);
                          errors.push({message: "Error Fetching Chart Data"})
                        }
                    }
                } catch (failedResponse) {
                // console.log(await failedResponse.data)
                }
            }
    
            downloadReport();
            if (refreshed_access_token) {
                downloadReport();
            }
    }

    
    return (
        <div className="wrapper">  
      <div>
        <Header/>
        <Menu />
        <div className="content-wrapper"> {/* Content Wrapper. Contains page content */}
          <div className="content-header">  {/* Content Header (Page header) */}
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12 mr-2">
                  
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>
          </div>
          <div className="content"> {/* /.content-header */}  {/* Main content */}
            <div className="container-fluid">
              <div className="wrapper">
                <h3>Reports</h3>
                <Card 
                interactive={true}
                elevation={Elevation.TWO}
                className="w-50">
                  <h5>Report on Incident Types</h5>
                  <form className="">
                    <div className="form-group">
                      <label htmlFor="incident_types-form-select">Incident Type</label>
                      <select className="form-control w-25" id="incident_types-form-select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                    <Button 
                      icon="download"
                      intent="primary"
                      className=""
                      onClick={downloadReportHandler}>Download report
                    </Button>
                  </form>
                </Card>
              </div>
            </div>  {/* /.container-fluid */}
          </div>  {/* /.content */}
        </div>  {/* /.content-wrapper */}
        <Footer />
      </div>
    </div>
    )
}

export default Reports
