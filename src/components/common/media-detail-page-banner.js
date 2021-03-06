import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import StarRatings from "react-star-ratings";
import Moment from "react-moment";
import moment from "moment";
import apiConstants from "../../api/apiConstants";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import ConfigurationImage from "./configuration-image";
import VideoBanner from "./video-banner";
import banner_path from "../../assets/banner-not-found-detail.png";
import poster_path from "../../assets/poster-path-not-found.jpg";

function MediaDetailPageBanner(props) {
  const mediaDetails = MediaDetailPageStore.getMediaDetails();

  const mediaType = props.mediaType;
  const mediaId = parseInt(props.mediaId);

  const oldDate = moment().add(-30, "d");
  const releaseDate = moment(
    mediaType === apiConstants.MEDIA_TV
      ? mediaDetails?.first_air_date
      : mediaDetails?.release_date
  ).add(-7, "d");

  const currentDate = moment();
  ReactTooltip.rebuild();

  const isNew = releaseDate >= oldDate && releaseDate <= currentDate;

  return mediaDetails && mediaDetails?.id === mediaId ? (
    <div className="page-banner">
      <div className="page-banner-wrapper">
        <div className="page-banner-bg-wrapper">
          {mediaDetails?.backdrop_path ? (
            <ConfigurationImage
              path={mediaDetails?.backdrop_path}
              alt={
                mediaType === apiConstants.MEDIA_TV
                  ? mediaDetails?.name
                  : mediaDetails?.original_title
              }
              img_type={apiConstants.IMAGE_TYPE_BACKDROP}
              img_size_index={2}
              className="page-banner-img-bg"
            />
          ) : (
            <img
              src={banner_path}
              alt={
                mediaType === apiConstants.MEDIA_TV
                  ? mediaDetails?.name
                  : mediaDetails?.original_title
              }
              className="banner-not-found page-banner-img-bg"
            />
          )}
          <VideoBanner mediaType={mediaType} mediaId={mediaId} />
          <div className="page-banner-overlay-bg"></div>
        </div>
        <div className="page-banner-content-wrapper d-flex align-items-end h-100">
          <div className="page-banner-content-container container d-flex align-items-end justify-content-between">
            <div className="page-banner-info-wrapper full-width">
              <div className="row align-items-end">
                <div className="col-12 page-banner-poster-wrapper">
                  <div className="page-banner-poster-img-wrapper">
                    {mediaDetails?.poster_path ? (
                      <ConfigurationImage
                        path={mediaDetails?.poster_path}
                        alt={
                          mediaType === apiConstants.MEDIA_TV
                            ? mediaDetails?.name
                            : mediaDetails?.original_title
                        }
                        img_type={apiConstants.IMAGE_TYPE_POSTER}
                        img_size_index={3}
                        className="page-poster-img-bg"
                      />
                    ) : (
                      <img
                        src={poster_path}
                        alt={
                          mediaType === apiConstants.MEDIA_TV
                            ? mediaDetails?.name
                            : mediaDetails?.original_title
                        }
                        className="poster-not-found"
                      />
                    )}

                    {mediaDetails?.networks?.length > 0 ? (
                      <div className="network-img-wrapper text-center">
                        <ConfigurationImage
                          path={mediaDetails?.networks[0]?.logo_path}
                          alt={mediaDetails?.networks[0]?.name}
                          img_type={apiConstants.IMAGE_TYPE_LOGO}
                          img_size_index={1}
                          className="network-img"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-12  page-banner-info-container page-banner-detail-info-container">
                  <h2 className="title mb-3">
                    {mediaType === apiConstants.MEDIA_TV ? (
                      <span className="material-icons-outlined border-icon">
                        tv
                      </span>
                    ) : (
                      <span className="material-icons-outlined border-icon">
                        movie
                      </span>
                    )}
                    <span className="original-language ms-3 text-uppercase border-text">
                      {mediaDetails?.original_language}
                    </span>
                    {isNew ? (
                      <>
                        <span className="original-language ms-3 text-uppercase border-text">
                          NEW
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <strong className="ms-3">
                      {mediaType === apiConstants.MEDIA_TV
                        ? mediaDetails?.name
                        : mediaDetails?.original_title}
                    </strong>
                    {mediaDetails.tagline && mediaDetails.tagline.length > 0 ? (
                      <strong className="ms-3">
                        : {mediaDetails?.tagline}
                      </strong>
                    ) : (
                      <></>
                    )}
                    <span className="ms-2">
                      (
                      <Moment format="YYYY">
                        {mediaType === apiConstants.MEDIA_TV
                          ? mediaDetails?.first_air_date
                          : mediaDetails?.release_date}
                      </Moment>
                      )
                    </span>
                  </h2>
                  <div className="media-meta mb-2">
                    <span className="media-meta-type">
                      <Moment format="DD-MM-YYYY">
                        {mediaType === apiConstants.MEDIA_TV
                          ? mediaDetails?.first_air_date
                          : mediaDetails?.release_date}
                      </Moment>
                    </span>
                    <span className="seperator"></span>
                    {mediaDetails?.production_countries.length > 0 ? (
                      <>
                        <span className="media-meta-type">
                          {mediaDetails?.production_countries.map(
                            (data, index) => {
                              return (
                                <span key={index} className="media-meta-child">
                                  {data?.iso_3166_1}
                                </span>
                              );
                            }
                          )}
                        </span>
                        <span className="seperator"></span>
                      </>
                    ) : (
                      <></>
                    )}
                    {mediaDetails?.genres.length > 0 ? (
                      <span className="media-meta-type">
                        {mediaDetails?.genres.map((data, index) => {
                          return (
                            <span key={index} className="media-meta-child">
                              {data?.name}
                            </span>
                          );
                        })}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className="description">{mediaDetails?.overview}</p>
                  <div className="d-flex align-item-center">
                    <div
                      className="star-rate-btn-wrapper"
                      data-tip={mediaDetails?.vote_average + " Rating"}
                    >
                      <StarRatings
                        rating={mediaDetails?.vote_average / 2}
                        numberOfStars={5}
                        svgIconPath={
                          "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        }
                        svgIconViewBox={"0 0 24 24"}
                        starHoverColor={"#1ed5a9"}
                        starRatedColor={"#1ed5a9"}
                      />
                    </div>
                  </div>
                </div>
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

MediaDetailPageBanner.prototype = {
  mediaType: PropTypes.string.required,
  mediaId: PropTypes.string.required,
};

export default MediaDetailPageBanner;
