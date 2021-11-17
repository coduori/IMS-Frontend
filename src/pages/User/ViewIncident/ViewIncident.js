import React from 'react'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Menu from '../../../components/Menu'

const ViewIncident = (props) => {
  
  return (
    <div >  
      <div>  
        <Header />
        <Menu />
        <div className="content-wrapper"> {/* Content Wrapper. Contains page content */}
          <div className="content"> {/* Main content */}
            <div className="container-fluid"> 
              <div className="card">
                <div className="card-header">
                  Incident Details
                </div>
                <div className="card-body">
                  <div className="row mb-5">
                    <div className="col-3">
                      Branch Name
                    </div>
                    <div className="col-3">
                      CapeTown Branch
                    </div>
                    <div className="col-3">
                      Alerted By
                    </div>
                    <div className="col-3">
                      Phil J. - Branch Manager
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-3">
                      Incident Date
                    </div>
                    <div className="col-3">
                      12/Jan/2021
                    </div>
                    <div className="col-3">
                      Incident Type
                    </div>
                    <div className="col-3">
                      Fire
                    </div>
                  </div>
                  <hr/>
                  <div className="my-4">
                    <div className="row">
                        <span className="right badge badge-danger">Incident Description</span>
                    </div>
                    <div className="row">
                      <p className="my-4">
                      The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.
                      </p>
                    </div>
                    <div className="row">
                        <span className="right badge badge-success">Incident Action</span>
                    </div>
                    <div className="row">
                      <p className="my-4">
                      Casper Nyovest fron the department of finance extinguished the fire using the fire extinguisher on the second floor.
                      </p>
                    </div>
                    <div className="row">
                        <span className="right badge badge-primary">Incident Further Actions</span>
                    </div>
                    <div className="row">
                      <p className="my-4">
                      The fire water heater was taken to the store and an electrician called to fix the socket that was connected to the water heater. A request was also sent to the procurement office for the procurement of a new water heater for the floor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>  {/* /.container-fluid */}
          </div>    {/* /.content */}
        </div>      {/* /.content-wrapper */}
      </div>
      <Footer />
    </div>
  )
}

export default ViewIncident
