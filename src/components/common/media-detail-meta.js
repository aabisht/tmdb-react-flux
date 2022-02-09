import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import ReactTooltip from "react-tooltip";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";
import ConfigurationStores from "../../stores/configurationStores";
import apiConstants from "../../api/apiConstants";

function MediaDetailsMeta(props) {
  const [mediaDetails, setMediaDetails] = useState([]);

  const onMediaDetailsChange = () => {
    setMediaDetails(MediaDetailPageStore.getMediaDetails());
  };

  const mediaType = props.mediaType;
  const mediaId = props.mediaId;

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaDetailsChange);
    if (mediaDetails.id !== mediaId)
      mediaDetailPageAction.loadMediaDataAndVideo(mediaType, mediaId);
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaDetailsChange);
    };
  }, [mediaType, mediaId, mediaDetails.id]);

  ReactTooltip.rebuild();

  return mediaDetails && Object.keys(mediaDetails).length > 0 ? (
    <div className="media-detail-meta-wrapper">
      {mediaDetails.networks && mediaDetails.networks.length > 0 ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Networks</h3>
          <ul className="list-unstyled">
            {mediaDetails?.networks.map((data, index) => {
              return (
                <li key={index}>
                  <div className="d-flex mb-2">
                    <div className="page-banner-poster-img-wrapper">
                      <img
                        src={
                          ConfigurationStores.getBaseURL() +
                          ConfigurationStores.getLogoSizes()[0] +
                          data.logo_path
                        }
                        alt={data.name}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
      {mediaDetails.original_name ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Original Name</h3>
          <p>{mediaDetails.original_name}</p>
        </div>
      ) : (
        <></>
      )}
      {mediaDetails.original_title ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Original Title</h3>
          <p>{mediaDetails.original_title}</p>
        </div>
      ) : (
        <></>
      )}
      {mediaDetails.status && mediaDetails.status.length > 0 ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Status</h3>
          <p>{mediaDetails.status}</p>
        </div>
      ) : (
        <></>
      )}
      {mediaDetails.spoken_languages &&
      mediaDetails.spoken_languages.length > 0 ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Spoken Language</h3>
          <ul className="list-unstyled">
            {mediaDetails?.spoken_languages.map((data, index) => {
              return (
                <li title={data?.english_name} key={index}>
                  {data?.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
      {mediaDetails.type ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Type</h3>
          <p>{mediaDetails.type}</p>
        </div>
      ) : (
        <></>
      )}
      {mediaDetails.budget ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Budget</h3>
          <p>
            {"$" +
              mediaDetails.budget.toString().replace(/.{3}/g, "$&,") +
              ".00"}
          </p>
        </div>
      ) : (
        <></>
      )}
      {mediaDetails.revenue ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Revenue</h3>
          <p>
            {"$" +
              mediaDetails.revenue.toString().replace(/.{3}/g, "$&,") +
              ".00"}
          </p>
        </div>
      ) : (
        <></>
      )}
      {mediaDetails.belongs_to_collection &&
      mediaDetails.belongs_to_collection?.id ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Collection</h3>
          {mediaDetails.belongs_to_collection.poster_path ? (
            <div className="d-flex mb-2">
              <div className="page-banner-poster-img-wrapper">
                <img
                  src={
                    ConfigurationStores.getBaseURL() +
                    ConfigurationStores.getPosterSizes()[1] +
                    mediaDetails.belongs_to_collection.poster_path
                  }
                  alt={mediaDetails.belongs_to_collection.name}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          <p>{mediaDetails.belongs_to_collection.name}</p>
        </div>
      ) : (
        <></>
      )}
      {mediaType === apiConstants.MEDIA_TV &&
      mediaDetails.seasons &&
      mediaDetails.seasons.length > 0 ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Seasons</h3>
          <ul className="list-unstyled">
            {mediaDetails?.seasons.map((data, index) => {
              return (
                <li title={data?.name} key={index}>
                  <div className="d-flex mb-2">
                    <div className="page-banner-poster-img-wrapper">
                      <img
                        src={
                          ConfigurationStores.getBaseURL() +
                          ConfigurationStores.getPosterSizes()[1] +
                          data?.poster_path
                        }
                        alt={data?.name}
                      />
                    </div>
                  </div>
                  <p>
                    {data?.name}
                    <br></br>
                    <strong>Total Episode: </strong>
                    {data?.episode_count}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
      {mediaType === apiConstants.MEDIA_TV &&
      mediaDetails.last_episode_to_air ? (
        <div className="media-detail-meta-item ">
          <h3 className="title">Last Episode To Air</h3>
          <div className="episode-air-card-wrapper">
            <div className="img-wrapper">
              <img
                src={
                  ConfigurationStores.getBaseURL() +
                  ConfigurationStores.getPosterSizes()[3] +
                  mediaDetails.last_episode_to_air?.still_path
                }
                alt={mediaDetails.last_episode_to_air?.name}
              />
            </div>
            <p>{mediaDetails.last_episode_to_air?.name}</p>
            <p>{mediaDetails.last_episode_to_air?.overview}</p>
            <p>
              <i>{mediaDetails.last_episode_to_air?.air_date}</i>
            </p>
            <div className="d-flex align-item-center">
              <div
                className="star-rate-btn-wrapper"
                data-tip={
                  mediaDetails.last_episode_to_air?.vote_average + " Rating"
                }
              >
                <StarRatings
                  rating={mediaDetails.last_episode_to_air?.vote_average / 2}
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
      ) : (
        <></>
      )}
      {mediaDetails.production_companies &&
      mediaDetails.production_companies.length > 0 ? (
        <div className="media-detail-meta-item">
          <h3 className="title">Production Companies</h3>
          <ul className="list-unstyled">
            {mediaDetails.production_companies.map((data, index) => {
              return (
                <li title={data?.name} key={index}>
                  {data.logo_path ? (
                    <div className="d-flex mb-2">
                      <div className="page-banner-poster-img-wrapper">
                        <img
                          src={
                            ConfigurationStores.getBaseURL() +
                            ConfigurationStores.getLogoSizes()[1] +
                            data.logo_path
                          }
                          alt={data?.name}
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                  <p>{data?.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
}

MediaDetailsMeta.prototype = {
  mediaType: PropTypes.string.required,
  mediaId: PropTypes.string.required,
};

export default MediaDetailsMeta;
