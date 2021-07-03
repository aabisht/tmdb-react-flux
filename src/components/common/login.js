import React from "react";
import InputText from "./inputText";

function Login(props) {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={props.onSubmit}>
        <InputText
          label="User Name"
          id="userName"
          name="userName"
          type="text"
          placeholder="Enter Username"
          formGroupClassName="mb-3"
        />
        <InputText
          label="Password"
          id="userPassword"
          name="userPassword"
          type="password"
          formGroupClassName="mb-3"
        />
        <button type="submit" className="btn btn-block primary">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
