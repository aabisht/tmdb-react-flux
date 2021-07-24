import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import InputText from "./inputText";
import * as authenticationAction from "../../actions/authenticationAction";
import * as configurationAction from "../../actions/configurationAction";
import AuthenticationStores from "../../stores/authenticationStores";
import { toast } from "react-toastify";

function Login() {
  const history = useHistory();
  const location = useLocation();
  const routeTo =
    location.pathname.toLowerCase() === "/login" ? "/" : location.pathname;
  const [username, updateUsernameValue] = useState("");
  const [password, updatePasswordValue] = useState("");

  const handleOnchangeUsername = (event) => {
    updateUsernameValue(event.target.value);
  };

  const handleOnchangePassword = (event) => {
    updatePasswordValue(event.target.value);
  };

  const createRequestToken = () => {
    configurationAction.fullPageLoaderFlag(true);
    authenticationAction.createRequestToken().then(() => {
      configurationAction.fullPageLoaderFlag(false);
      const requestTokenData = AuthenticationStores.getRequestTokenData();
      if (requestTokenData?.success) {
        createSessionWithLogin(requestTokenData.request_token);
      }
    });
  };

  const createSessionWithLogin = (request_token) => {
    configurationAction.fullPageLoaderFlag(true);
    authenticationAction
      .createSessionWithLogin(username, password, request_token)
      .then(() => {
        configurationAction.fullPageLoaderFlag(false);
        const sessionWithLoginData = AuthenticationStores.getSessionWithLogin();
        sessionWithLoginData?.success
          ? createSession(sessionWithLoginData.request_token)
          : toast.success(sessionWithLoginData.status_message, {
              position: "bottom-right",
              autoClose: false,
              closeOnClick: true,
              pauseOnHover: true,
              type: "error",
            });
      });
  };

  const createSession = (request_token) => {
    configurationAction.fullPageLoaderFlag(true);
    authenticationAction.createSession(request_token).then(() => {
      configurationAction.fullPageLoaderFlag(false);
      const sessionData = AuthenticationStores.getSessionData();
      if (sessionData.success) {
        sessionStorage.setItem("sessionData", JSON.stringify(sessionData));
        authenticationAction.isUserLoggedIn(true);
        history.push(routeTo);
      }
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    createRequestToken();
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
