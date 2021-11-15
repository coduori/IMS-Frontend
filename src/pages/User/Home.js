import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import IncidentTable from './IncidentEntry/IncidentTable'
import {Link} from 'react-router-dom'
const Home = (props) => {
    return (
        <div className="wrapper">  
             <div>
             
            <Header loggedInUser={props.loggedInUser}/>
            <Menu />
  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
 <div className="content-header">
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
