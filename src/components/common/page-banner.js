import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ConfigurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";
import apiConstants from "../../api/apiConstants";

function PageBanner(props) {
  const [apiConfigurations, setApiConfigurations] = useState(
    ConfigurationStores.getAPIConfiguration()
  );

  useEffect(() => {
    ConfigurationStores.addChangeListener(onApiConfigurationsChange);
    if (apiConfigurations.length === 0) {
      configurationAction.fullPageLoaderFlag(true);
      configurationAction.loadAPIConfiguration().then(() => {
        configurationAction.fullPageLoaderFlag(false);
      });
    }
    return () =>
      ConfigurationStores.removeChangeListner(onApiConfigurationsChange);
  }, [apiConfigurations.length]);

  const onApiConfigurationsChange = () => {
    setApiConfigurations(ConfigurationStores.getAPIConfiguration());
  };

  let bannername, releaseYear;

  if (props.bannerData?.media_type === apiConstants.MEDIA_TV) {
    bannername = props.bannerData?.name;
    releaseYear = props.bannerData?.first_air_date.split("-")[0];
  } else {
    bannername = props.bannerData?.title;
    releaseYear = props.bannerData?.release_date.split("-")[0];
  }
  return (
    <div className="page-banner">
      <div className="page-banner-wrapper">
        <div className="page-banner-bg-wrapper">
          <img
            src={
              ConfigurationStores.getBaseURL() +
              ConfigurationStores.getBackdropSizes()[3] +
              props.bannerData?.backdrop_path
            }
            alt={bannername}
            className="page-banner-img-bg"
          />
          <div className="page-banner-overlay-bg"></div>
        </div>
        <div className="page-banner-content-wrapper d-flex align-items-end h-100">
          <div className="page-banner-content-container container d-flex align-items-end justify-content-between pe-0">
            <div className="page-banner-info-wrapper">
              <div className="page-banner-info-container">
                <h2 className="title">
                  {props.bannerData?.media_type === apiConstants.MEDIA_TV ? (
                    <span className="material-icons-outlined">tv</span>
                  ) : (
                    <span className="material-icons-outlined">movie</span>
                  )}
                  <strong className="ms-3">
                    {bannername} ({releaseYear})
                  </strong>
                </h2>
                <p className="description">{props.bannerData?.overview}</p>
                <a
                  href="/"
                  className="btn outline white d-inline-flex align-items-center"
                >
                  <span className="material-icons-outlined me-2">info</span>
                  <span>More Info</span>
                </a>
              </div>
            </div>
            <div className="page-banner-meta-wrapper">
              <div className="rating-wrapper d-flex align-items-center justify-content-center">
                <span className="material-icons-outlined me-2">grade</span>
                <span className="rating-value">
                  {props.bannerData?.vote_average}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PageBanner.prototype = {
  bannerData: PropTypes.object.required,
};

export default PageBanner;
