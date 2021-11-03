import React from 'react'
import Menu from '../Layouts/Menu'
import Header from '../Layouts/Header'
import Content from '../Layouts/Content'
import Footer from '../Layouts/Footer'

const Main = () => {
    return (
        <div>
             <Menu />
            <Header />
  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
 <div classname="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-12">
          <button className="mt-2 btn btn-primary float-right">Record Incident</button>
      </div>{/* /.col */}
    </div>{/* /.row */}
</div>

    </div>
    {/* /.content-header */}
    {/* Main content */}
    <div className="content">
      <div className="container-fluid">
            <div className="wrapper">
                
            </div>
      </div>
      {/* /.container-fluid */}
    </div>
    {/* /.content */}
  </div>
  {/* /.content-wrapper */}
  <Footer />
</div>

    )
}

export default Main
