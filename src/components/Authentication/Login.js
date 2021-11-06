import React from 'react'
import {Link} from 'react-router-dom'
const Login = () => {
    return (
        <div class="login-page">

<div className="login-box">
  <div className="login-logo">
    <a href="#"><b>AquaRose</b>Bank</a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <form action="../../index3.html" method="post">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Username" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-lock" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">

          </div>
          {/* /.col */}
          <div className="col-4">
           <Link to="/home"> <button type="submit" className="btn btn-primary btn-block">Sign In</button></Link>
          </div>
          {/* /.col */}
        </div>
      </form>
    </div>
    {/* /.login-card-body */}
  </div>
</div>

        </div>
    )
}

export default Login
