import {React, useContext} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router'
import UserContext from '../store/UserContext';
import axios from 'axios'


const Menu = () => {


  let user = {
    _id: "2",
    first_name: "Claude",
    last_name: "Oduori",
    email: "claude@gmail.com"
}

const userRolesObject = [{
  _id: "1",
  user_id: "2",
  role_id: "1",
},{
  _id: "2",
  user_id: "2",
  role_id: "3",
}, {
  _id: "3",
  user_id: "2",
  role_id: "4",
}, {
  _id: "4",
  user_id: "2",
  role_id: "4",
}, {
  _id: "5",
  user_id: "2",
  role_id: "5",
}, {
  _id: "6",
  user_id: "2",
  role_id: "6",
}, {
  _id: "7",
  user_id: "2",
  role_id: "7",
}]

const rolesObject = [{
    _id: "1",
    role_code: "IMS_ASSIGN_ROLES",
    system_id: "2"
}, {
    _id: "2",
    role_code: "IMS_CHECK_INCIDENT",
    system_id: "2"
}, {
    _id: "3",
    role_code: "IMS_RECORD_INCIDENT",
    system_id: "2"
}, {
    _id: "4",
    role_code: "MAIN_MANAGE_BRANCHES",
    system_id: "1"
}, {
    _id: "5",
    role_code: "IMS_MANAGE_INCIDENT_TYPES",
    system_id: "1"
}, {
    _id: "6",
    role_code: "MAIN_MANAGE_USERS",
    system_id: "1"
}, {
  _id: "7",
  role_code: "IMS_VIEW_REPORTS",
  system_id: "2"
}]

const systemsObject = [{
    _id: "1",
    sytem_name: "Main Bank System",
    sytem_code: "MAIN"
},{
    _id: "2",
    sytem_name: "Incidents Management System",
    sytem_code: "IMS"
}]



  // const obj = rolesObject.find(({role_code}) => role_code == 'MAIN_MANAGE_USERS')
  // const isFound = userRolesObject.some((user_role) => user_role.role_id === obj._id)
  // console.log(isFound)

  const usercontext = useContext(UserContext);
  const navigate = useNavigate();


  const logoutUser = (event) => {
    event.preventDefault()
    // const refreshToken= localStorage.getItem("refreshToken")
    const refreshToken = usercontext.refreshToken;
    const accessToken = usercontext.accessToken;
    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
      },
  };
    let logout_url = 'http://localhost:3000/auth/users/logout';
    fetch(logout_url, options)
      .then(response => {
          if (!response.ok) {
              throw Error(response.status);
          }
          return response.json();
      })
      .then(responseData => {
          console.log(responseData);
          usercontext.setIsLoggedIn(false);
          usercontext.setUserName('');
          usercontext.setEmail('');
          usercontext.setAccessToken('');
          usercontext.setRefreshToken('');
          return navigate('/');
      })
      .catch(e => {
          console.log(e);
      });
  }

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
          {userRolesObject.some((user_role) => user_role.role_id === rolesObject.find(({role_code}) => role_code == 'MAIN_MANAGE_BRANCHES')._id)
          ?
          <Link to="/manage-branch" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Manage branches
              {/* <span className="right badge badge-danger">New</span> */}
            </p>
          </Link>

          : null }
        </li>
        <li className="nav-item">
        {userRolesObject.some((user_role) => user_role.role_id === rolesObject.find(({role_code}) => role_code == 'IMS_MANAGE_INCIDENT_TYPES')._id)
          ?
          <Link to="/manage-incident" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Manage Incident Types
              {/* <span className="right badge badge-danger">New</span> */}
            </p>
          </Link>
          : null }
          
        </li>
        <li className="nav-item">
        {userRolesObject.some((user_role) => user_role.role_id === rolesObject.find(({role_code}) => role_code == 'IMS_VIEW_REPORTS')._id)
          ?
          <Link to="/home" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              View Reports
            </p>
          </Link>
          : null }
          
        </li>
        <li className="nav-item">
        {userRolesObject.some((user_role) => user_role.role_id === rolesObject.find(({role_code}) => role_code == 'MAIN_MANAGE_USERS')._id)
        || userRolesObject.some((user_role) => user_role.role_id === rolesObject.find(({role_code}) => role_code == 'IMS_ASSIGN_ROLES')._id)
        || userRolesObject.some((user_role) => user_role.role_id === rolesObject.find(({role_code}) => role_code == 'MAIN_ASSIGN_ROLES')._id)
          ?
          <Link to="/admin/users" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Admin module
            </p>
          </Link>
          : null }
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={logoutUser}>
            Logout
          </button>
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
