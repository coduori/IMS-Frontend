import IncidentTypesTableRow from "./IncidentTypesTableRow";


const IncidentTypesTable = (props) => {

    const loadedIncidentTypes = props.incidentTypesData;
    console.log(loadedIncidentTypes)
      return (
        <>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">List of Incident Types</h3>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Incident Type</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  loadedIncidentTypes.map((loadedIncidentType, index) => {
                    // if (loadedIncidentType.deleted !== true) { 
                      return <IncidentTypesTableRow incident_type={loadedIncidentType}
                          key={loadedIncidentType._id}
                          num={index}
                        />
                    // }
                  })
                }
                </tbody>
            </table>
            </div> 
          </div>
   
  
        </>
      )
  }
  
  export default IncidentTypesTable
  