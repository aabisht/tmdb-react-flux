import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/common/header";
import FullPageLoader from "./components/common/_full-page-loader";

import HomePage from "./components/pages/home-page";
import TVShowsPage from "./components/pages/tv-shows-page";
import MoviesPage from "./components/pages/movies-page";
import PopularPage from "./components/pages/popular-page";
import MyListPage from "./components/pages/my-list-page";
import SearchPage from "./components/pages/search-page";
import LoginPage from "./components/pages/login-page";

function App() {
  return (
    <div id="tmdbAppWrapper">
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
            <Route path="/login" exact component={LoginPage} />
          </Switch>
        </div>
      </div>
      <FullPageLoader />
    </div>
  );
}

export default App;
