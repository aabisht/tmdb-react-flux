import React from "react";
import Login from "./login";
import AuthenticationStores from "../../stores/authenticationStores";

function LoginDropdown() {
  const isUserLoggedInFlag = AuthenticationStores.getIsUserLoggedIn();

  return isUserLoggedInFlag ? (
    <></>
  ) : (
    <div className="login-dropdown-wrapper">
      <div className="h3 mb-4">Login</div>
      <Login />
    </div>
  );
}

export default LoginDropdown;
