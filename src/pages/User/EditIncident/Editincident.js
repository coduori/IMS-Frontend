import React, { useState } from "react";
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import Menu from '../../../components/Menu'
import {Link} from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const EditIncident = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="wrapper">
        <Header />
        <Menu />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
        <div classname="content-header">
  <div className="container-fluid">
    <div className="row mb-2">

    </div>{/* /.row */}
</div>
</div>

        <div className="content">
      <div className="container-fluid">
            <div className="wrapper"></div>

        <div class="card mx-3">
  <h5 class="card-header">Incident Entry</h5>
  <div class="card-body">
  <form>
                <div className="row">
                  <div className="col">
                  <select class="form-select form-control" aria-label="Default select example">
                    <option selected>Cape Town</option>
                    <option value="1">Kimberly</option>
                    <option value="2">JohannesBurg</option>
                    <option value="3">Dubarn</option>
                </select>
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Phil J. - Branch Manager"/>
                  </div>
                </div>
                <div className="m-4">
                  </div>
                <div className="row">
                  <div className="col">
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control"/>
                  </div>
                  <div className="col">
                  <select class="form-select form-control" aria-label="Default select example">
                    <option selected>Fire</option>
                    <option value="1">Fraud</option>
                    <option value="2">Identity Theft</option>
                    <option value="3">Earth Quake</option>
                </select>
                  </div>
                </div>
                <div className="m-5">
                  </div>
                  <div className="row">
                  <div className="col">
                    <label >Incident Description</label>
                    <textarea type="text" className="form-control" placeholder="Incident Date" >The faulty water heater on the second floor corridor caught fire. The fire started when an intern from the finance department  turned it on to fetch water.</textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label >Incident Action</label>
                    <textarea type="text" className="form-control" placeholder="Incident Date" >
                        Casper Nyovest fron the department of finance extinguished the fire using the fire extinguisher on the second floor.
                    </textarea>
                  </div>
                </div>
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
                 <Link to="/home"> <button type="submit" className="btn btn-primary">Save</button> </Link>
                 <Link to="/home">  <button type="submit" className="ml-3 btn btn-success">Save and submit</button></Link>
                    </div>
                </div>
              </form>
  </div>
  <div className="card-footer"> </div>
                </div>
                </div>
                </div>


            </div>

        <Footer />
</div>
  );
};

export default EditIncident;
