import { useNavigate } from "react-router"
import React, {useState, useRef, useContext} from 'react'
import axios from 'axios';
import UserContext from '../../store/UserContext';




const Login = () => {
  const usercontext = useContext(UserContext);
  const [username,setUsername]=useState();
  const [accessToken,setAccessToken]=useState();
  const [refreshToken,setRefreshToken]=useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  let message=''
  const attemptLogin = () => {
    const email=emailRef.current.value
    const password=passwordRef.current.value
    // var auth_url = 'http://auth-server:3000/auth/users/login';
    var auth_url = `http://127.0.0.1:3000/auth/users/login`
    axios.post(auth_url, {
      email: email,
      password: password
    })
    .then(function(response) {
      return response.data
    })
    .then(function(responseData) {
      console.log(responseData)
      let msg=responseData.msg
      // console.log((response.headers))
      if(msg==="Sucess"){
        usercontext.setIsLoggedIn(true);
        usercontext.setUserName(responseData.user.name);
        usercontext.setEmail(responseData.user.email);
        usercontext.setAccessToken(responseData.accessToken);
        usercontext.setRefreshToken(responseData.refreshToken);

        return navigate('/home')
      }
      else{
        console.log('invalid credentials')
      }
    }).catch(function(error) {
      console.log(error)
      // message=error
      // console.log(error.response.status)
    });
  }
    return (
        <div className="login-page">

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
