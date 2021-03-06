import React, { useState, useEffect } from "react";
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
import * as configurationAction from "./actions/configurationAction";

function App() {
  const [apiConfigurations, setApiConfigurations] = useState(
      ConfigurationStores.getAPIConfiguration()
    ),
    [defaultLanguage, setDefaultLanguage] = useState(
      ConfigurationStores.getDefaultLanguage()
    );

  const onApiConfigurationsChange = () => {
    setApiConfigurations(ConfigurationStores.getAPIConfiguration());
  };

  const onDefaultLanguageChange = () => {
    setDefaultLanguage(ConfigurationStores.getDefaultLanguage());
  };

  useEffect(() => {
    ConfigurationStores.addChangeListener(onApiConfigurationsChange);
    ConfigurationStores.addChangeListener(onDefaultLanguageChange);
    if (!apiConfigurations.images) {
      configurationAction.fullPageLoaderFlag(true);
      configurationAction.loadDefaultConfigurationData().then(() => {
        configurationAction.fullPageLoaderFlag(false);
      });
    }
    configurationAction.loadGenres(defaultLanguage).then(() => {
      configurationAction.fullPageLoaderFlag(false);
    });
    return () => {
      ConfigurationStores.removeChangeListner(onApiConfigurationsChange);
      ConfigurationStores.removeChangeListner(onDefaultLanguageChange);
    };
  }, [apiConfigurations, defaultLanguage]);

  return (
    <div id="tmdbAppWrapper">
      {Object.keys(apiConfigurations).length > 0 ? (
        <>
          <Header />
          <div className="body-container">
            <div className="body-container-wrapper">
              <Switch>
                <Route
                  path="/browse/:type/:genre/:genreId"
                  component={BrowsePage}
                />
                <Route
                  path="/detail/:type/:mediaId"
                  component={MediaDetailPage}
                />
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
        </>
      ) : (
        <></>
      )}
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
