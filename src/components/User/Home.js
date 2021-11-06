import React from 'react'
import Menu from '../Layouts/Menu'
import Header from '../Layouts/Header'
import Footer from '../Layouts/Footer'
import IncidentTable from './IncidentEntry/IncidentTable'
import {Link} from 'react-router-dom'
const Home = () => {
    return (
        <div className="wrapper">  
             <div>
             
            <Header />
            <Menu />
  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
 <div classname="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-12 mr-2">
      <Link to="/incident-entry"><button className="mt-2 btn btn-primary float-right">Record Incident</button></Link>
      </div>{/* /.col */}
    </div>{/* /.row */}
</div>

    </div>
    {/* /.content-header */}
    {/* Main content */}
    <div className="content">
      <div className="container-fluid">
            <div className="wrapper">
                
                 <IncidentTable />
            </div>
      </div>
      {/* /.container-fluid */}
    </div>
    {/* /.content */}
  </div>
  {/* /.content-wrapper */}
  <Footer />
</div>
            </div>
    )
}

export default Home
