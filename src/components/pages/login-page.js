import React from "react";
import Login from "../common/login";
import AuthenticationStores from "../../stores/authenticationStores";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();

  if (AuthenticationStores.getIsUserLoggedIn()) history.push("/");

  return (
    <div className="container">
      <div className="page-no-banner d-flex align-items-center justify-content-center">
        <div className="login-wrapper">
          <div className="login-container-wrapper">
            <div className="login-page-wrapper">
              <div className="login-form-container">
                <div className="page-title mb-4">
                  <h2>Sign In</h2>
                </div>
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
