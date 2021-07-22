import React from "react";
import Login from "./login";
import sharedStores from "../../stores/sharedStores";

function LoginDropdown() {
  const isUserLoggedInFlag = sharedStores.getIsUserLoggedIn();

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
