import React from "react";
import logo from "../../assets/logo.svg";

function FullPageLoader() {
  return (
    <div className="full-page-loader-conainer p-fixed w-100 h-100 d-flex align-items-center justify-content-center">
      <div className="loader-item">
        <div className="loader-image">
          <img src={logo} alt="TMDB" />
        </div>
      </div>
    </div>
  );
}

export default FullPageLoader;
