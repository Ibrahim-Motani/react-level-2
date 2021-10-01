import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../store/auth-context";

function Account() {
  const {
    token,
    loginSuccesful,
    hideStatusForSuccesfullLogin,
  } = useContext(AuthContext);
    
  const [user, setUser] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      hideStatusForSuccesfullLogin();
    }, 5000);
  }, []);

  useEffect(() => {
    axios
      .get("http://dct-user-auth.herokuapp.com/users/account", {
        headers: {
          "x-auth": token,
        },
      })
      .then(response => {
        const result = response.data;
        setUser(result);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {loginSuccesful && (
        <p style={{ color: "green" }}>You are successfully logged in</p>
      )}
      <h2>User Account</h2>
      <p>Email - {user.email}</p>
      <p>Username - {user.username}</p>
      <p>Created at - {new Date(user.createdAt).toDateString()}</p>
    </div>
  );
}

export default Account;
