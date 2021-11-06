
import React from 'react'
import {Link} from 'react-router-dom'
const IncidentTable = () => {
    return (
      <>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">List of Incidents</h3>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Incident ID</th>
                  <th scope="col">Incident</th>
                  <th scope="col">Recorded By</th>
                  <th scope="col">Branch</th>
                  <th scope="col">Incident Type</th>
                  <th scope="col">Alerted By</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <th scope="row">1</th>
                  <th scope="row">Fir-CAPE-1201001</th>
                  <td>The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.</td>
                  <td>K. Jabulani</td>
                  <td>Cape Town</td>
                  <td>Fire</td>
                  <td>Phill Chase - Branch Manager</td>
                  <td>12-Jan-2021</td>
                  <td>Draft</td>
                  <td Style='white-space: nowrap'>  
                    <Link to="/edit-incident"><button type="submit" className="btn btn-xs btn-primary ">Edit</button></Link>
                    <button type="submit" className="ml-3 btn btn-xs btn-danger">Delete</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <th scope="row">Fir-CAPE-1201001</th>
                  <td>The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.</td>
                  <td>K. Jabulani</td>
                  <td>Cape Town</td>
                  <td>Fire</td>
                  <td>Phill Chase - Branch Manager</td>
                  <td>12-Jan-2021</td>
                  <td>Pending Approval</td>
                  <td>  
                  <Link to="/approve-incident"><button type="submit" className="btn btn-xs btn-primary ">view</button></Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <th scope="row">Fir-CAPE-1201001</th>
                  <td>The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.</td>
                  <td>K. Jabulani</td>
                  <td>Cape Town</td>
                  <td>Fire</td>
                  <td>Phill Chase - Branch Manager</td>
                  <td>12-Jan-2021</td>
                  <td>Open</td>
                  <td Style='white-space: nowrap'>  
                  <Link to="/update-incident"><button type="submit" className="btn btn-xs btn-primary mr-3">Update</button></Link>
                  <button type="submit" className="btn btn-xs btn-success">Close</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <th scope="row">Fir-CAPE-1201001</th>
                  <td>The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.</td>
                  <td>K. Jabulani</td>
                  <td>Cape Town</td>
                  <td>Fire</td>
                  <td>Phill Chase - Branch Manager</td>
                  <td>12-Jan-2021</td>
                  <td>Open</td>
                  <td Style='white-space: nowrap'>  
                  <Link to="/update-incident"><button type="submit" className="btn btn-xs btn-primary mr-3">Update</button></Link>
                  <button type="submit" className="btn btn-xs btn-success ">Close</button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <th scope="row">Fir-CAPE-1201001</th>
                  <td>The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.</td>
                  <td>K. Jabulani</td>
                  <td>Cape Town</td>
                  <td>Fire</td>
                  <td>Phill Chase - Branch Manager</td>
                  <td>12-Jan-2021</td>
                  <td>Closed</td>
                  <td Style='white-space: nowrap'>  
                    <Link to="/view-incident"><button type="submit" className="btn btn-xs btn-primary ">View</button></Link>
                                   </td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <th scope="row">Fir-CAPE-1201001</th>
                  <td>The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.</td>
                  <td>K. Jabulani</td>
                  <td>Cape Town</td>
                  <td>Fire</td>
                  <td>Phill Chase - Branch Manager</td>
                  <td>12-Jan-2021</td>
                  <td>Closed</td>
                  <td Style='white-space: nowrap'>  
                  <Link to="/view-incident"><button type="submit" className="btn btn-xs btn-primary ">View</button></Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <th scope="row">Fir-CAPE-1201001</th>
                  <td>The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.</td>
                  <td>K. Jabulani</td>
                  <td>Cape Town</td>
                  <td>Fire</td>
                  <td>Phill Chase - Branch Manager</td>
                  <td>12-Jan-2021</td>
                  <td>Closed</td>
                  <td Style='white-space: nowrap'>  
                  <Link to="/view-incident"><button type="submit" className="btn btn-xs btn-primary ">View</button></Link>
                  </td>
                </tr>
              </tbody>
          </table>
          </div> 
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Delete Incident</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                   This action cannot be reversed. Are you sure you want to delete the incident?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary">Delete incident</button>
                </div>
                </div>
            </div>
            </div>
        </div>
 

      </>
    )
}

export default IncidentTable
