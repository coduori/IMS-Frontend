import { createContext, useReducer } from "react";

const authInitialState = {
  isLoggedIn: localStorage.getItem("userisloggedin") || false,
  name: localStorage.getItem("username") || "",
  email: localStorage.getItem("useremail") || "",
  refreshToken: localStorage.getItem("refreshToken") || null,
  accessToken: localStorage.getItem("accessToken") || null,
};

const context = {
  isLoggedIn: isLoggedIn,
  name: userName,
  email: userEmail,
  refreshToken: refreshToken,
  accessToken: accessToken,
  setUserName: setUserNameHandler,
  setEmail: setUserEmailHandler,
  setIsLoggedIn: setisLoggedInHandler,
  setRefreshToken: setRefreshTokenHandler,
  setAccessToken: setAccessTokenHandler,
};

const UserContext = createContext(authInitialState);
const authReducer = (prevState, newState) => {
  switch (newState.type) {
    case "LOGIN_STATUS":
      return { ...prevState, isLoggedIn: newState.isLoggedIn };
    case "USERNAME_VALUE":
      return { ...prevState, name: newState.name };
    case "EMAIL_VALUE":
      return { ...prevState, email: newState.email };
    case "REFRESH_TOKEN_VALUE":
      return { ...prevState, refreshToken: newState.refreshToken };
    case "ACCESS_TOKEN_VALUE":
      return { ...prevState, accessToken: newState.accessToken };
    default:
      return authInitialState;
  }
};

export const UserContextProvider = props => {
  const [authState, dispatchAuth] = useReducer(authReducer, authInitialState);
  const setisLoggedInHandler = loggedIn => {
    dispatchAuth({ type: "LOGIN_STATUS", isLoggedIn: loggedIn });
  };
  const setUserNameHandler = userName => {
    dispatchAuth({ type: "USERNAME_VALUE", name: userName });
  };
  const setUserEmailHandler = userEmail => {
    dispatchAuth({ type: "EMAIL_VALUE", email: userEmail });
  };
  const setRefreshTokenHandler = refreshToken => {
    dispatchAuth({ type: "REFRESH_TOKEN_VALUE", refreshToken: refreshToken });
  };
  const setAccessTokenHandler = accessToken => {
    dispatchAuth({ type: "ACCESS_TOKEN_VALUE", accessToken: accessToken });
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
