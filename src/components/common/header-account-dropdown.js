import React from "react";
import sharedStores from "../../stores/authenticationStores";

function HeaderAccountDropdown() {
  const isUserLoggedInFlag = sharedStores.getIsUserLoggedIn();

  return !isUserLoggedInFlag ? (
    <></>
  ) : (
    <div className="login-dropdown-wrapper">
      <div className="h3 mb-4">User</div>
    </div>
  );
}

export default HeaderAccountDropdown;
