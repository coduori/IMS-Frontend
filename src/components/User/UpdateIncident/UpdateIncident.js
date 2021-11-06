import React from "react";
import Menu from "../../Layouts/Menu";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import {Link} from 'react-router-dom'
const UpdateIncident = () => {
  return (
    <div className="wrapper">
        <Header />
        <Menu />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">


        <div class="card mx-3">
  <h5 class="card-header">Update Incident</h5>
  <div class="card-body">
  <div className="row">
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
    <div className="m-5"></div>
    <div className="row">
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
    <div className="my-5 "></div>
    <div className="row ml-1">
       <span className="right badge badge-danger">Incident Description</span>
    </div>
   
    <div className="row ml-1">
      <p className="my-4">
      The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.
      </p>
    </div>
    <div className="row ml-1">
       <span className="right badge badge-success">Incident Action</span>
    </div>
   
    <div className="row ml-1">
      <p className="my-4">
      Casper Nyovest fron the department of finance extinguished the fire using the fire extinguisher on the second floor.
      </p>
    </div>

  <form>

                <div className="row">
                  <div className="col">
                    <label >Further action</label>
                    <textarea type="text" className="form-control" placeholder="Incident Date" >
                        The fire water heater was taken to the store and an electrician called to fix the socket that was connected to the water heater. A request was also sent to the procurement office for the procurement of a new water heater for the floor.
                    </textarea>
                  </div>
                </div>
                <div className="mb-4"></div>
                <div className="row ">
                  <div className="mr-auto">
                 <Link to="/home"> <button type="submit" className="btn btn-success">Update Action</button> </Link>
                    </div>
                </div>
              </form>
  </div>
                </div>

            </div>

          {/* /.content */}
        {/* /.content-wrapper */}
        <Footer />
</div>
  );
};

export default UpdateIncident;
