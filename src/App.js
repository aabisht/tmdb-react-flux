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
import ConfigurationStores from "./stores/configurationStores";

function App() {
  return (
    <div id="tmdbAppWrapper">
      <Header />
      <div className="body-container">
        <div className="body-container-wrapper">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/tv-shows" exact component={TVShowsPage} />
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/my-list" exact component={MyListPage} />
            <Route path="/search/:slug" exact component={SearchPage} />
            <Route path="/profile/:slug" exact component={ProfilePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route
              path="/browse/:type/:genre/:genreId"
              exact
              component={BrowsePage}
            />
            <Route
              path="/detail/:type/:mediaId"
              exact
              component={MediaDetailPage}
            />
          </Switch>
        </div>
      </div>
      <MediaCardPopup />
      {ConfigurationStores.getFullPageLoaderValue() ? (
        <FullPageLoader />
      ) : (
        <></>
      )}
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
