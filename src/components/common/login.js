import React, { useState, useEffect } from "react";
import InputText from "./inputText";
import { isUserLoggedIn } from "../../actions/sharedAction";
import sharedStores from "../../stores/sharedStores";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const routeTo = "/";

  const [username, updateUsernameValue] = useState("");
  const [password, updatePasswordValue] = useState("");
  const [isUserLoggedInFlag, setIsUserLoggedInFlag] = useState(
    sharedStores.getIsUserLoggedIn()
  );

  let onUserLoggedInFlagChange = () => {
    setIsUserLoggedInFlag(sharedStores.getIsUserLoggedIn());
  };

  useEffect(() => {
    sharedStores.addChangeListener(onUserLoggedInFlagChange);
    if (isUserLoggedInFlag === undefined) isUserLoggedIn(false);
    return () => sharedStores.removeChangeListner(onUserLoggedInFlagChange);
  }, [isUserLoggedInFlag]);

  let handleOnchangeUsername = (event) => {
    updateUsernameValue(event.target.value);
  };

  let handleOnchangePassword = (event) => {
    updatePasswordValue(event.target.value);
  };

  let handleOnSubmit = (event) => {
    event.preventDefault();
    isUserLoggedIn(true);
    history.push(routeTo);
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
