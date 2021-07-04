import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Header from "./components/common/header";

import HomePage from "./components/pages/home-page";
import TVShowsPage from "./components/pages/tv-shows-page";
import MoviesPage from "./components/pages/movies-page";
import PopularPage from "./components/pages/popular-page";
import MyListPage from "./components/pages/my-list-page";
import SearchPage from "./components/pages/search-page";
import LoginPage from "./components/pages/login-page";

import { isLoginPage } from "./actions/sharedAction";
import sharedStores from "./stores/sharedStores";

function App() {
  const location = useLocation();
  const isLoginPageFlag = sharedStores.getIsLoginPage();

  isLoginPage(location.pathname === "/login" ? true : false);

  let onLoginPageFlagChange = () => {
    sharedStores.getIsLoginPage();
  };

  useEffect(() => {
    isLoginPage(location.pathname === "/login" ? true : false);
    sharedStores.addChangeListener(onLoginPageFlagChange);
    return () => sharedStores.removeChangeListner(onLoginPageFlagChange);
  }, [location, isLoginPageFlag]);

  return (
    <>
      <Header />
      <div className="body-container">
        <div className="body-container-wrapper">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/tv-shows" component={TVShowsPage} />
            <Route path="/movies" component={MoviesPage} />
            <Route path="/popular" component={PopularPage} />
            <Route path="/my-list" component={MyListPage} />
            <Route path="/search/:slug" component={SearchPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
