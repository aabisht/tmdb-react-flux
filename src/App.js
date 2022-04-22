import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/common/header";
import FullPageLoader from "./components/common/full-page-loader";

import HomePage from "./components/pages/home-page";
import TVShowsPage from "./components/pages/tv-shows-page";
import MoviesPage from "./components/pages/movies-page";
import MyListPage from "./components/pages/my-list-page";
import SearchPage from "./components/pages/search-page";
import LoginPage from "./components/pages/login-page";
import ProfilePage from "./components/pages/profile-page";
import MediaCardPopup from "./components/common/media-card-popup";
import BrowsePage from "./components/pages/browse-page";
import MediaDetailPage from "./components/pages/media-detail-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";

function App() {
  return (
    <div id="tmdbAppWrapper">
      <Header />
      <div className="body-container">
        <div className="body-container-wrapper">
          <Switch>
            <Route
              path="/browse/:type/:genre/:genreId"
              component={BrowsePage}
            />
            <Route path="/detail/:type/:mediaId" component={MediaDetailPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/profile/:slug" component={ProfilePage} />
            <Route path="/search/:slug" component={SearchPage} />
            <Route path="/my-list" component={MyListPage} />
            <Route path="/tv-shows" component={TVShowsPage} />
            <Route path="/movies" component={MoviesPage} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </div>
      </div>
      <MediaCardPopup />
      <FullPageLoader />
      <ToastContainer pauseOnHover draggable hideProgressBar />
      <ReactTooltip
        place="top"
        type="light"
        effect="solid"
        className="tool-tip-wrapper"
      />
    </div>
  );
}

export default App;
