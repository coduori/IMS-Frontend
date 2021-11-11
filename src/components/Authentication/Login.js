import { useNavigate } from "react-router"
import React, {useState, useRef} from 'react'
import axios from 'axios'

const Login = () => {
  const [username,setUsername]=useState()
  const [accessToken,setAccessToken]=useState()
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  let message=''
  const attemptLogin = () => {
    const email=emailRef.current.value
    const password=passwordRef.current.value
    var auth_url = 'http://localhost:3000/auth/users/login';
    axios.post(auth_url, {
      email: email,
      password: password
    }).then(function(response) {
      return response.data
    }).then(function(response) {
      
      localStorage.setItem("user name",response.user.name)
      let accessToken=response.accessToken
      let msg=response.msg
      console.log((response.headers))
      if(msg==="Sucess"){
      return navigate('/home')
      }
      else{
        console.log('invalid credentials')
      }
    }).catch(function(error) {
      message=error
      console.log(error.response.status)
    });
  }
    return (
        <div class="login-page">

<div className="login-box">
  <div className="login-logo">
    <a href="https://google.com"><b>AquaRose</b>Bank</a>
  </div>
  {/* /.login-logo */}
  <div className="card">
    <div className="card-body login-card-body">
      <p className="login-box-msg">Sign in to start your session</p>
      <p>{message}</p>
      <form >
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Username" ref={emailRef}/>
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" ref={passwordRef}/>
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
          <button type="button" className="btn btn-primary btn-block" onClick={attemptLogin} >Sign In</button>
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
