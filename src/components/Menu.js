import {React, useContext} from 'react'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router'
import UserContext from '../store/UserContext';
import axios from 'axios'


const Menu = () => {

  const usercontext = useContext(UserContext);
  const navigate = useNavigate();


  const logoutUser = () => {
    // const refreshToken= localStorage.getItem("refreshToken")
    const refreshToken = usercontext.refreshToken;
    const accessToken = usercontext.accessToken;
    const options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${refreshToken} ${accessToken}`
      }
    }
    let logout_url = 'http://localhost:3000/auth/users/logout';
    axios.post(logout_url, options)
      .then(function(response) {
        return response.data
      })
      .then(function(responseData) {
          console.log(responseData)
          if(responseData.msg==="Sucess"){
            usercontext.setIsLoggedIn(false);
            usercontext.setUserName('');
            usercontext.setEmail('');
            usercontext.setAccessToken('');
            usercontext.setRefreshToken('');

            return navigate('/')
          }
          else{
            console.log('invalid credentials')
            return navigate('/');
          }
        })
        .catch(function(error) {
          console.log(error.response.status)
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
          <Link to="/add-branch" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Add branches
              {/* <span className="right badge badge-danger">New</span> */}
            </p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/add-incident" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
              Add Incident Types
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
            <i className="nav-icon fas fa-th" />
            <p onClick={logoutUser}>
              Logout
            </p>
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
