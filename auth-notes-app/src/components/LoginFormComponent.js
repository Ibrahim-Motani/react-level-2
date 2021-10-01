import React from "react";
import useInput from '../hooks/use-input';

function LoginFormComponent({loginUser}) {
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
  } = useInput(
    value =>
      value.trim().length !== 0 &&
      value.trim().length >= 8 &&
      value.trim().length <= 128
      );
    
    const formIsValid = emailIsValid && passwordIsValid;

  const handleSubmit = event => {
      event.preventDefault();
      if (!formIsValid) {
          return;
      }
      const formData = { email, password };
      loginUser(formData);
      emailReset();
      passwordReset();
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
      <button>Cancel</button>
    </form>
  );
}

export default LoginFormComponent;
