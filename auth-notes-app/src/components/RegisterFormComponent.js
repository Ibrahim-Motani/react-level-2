import React from "react";
import useInput from '../hooks/use-input';

function RegisterComponent({registerUser}) {
  const {
    enteredValue: username,
    isValid : usernameIsValid,
    valueChangeHandler: usernameChangeHandler,
    hasError: usernameHasError,
    valueBlurHandler: usernameBlurHandler,
    reset: usernameReset,
  } = useInput(value => value.trim().length !== 0);

  const {
    enteredValue: email,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    hasError: emailHasError,
    valueBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(value => value.trim().length !== 0 && value.includes("@"));

  const {
    enteredValue: password,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    hasError: passwordHasError,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(value => value.trim().length !== 0 &&
    value.trim().length >= 8 &&
    value.trim().length <= 128);


  const formIsValid = passwordIsValid && usernameIsValid && emailIsValid;


  const handleSubmit = event => {
    if (!formIsValid) {
      return;
    }
    event.preventDefault();
    const formData = { username, email, password };
    registerUser(formData);
    emailReset();
    passwordReset();
    usernameReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onBlur={usernameBlurHandler}
        onChange={usernameChangeHandler}
        type="text"
        placeholder="Enter username"
      />{" "}
      <br />
      {usernameHasError && <p style={{ color: "red" }}>Username is invalid</p>}
      <input
        value={email}
        onBlur={emailBlurHandler}
        onChange={emailChangeHandler}
        type="email"
        placeholder="Enter email"
      />{" "}
      <br />
      {emailHasError && <p style={{ color: "red" }}>Email is invalid</p>}
      <input
        value={password}
        onBlur={passwordBlurHandler}
        onChange={passwordChangeHandler}
        type="password"
        placeholder="Enter password"
      />{" "}
      <br />
      {passwordHasError && <p style={{ color: "red" }}>Password is invalid</p>}
      <button type="submit">Register</button>
      <button>Cancel</button>
    </form>
  );
}

export default RegisterComponent;
