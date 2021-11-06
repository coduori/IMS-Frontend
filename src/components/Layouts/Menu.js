import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
<>
{/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <Link to="/home" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">AquaRose Bank</span>
  </Link>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}

    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
      <li className="nav-item">
          <Link to="/home" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Home
              {/* <span className="right badge badge-danger">New</span> */}
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              View Reports
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Manage Roles
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/"className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Logout
            </p>
          </Link>
        </li>
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

</>

    )
}

export default Menu
