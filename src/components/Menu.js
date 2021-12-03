import {React, useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router'
import UserContext from '../store/UserContext';

const Menu = () => {

  const usercontext = useContext(UserContext);
  const navigate = useNavigate();
  // const [loggedInUserRoles, setLoggedInUserRoles] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${usercontext.refreshToken} ${usercontext.accessToken}`
        },
    };

    let get_user_roles = `http://localhost:3001/admin/users/roles`

    async function fetchData() {
      const response = await fetch(get_user_roles, options);
      if (response.ok) {
        const responseData = await response.json()
        setRoles(responseData.roles)
        // setLoggedInUserRoles(responseData.loggedInUserRoles)
      } else {
        throw Error(response.status);
      }
    }
    
    fetchData();

}, []);

  const logoutUser = (event) => {
    event.preventDefault()
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
          {roles.includes('IMS_RECORD_INCIDENTS')
          || roles.includes('IMS_CHECK_INCIDENTS')
          ?
            <Link to="/manage-branch" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Manage branches
              </p>
            </Link>
          : null }
        </li>
        <li className="nav-item">
          {roles.includes('MAIN_MANAGE_BRANCHES')
          ?
            <Link to="/manage-branch" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Manage branches
              </p>
            </Link>
          : null }
        </li>
        <li className="nav-item">
        {roles.includes('MAIN_MANAGE_INCIDENT_TYPES')
        ?
          <Link to="/manage-incident" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Manage Incident Types
            </p>
          </Link>
        : null }
          
        </li>
        <li className="nav-item">
        {roles.includes('IMS_ASSIGN_ROLES')
        || roles.includes('MAIN_ASSIGN_ROLES')
        || roles.includes('MAIN_MANAGE_USERS')
        ?
          <Link to="/admin/users" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Admin module
            </p>
          </Link>
        : null }
        </li>
        {roles.includes('IMS_VIEW_USER_REPORTS')
        ?
          <Link to="/reports" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              View Reports
              {/* <span className="right badge badge-danger">New</span> */}
            </p>
          </Link>
        : null }
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
