import React from "react";
import Login from "../common/login";

function LoginPage() {
  return (
    <div className="page-no-banner">
      <div className="login-wrapper">
        <div className="login-container-wrapper">
          <div className="container">
            <div className="login-page-wrapper">
              <div className="login-form-container">
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
