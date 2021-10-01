import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  registrationSuccesful: true,
  setStatusForSuccesfullRegistration: () => {},
  hideStatusForSuccesfullRegistration: () => {},
  loginSuccesful: false,
  setStatusForSuccesfullLogin: () => {},
  hideStatusForSuccesfullLogin: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [registrationSuccesful, setRegistrationSuccesful] = useState(false);
  const [loginSuccesful, setLoginSuccesful] = useState(false);

  const isLoggedIn = !!token;

  const loginHandler = token => {
    setToken(token);
    localStorage.setItem("token", token);
    console.log(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const setStatusForSuccesfullRegistration = () => {
    setRegistrationSuccesful(true);
  };

  const hideStatusForSuccesfullRegistration = () => {
    setRegistrationSuccesful(false);
  };

  const setStatusForSuccesfullLogin = () => {
    setLoginSuccesful(true);
  };

  const hideStatusForSuccesfullLogin = () => {
    setLoginSuccesful(false);
  };

  const contextValue = {
    token,
    login: loginHandler,
    isLoggedIn,
    logout: logoutHandler,
    registrationSuccesful,
    setStatusForSuccesfullRegistration,
    hideStatusForSuccesfullRegistration,
    loginSuccesful,
    setStatusForSuccesfullLogin,
    hideStatusForSuccesfullLogin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
