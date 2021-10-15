import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/common/header";
import FullPageLoader from "./components/common/full-page-loader";

import HomePage from "./components/pages/home-page";
import TVShowsPage from "./components/pages/tv-shows-page";
import MoviesPage from "./components/pages/movies-page";
import PopularPage from "./components/pages/popular-page";
import MyListPage from "./components/pages/my-list-page";
import SearchPage from "./components/pages/search-page";
import LoginPage from "./components/pages/login-page";
import ProfilePage from "./components/pages/profile-page";
import MediaCardPopup from "./components/common/media-card-popup";
import GenreListAllPage from "./components/pages/genre-list-all-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Route path="/profile/:slug" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route
              path="/browse/:type/:genre/:genreId"
              component={GenreListAllPage}
            />
          </Switch>
        </div>
      </div>
      <MediaCardPopup />
      <FullPageLoader />
      <ToastContainer pauseOnHover draggable hideProgressBar />
    </div>
  );
}

export default App;
