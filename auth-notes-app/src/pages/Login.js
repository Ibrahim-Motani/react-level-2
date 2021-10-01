import React, { useContext, useEffect } from "react";
import axios from "axios";
import LoginFormComponent from "../components/LoginFormComponent";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";

function Login({location}) {
    const history = useHistory();
    const {
        isLoggedIn,
        login,
        registrationSuccesful,
        hideStatusForSuccesfullRegistration,
        setStatusForSuccesfullLogin,
    } = useContext(AuthContext);
    
    let showNotLoggedInError = false;
    if (location.state) {
        showNotLoggedInError =
          location.state.from.pathname === "/account" && isLoggedIn === false;
    }

  useEffect(() => {
    setTimeout(() => {
      hideStatusForSuccesfullRegistration();
    }, 5000);
  }, []);

  const loginUser = formData => {
    axios
      .post("http://dct-user-auth.herokuapp.com/users/login", formData)
      .then(response => {
        const result = response.data;
        if (result.token) {
          login(result.token);
          setStatusForSuccesfullLogin();
          history.push("/account");
        } else if (result.errors) {
          alert(result.errors);
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };
    
  return (
    <div>
      {showNotLoggedInError && (
        <p style={{ color: "red" }}>
          You need to login first to view this page
        </p>
      )}
      {registrationSuccesful && (
        <p style={{ color: "green" }}>Account successfully created</p>
      )}
      <h2>Login to your account</h2>
      <LoginFormComponent loginUser={loginUser}></LoginFormComponent>
    </div>
  );
}

export default Login;
