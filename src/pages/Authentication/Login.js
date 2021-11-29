import { useNavigate } from "react-router"
import {Link} from 'react-router-dom'
import React, {useState, useRef, useContext} from 'react'
import axios from 'axios';
import UserContext from '../../store/UserContext';
import { FormGroup, InputGroup, Text , Button, Checkbox} from '@blueprintjs/core';
import { ErrorNotification } from "../../components/Messages/ErrorNotification";




const Login = () => {
  const usercontext = useContext(UserContext);
  const [username,setUsername]=useState();
  const [accessToken,setAccessToken]=useState();
  const [refreshToken,setRefreshToken]=useState();
  const [error_messages, setErrorMessages] = useState([])

  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  let message='';

  const attemptLogin = () => {
    const email = emailRef.current.value
    const password = passwordRef.current.value


    var login_url = `http://127.0.0.1:3000/auth/users/login`
    // axios.post(auth_url, {
    //   email: email,
    //   password: password
    // })
    // .then(function(response) {
    //   return response.data
    // })
    // .then(function(responseData) {
    //   console.log(responseData)
    //   let msg = responseData.msg
    //   // console.log((response.headers))
    //   if(msg==="Sucess"){
    //     usercontext.setIsLoggedIn(true);
    //     usercontext.setUserName(`${responseData.user.first_name} ${responseData.user.surname}`);
    //     usercontext.setEmail(responseData.user.email);
    //     usercontext.setAccessToken(responseData.accessToken);
    //     usercontext.setRefreshToken(responseData.refreshToken);

    //     return navigate('/home')
    //   }
    //   else{
    //     console.log('invalid credentials')
    //   }
    // }).catch(function(error) {
    //   console.log(error)
    //   // message=error
    //   // console.log(error.response.data.errors)
    //   // setErrorMessages(error.response.data.errors)
    // });

    const postData = {
      email,
      password
    };

    const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    async function fetchData() {
      try {
        const response = await fetch(login_url, options);
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          usercontext.setIsLoggedIn(true);
          usercontext.setUserName(`${responseData.user.first_name} ${responseData.user.surname}`);
          usercontext.setEmail(responseData.user.email);
          usercontext.setAccessToken(responseData.accessToken);
          usercontext.setRefreshToken(responseData.refreshToken);
          return navigate('/home');
        } else {
          const responseData = await response.json();
          console.log(responseData);
          // setErrorMessages(responseData.errors)
          responseData.errors.map(error => {
            console.log(error.message)
            ErrorNotification.show({icon: "warning-sign", message: error.message, timeout: 3000, intent: "danger"});
          })
        }
      } catch (failedResponse) {
        // console.log(await failedResponse.data)
      }
    }

    fetchData();
  }
      
  return (
    
    <div className="login-page">
      
      <div className="login-box">
        <div className="login-logo">
          <Link to="/" className="brand-link">
            <a href="#"><b>AquaRose</b>Bank</a>
          </Link>
        </div>
    
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <p>{message}</p>
            <form >

              <InputGroup
                leftIcon="envelope"
                id="email-input"
                className="mb-3"
                placeholder="Email"
                inputRef={emailRef}
                large={true}
              />

              <InputGroup
                type="password"
                leftIcon="lock"
                id="password-input"
                className="mb-3"
                placeholder="Password"
                inputRef={passwordRef}
                large={true}
              />

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
