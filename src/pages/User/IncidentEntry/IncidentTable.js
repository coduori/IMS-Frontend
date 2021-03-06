
import React from 'react'
import IncidentTableRow from '../../../components/Incidents/IncidentTableRow';

const IncidentTable = (props) => {

  const loadedIncidents = props.incidentsData;
  console.log(loadedIncidents)
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
                  <th scope="col">Description</th>
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
              {
                loadedIncidents.map((loadedIncident, index) => {
                    return <IncidentTableRow incident={loadedIncident}
                        key={loadedIncident.id}
                        num={index}
                        approveIncident={props.approveIncident}
                        deleteIncident={props.deleteIncident}
                      />
                })
              }
              </tbody>
          </table>
          </div> 

          <div className="modal fade" id="delete_modal">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Delete Incident</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"></span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete this incident?</p>
                </div>
                <div className="modal-footer">
                        <button className="btn btn btn-primary" >Confirm Delete</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-target="#delete_modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
 

      </>
    )
}

export default IncidentTable
