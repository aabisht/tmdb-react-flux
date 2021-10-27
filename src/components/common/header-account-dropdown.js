import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import AuthenticationStores from "../../stores/authenticationStores";
import AccountStores from "../../stores/accountStores";
import ConfigurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";
import * as authenticationAction from "../../actions/authenticationAction";

function HeaderAccountDropdown() {
  const accountData = AccountStores.getAccountInfo();
  const history = useHistory();
  const location = useLocation();
  const routeTo =
    location.pathname.toLowerCase() === "/login" ? "/" : location.pathname;

  const userLogout = () => {
    if (!ConfigurationStores.getFullPageLoaderValue())
      configurationAction.fullPageLoaderFlag(true);
    const session_id = AuthenticationStores.getSessionData().session_id;
    authenticationAction.deleteSession(session_id).then(() => {
      sessionStorage.removeItem("accountData");
      sessionStorage.removeItem("sessionData");
      authenticationAction.isUserLoggedIn(false);
      if (ConfigurationStores.getFullPageLoaderValue())
        configurationAction.fullPageLoaderFlag(false);
      history.push(routeTo);
    });
  };

  return (
    <div className="account-dropdown-wrapper">
      <ul className="list-unstyled dropdown-list-wrappper account-list-wrapper">
        <li>
          <div className="user-name-wrapper d-flex align-items-center">
            <div className="account-img-wrapper">
              <img
                src={
                  ConfigurationStores.getBaseURL() +
                  ConfigurationStores.getProfileSizes()[1] +
                  accountData.avatar?.tmdb.avatar_path
                }
                alt={accountData.name}
              />
            </div>
            <div className="account-name-wrapper ms-2">
              <span className="account-name d-block">
                <strong>{accountData.name}</strong>
              </span>
              <NavLink
                className="account-link"
                to={"/profile/" + accountData.username}
              >
                <small>View Profile</small>
              </NavLink>
            </div>
          </div>
        </li>
        <li>
          <button type="button" className="btn d-block text-nowrap w-100">
            Rated Movies
          </button>
        </li>
        <li>
          <button type="button" className="btn d-block text-nowrap w-100">
            Rated TV Shows
          </button>
        </li>
        <li>
          <button type="button" className="btn d-block text-nowrap w-100">
            Rated TV Episodes
          </button>
        </li>
        <li>
          <button type="button" className="btn d-block text-nowrap w-100">
            Movie Watchlist
          </button>
        </li>
        <li>
          <button type="button" className="btn d-block text-nowrap w-100">
            TV Show Watchlist
          </button>
        </li>
        <li>
          <button
            type="button"
            className="btn d-block text-nowrap w-100"
            onClick={userLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default HeaderAccountDropdown;
