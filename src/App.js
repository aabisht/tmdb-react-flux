import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/common/header";

import HomePage from "./components/pages/home-page";
import TVShowsPage from "./components/pages/tv-shows-page";
import MoviesPage from "./components/pages/movies-page";
import PopularPage from "./components/pages/popular-page";
import MyListPage from "./components/pages/my-list-page";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/tv-shows" component={TVShowsPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/popular" component={PopularPage} />
        <Route path="/my-list" component={MyListPage} />
      </Switch>
    </>
  );
}

export default App;
