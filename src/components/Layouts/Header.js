import React from "react";
const Header = (props) => {
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
          
        {localStorage.getItem("user name")}
              
        </ul>
      </nav>
    </div>
  );
};

export default Header;
