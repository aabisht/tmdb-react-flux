import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function Header() {
  return (
    <div className="header-container">
      <div className="header-container-wrapper">
        <div className="container">
          <div className="header-menu-item-wrapper">
            <div className="header-logo-menu-wrapper">
              <div className="header-logo-wrapper">
                <Link to="/" className="header-logo-link">
                  <img src={logo} alt="The Movie Database (TMDb)" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
