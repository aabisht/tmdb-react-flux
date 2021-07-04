import React from "react";
import { Link, NavLink } from "react-router-dom";
import DropDown from "./dropdown";
import LanguagePreferences from "./language-preferences";
import logo from "../../assets/logo.svg";
import HeaderSearch from "./header-search";
import sharedStores from "../../stores/sharedStores";

function Header() {
  const isLoginPageFlag = sharedStores.getIsLoginPage();

  return (
    <div className="header-container">
      <div className="header-container-wrapper">
        <div className="container">
          <div className="align-items-center d-flex header-menu-item-wrapper justify-content-between">
            <div className="header-logo-menu-wrapper d-flex align-items-center">
              <div className="header-logo-wrapper">
                <Link to="/" className="header-logo-link">
                  <img src={logo} alt="The Movie Database (TMDb)" />
                </Link>
              </div>
              <div className="header-logo-menu">
                <ul className="navbar-nav list-inline mb-0">
                  <li className="nav-item list-inline-item">
                    <NavLink
                      className="nav-link"
                      to="/"
                      exact
                      activeClassName="active"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item list-inline-item">
                    <NavLink
                      className="nav-link"
                      to="/tv-shows"
                      exact
                      activeClassName="active"
                    >
                      TV Shows
                    </NavLink>
                  </li>
                  <li className="nav-item list-inline-item">
                    <NavLink
                      className="nav-link"
                      to="/movies"
                      exact
                      activeClassName="active"
                    >
                      Movies
                    </NavLink>
                  </li>
                  <li className="nav-item list-inline-item">
                    <NavLink
                      className="nav-link"
                      to="/popular"
                      exact
                      activeClassName="active"
                    >
                      Popular
                    </NavLink>
                  </li>
                  <li className="nav-item list-inline-item">
                    <NavLink
                      className="nav-link"
                      to="/my-list"
                      exact
                      activeClassName="active"
                    >
                      My List
                    </NavLink>
                  </li>
                  <li className="nav-item list-inline-item">
                    <NavLink
                      className="nav-link"
                      to="/login"
                      exact
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header-right-menu-wrapper">
              <ul className="navbar-nav list-inline mb-0">
                <li className="nav-item list-inline-item">
                  <HeaderSearch />
                </li>
                <li className="nav-item list-inline-item">
                  <DropDown
                    dropdownText={[
                      <span
                        className="material-icons-outlined"
                        key="headerTranslate"
                      >
                        translate
                      </span>,
                    ]}
                    dropdownList={[
                      <LanguagePreferences key="headerTranslateList" />,
                    ]}
                    dropdownPosition="right"
                  />
                </li>
                {/* <li className="nav-item list-inline-item">
                  <DropDown
                    dropdownText={[
                      <span className="material-icons">notifications</span>,
                    ]}
                  />
                </li> */}
                {!isLoginPageFlag ? (
                  <li className="nav-item list-inline-item">
                    <DropDown
                      dropdownText={[
                        <span className="material-icons" key="headerAccount">
                          account_circle
                        </span>,
                      ]}
                      dropdownPosition="right"
                    />
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
