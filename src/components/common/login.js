import React, { useState } from "react";
import InputText from "./inputText";
import { isUserLoggedIn, createSessionId } from "../../actions/sharedAction";
import { useHistory, useLocation } from "react-router-dom";
import * as authenticationApi from "../../api/authentication";

function Login() {
  const history = useHistory();
  const location = useLocation();
  const routeTo =
    location.pathname.toLowerCase() === "/login" ? "/" : location.pathname;

  const [username, updateUsernameValue] = useState("");
  const [password, updatePasswordValue] = useState("");

  let handleOnchangeUsername = (event) => {
    updateUsernameValue(event.target.value);
  };

  let handleOnchangePassword = (event) => {
    updatePasswordValue(event.target.value);
  };

  let handleOnSubmit = (event) => {
    event.preventDefault();
    authenticationApi.getRequestToken().then((request_token_data) => {
      if (request_token_data.success) {
        authenticationApi
          .createSessionWithLogin(
            username,
            password,
            request_token_data.request_token
          )
          .then((validateData) => {
            if (validateData.success) {
              authenticationApi
                .createSession(validateData.request_token)
                .then((sessionData) => {
                  if (sessionData.success) {
                    createSessionId(sessionData.session_id);
                    sessionStorage.setItem("sessionID", sessionData.session_id);
                    isUserLoggedIn(sessionData.success);
                    history.push(routeTo);
                  }
                });
            }
          });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
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
