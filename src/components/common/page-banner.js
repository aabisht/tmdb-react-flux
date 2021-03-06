import React from "react";
import PropTypes from "prop-types";
import apiConstants from "../../api/apiConstants";
import ConfigurationImage from "./configuration-image";

function PageBanner(props) {
  let bannername, releaseYear;
  if (
    props.bannerData?.media_type === apiConstants.MEDIA_TV ||
    props.bannerType === apiConstants.MEDIA_TV
  ) {
    bannername = props.bannerData?.name;
    releaseYear = new Date(props.bannerData?.first_air_date).getFullYear();
  } else {
    bannername = props.bannerData?.title;
    releaseYear = new Date(props.bannerData?.release_date).getFullYear();
  }

  return props.bannerData?.backdrop_path ? (
    <div className="page-banner">
      <div className="page-banner-wrapper">
        <div className="page-banner-bg-wrapper">
          <ConfigurationImage
            path={props.bannerData?.backdrop_path}
            alt={bannername}
            img_type={apiConstants.IMAGE_TYPE_BACKDROP}
            img_size_index={2}
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
  ) : (
    <></>
  );
}

PageBanner.prototype = {
  bannerData: PropTypes.object.required,
  bannerType: PropTypes.string,
};

export default PageBanner;
