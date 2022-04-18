import React from "react";
import PropTypes from "prop-types";
import ConfigurationImage from "./configuration-image";
import StarRatings from "react-star-ratings";
import apiConstants from "../../api/apiConstants";
import ReactTooltip from "react-tooltip";
import banner_path from "../../assets/banner-path-not-found.jpg";

function EpisodeAirCard(props) {
  ReactTooltip.rebuild();
  return (
    <div className="episode-air-card-wrapper h-100 d-flex flex-column justify-content-between">
      <div className="episode-air-card-header">
        <div className="img-wrapper">
          {props.still_path ? (
            <ConfigurationImage
              path={props.still_path}
              alt={props.name}
              img_type={apiConstants.IMAGE_TYPE_POSTER}
              img_size_index={3}
            />
          ) : (
            <img src={banner_path} alt={props.name} />
          )}
        </div>
        <h2 className="h4 mt-2">
          <strong>{props.name}</strong>
        </h2>
        <p className="description">{props.overview}</p>
      </div>
      <div className="episode-air-card-footer">
        <p>
          <i>{props.air_date}</i>
        </p>
        <div className="d-flex align-item-center">
          <div
            className="star-rate-btn-wrapper"
            data-tip={props.vote_average + " Rating"}
          >
            <StarRatings
              rating={props.vote_average / 2}
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
  );
}

EpisodeAirCard.prototype = {
  still_path: PropTypes.string,
  name: PropTypes.string,
  overview: PropTypes.string,
  air_date: PropTypes.string,
  vote_average: PropTypes.number,
};

export default EpisodeAirCard;
