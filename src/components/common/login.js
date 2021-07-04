import React, { useState } from "react";
import InputText from "./inputText";

function Login(props) {
  const [username, updateUsernameValue] = useState("");
  const [password, updatePasswordValue] = useState("");

  let handleOnchangeUsername = (event) => {
    updateUsernameValue(event.target.value);
  };

  let handleOnchangePassword = (event) => {
    updatePasswordValue(event.target.value);
  };

  return (
    <>
      <form onSubmit={props.onSubmit}>
        <InputText
          label="User Name"
          id="userName"
          name="userName"
          type="text"
          formGroupClassName="mb-3"
          floatingLabels="true"
          value={username}
          onChange={handleOnchangeUsername}
        />
        <InputText
          label="Password"
          id="userPassword"
          name="userPassword"
          type="password"
          formGroupClassName="mb-3"
          floatingLabels="true"
          value={password}
          onChange={handleOnchangePassword}
        />
        <button type="submit" className="btn btn-block primary">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
