import { createContext, useState } from "react";

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

const UserContext = createContext({
  isLoggedIn: false,
  name: "",
  email: "",
  refreshToken: null,
  accessToken: null,
  setUserName: userName => {},
  setEmail: userEmail => {},
  setIsLoggedIn: logged_in => {},
  setRefreshToken: token => {},
  setAccessToken: token => {},
});

export function UserContextProvider(props) {
  // const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userisloggedin") || false
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("username") || ""
  );
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("useremail") || ""
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || ""
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );

  const setUserNameHandler = user_name => {
    setUserName(user_name);
  };
  const setUserEmailHandler = user_name => {
    setUserEmail(user_email);
  };
  const setisLoggedInHandler = logged_in => {
    setIsLoggedIn(logged_in);
  };
  const setRefreshTokenHandler = refreshToken => {
    setRefreshToken(refreshToken);
  };
  const setAccessTokenHandler = accessToken => {
    setAccessToken(accessToken);
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
