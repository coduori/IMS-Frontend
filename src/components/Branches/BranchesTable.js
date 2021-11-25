import BranchesTableRow from "./BranchesTableRow";


const BranchesTable = (props) => {

    const loadedBranches = props.branchesData;
    console.log(loadedBranches)
      return (
        <>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">List of Branches</h3>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Branch Name</th>
                    <th scope="col">Branch Code</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  loadedBranches.map((loadedBranch, index) => {
                    if (loadedBranch.deleted !== true) { 
                      return <BranchesTableRow branch={loadedBranch}
                          key={loadedBranch._id}
                          num={index}
                        />
                    } else {
                      return null
                    }
                  })
                }
                </tbody>
            </table>
            </div> 
          </div>
   
  
        </>
      )
  }
  
  export default BranchesTable
  