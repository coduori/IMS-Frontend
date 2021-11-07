import React, {useState} from "react";
import Menu from "../../Layouts/Menu";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";
import {Link} from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const IncidentEntry = () => {
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
            <div className="wrapper">

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
                    <input type="text" className="form-control" placeholder="Alerted By" />
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
                    <textarea type="text" className="form-control" placeholder="Enter incident description here..." />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label >Incident Action</label>
                    <textarea type="text" className="form-control" placeholder="Enter incident action here" />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label >Further action</label>
                    <textarea type="text" className="form-control" placeholder="Entere further action on incident here" />
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

            </div>

          {/* /.content */}
        {/* /.content-wrapper */}
        <Footer />
</div>
  );
};

export default IncidentEntry;
