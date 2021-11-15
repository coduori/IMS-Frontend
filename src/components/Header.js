import {useContext} from 'react';
import UserContext from '../store/UserContext';

const Header = (props) => {

  const usercontext = useContext(UserContext);
  const isLoggedIn = usercontext.isLoggedIn;

  let username = (usercontext.name == null) ? "" : usercontext.name.split(' ')[0]

  // if (usercontext.name == null) username = "";
  // else username = usercontext.name.split(' ')[0];
  

  return (
    <div className="container">
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/home"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          
        {username}
              
        </ul>
      </nav>
    </div>
  );
};

export default Header;
