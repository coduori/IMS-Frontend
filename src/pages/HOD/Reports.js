import {React, useEffect, useContext, useState, useRef} from 'react';
import { useNavigate } from "react-router"
import {Link} from 'react-router-dom'

import { Button, InputGroupProps2} from '@blueprintjs/core';
import { DateRangeInput } from "@blueprintjs/datetime";

import moment from "moment";


import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import ReportTable from '../../components/Reports/ReportTable';


import UserContext from '../../store/UserContext'
import IncidentTypesContext from '../../store/IncidentTypesContext';
import BranchesContext from '../../store/BranchesContext';

import dummy_data from './dummy_data.json';



const Reports = () => {
    const navigate = useNavigate();
    const usercontext = useContext(UserContext);
    const incidenttypescontext = useContext(IncidentTypesContext);
    const branchescontext = useContext(BranchesContext);

    const branchRef = useRef();
    const incidentTypeRef = useRef();
    const incidentStatusRef = useRef();

    const [dateRange, setDateRange] = useState([null, null]);

    const [tableData, setTableData] = useState([dummy_data[0]])
    const [branches, setBranches] = useState(branchescontext.branches);
    const [incidentTypes, setIncidentTypes] = useState(incidenttypescontext.incident_types);
    const [didLoadData, setDidLoadData] = useState(true);
    const incidentStatuses = ["DRAFT", "OPEN", "SUBMITTED", "CLOSED"];

    useEffect(() => {
        let did_refresh_access_token = false;
        let errors = []
        const get_reports_url = 'http://localhost:3010/reports/incidents';
        async function fetchData() {
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                },
            };
            try {
                const response = await fetch(get_reports_url, options);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log(responseData);
                    setTableData(responseData.tableData);
                    setBranches(responseData.branches);
                    setIncidentTypes(responseData.incidentTypes)
                    setDidLoadData(true);
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
                            usercontext.setAccessToken(responseData.accessToken);
                            did_refresh_access_token = true;
                        } else {
                            console.log("Error Refreshing Token")
                            errors.push({message: "Error Refreshing Token"})
                        }
                    } else {
                        console.log(responseData);
                        errors.push({message: "Error Fetching Report Data"});
                    }
                }
            } catch (failedResponse) {
            
            }
        }

        // fetchData();
        if (did_refresh_access_token) {
            // fetchData();
        }
        console.log(errors)
    }, [usercontext.refreshToken, usercontext.accessToken, usercontext.setAccessToken]);

    function downloadReportHandler (event) {
        event.preventDefault()
        console.log(event.target)
        const targetElement = event.target.getAttribute("id");
        console.log(event.target.getAttribute("id"))
        const enteredBranchFilter = branchRef.current.value;
        const enteredIncidentTypeFilter = incidentTypeRef.current.value;
        const enteredIncidentStatusFilter = incidentStatusRef.current.value;

        const postData = {}

        if (enteredBranchFilter != '') postData.branch_code = enteredBranchFilter
        if (enteredIncidentTypeFilter !== '') postData.incident_type = enteredIncidentTypeFilter
        if (enteredIncidentStatusFilter !== '') postData.incident_status = enteredIncidentStatusFilter
        
        if (!dateRange.some((dateRange) => dateRange == null)) {
            postData.start_date = dateRange[0].toISOString();
            postData.end_date = dateRange[1].toISOString();
        }

        const download_report = targetElement == 'filter-btn'
            ? false
            : targetElement == 'download-btn' ? true
            : null

        postData.download = download_report
        console.log(postData)

        const errors = []
        const download_report_url = 'http://localhost:3006/reports/download/';
        let refreshed_access_token = false;

        async function downloadReport() {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
                },
                body: JSON.stringify(postData)
            };
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
                        errors.push({message: "Error Fetching Report Data"})
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

    function filterIncidentsHandler (event) {
        event.preventDefault();
        const targetElement = event.target.getAttribute("id");
        console.log(event.target.getAttribute("id"))
        const enteredBranchFilter = branchRef.current.value;
        const enteredIncidentTypeFilter = incidentTypeRef.current.value;
        const enteredIncidentStatusFilter = incidentStatusRef.current.value;

        const postData = {}

        if (enteredBranchFilter != '') postData.branch_code = enteredBranchFilter
        if (enteredIncidentTypeFilter !== '') postData.incident_type = enteredIncidentTypeFilter
        if (enteredIncidentStatusFilter !== '') postData.incident_status = enteredIncidentStatusFilter
        
        if (!dateRange.some((dateRange) => dateRange == null)) {
            postData.start_date = dateRange[0].toISOString();
            postData.end_date = dateRange[1].toISOString();
        }

        const download_report = targetElement == 'filter-btn' ? false
                          : targetElement == 'download-btn' ? true
                          : null

        postData.download = download_report
        console.log(postData)
    }

    if (!didLoadData) {
        return "Loading"
    } else {
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

                                <div className="mb-4">
                                    <form>
                                        <div className="row mb-5">
                                            <div className="col">
                                                <label>Branch Code</label>
                                                <select class="form-select form-control" ref={branchRef}>
                                                    <option value="" disabled selected hidden>BRANCH</option>
                                                    {branches.map((branch) => {
                                                        return branch.deleted == false ? <option value={branch.branch_code}>{branch.branch_code}</option> : null
                                                    })}
                                                </select>
                                            </div>

                                            <div className="col">
                                                <label>Incident Type</label>
                                                <select class="form-select form-control" ref={incidentTypeRef}>
                                                    <option value="" disabled selected hidden>TYPE</option>
                                                    {incidentTypes.map((incidentType) => {
                                                        return incidentType.deleted == false ? <option value={incidentType.incident_type}>{incidentType.incident_type}</option> : null
                                                    })}
                                                </select>
                                            </div>

                                            <div className="col">
                                                <label>Incident Status</label>
                                                <select class="form-select form-control" ref={incidentStatusRef} placeholder="STATUS">
                                                    <option value="" disabled selected hidden>STATUS</option>
                                                    {incidentStatuses.map((incidentStatus) => {
                                                        return <option value={incidentStatus}>{incidentStatus}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <label>Date Range: </label>
                                                <DateRangeInput
                                                    // defaultValue={dateRange}
                                                    formatDate={date => date.toDateString()}
                                                    onChange={setDateRange}
                                                    maxDate={new Date()}
                                                    shortcuts={false}
                                                    parseDate={str => new Date(str)}
                                                    className="ml-3"
                                                    invalidDateMessage="Invalid Date"
                                                    startInputProps={{className: "mr-4"}, {leftIcon:"calendar"}}
                                                    // endInputProps={{leftIcon:"calendar"}}
                                                />
                                            </div>
                                            <div className="col">
                                                <Button icon="filter"className="mr-4" id="filter-btn" text="Filter" onClick={filterIncidentsHandler} intent="success"/>
                                                <Button icon="download"id="download-btn" text="Download" onClick={filterIncidentsHandler} intent="primary"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <ReportTable data={tableData}/>
                            </div>
                            </div>  {/* /.container-fluid */}
                        </div>  {/* /.content */}
                    </div>  {/* /.content-wrapper */}
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Reports
