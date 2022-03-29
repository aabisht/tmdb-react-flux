import React, { useState } from "react";
import PropTypes from "prop-types";
import ConfigurationImage from "./configuration-image";
import apiConstants from "../../api/apiConstants";
import no_cast_not_specified from "../../assets/no-cast-not-specified.jpg";
import StarRatings from "react-star-ratings";
import moment from "moment";
import ReactTooltip from "react-tooltip";

function ReviewCard(props) {
  const maxReviewToShow = 350;
  const [readMoreBtnClass, setReadMoreBtnClass] = useState("btn btn-link");
  const [reviewContent, setReviewContent] = useState(
    props.content.substring(0, maxReviewToShow)
  );

  ReactTooltip.rebuild();

  const duration = moment.duration(
    moment(new Date()).diff(moment(props.updated_at))
  );
  let remaining_days = "";
  if (duration.asYears() >= 1) {
    remaining_days = parseInt(duration.asYears()) + "years ago";
  } else if (duration.asMonths() >= 1) {
    remaining_days = parseInt(duration.asMonths()) + "months ago";
  } else if (duration.asDays() >= 1) {
    remaining_days = parseInt(duration.asDays()) + "days ago";
  } else if (duration.asHours() >= 1) {
    remaining_days = parseInt(duration.asHours()) + "hours ago";
  } else if (duration.asMinutes() >= 1) {
    remaining_days = parseInt(duration.asMinutes()) + "minutes ago";
  }

  const handleReadMore = () => {
    setReviewContent(props.content);
    setReadMoreBtnClass("btn btn-link d-none");
  };

  return (
    <div className="review-wrapper">
      <div className="d-flex align-items-center mb-3">
        <div className="profile-image-wrapper me-3">
          {props.author_details.avatar_path ? (
            props.author_details.avatar_path.indexOf("http") >= 0 ? (
              <img
                src={
                  props.author_details.avatar_path.slice(0, 0) +
                  props.author_details.avatar_path.slice(1)
                }
                alt={props.author}
              />
            ) : (
              <ConfigurationImage
                path={props.author_details.avatar_path}
                alt={props.author}
                img_type={apiConstants.IMAGE_TYPE_PROFILE}
                img_size_index={1}
              />
            )
          ) : (
            <img src={no_cast_not_specified} alt={props.author} />
          )}
        </div>
        <div className="profile-title-wrapper">
          <h2 className="h5 text-capitalize">
            {props.author}{" "}
            <small>
              <i>({remaining_days})</i>
            </small>
          </h2>
          {props.author_details.rating ? (
            <div className="star-rate-btn-wrapper">
              <div
                className="d-inline-block"
                data-tip={props.author_details.rating / 2 + " Rating"}
              >
                <StarRatings
                  rating={props.author_details.rating / 2}
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
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="review-content-wrapper">
        <p className="mb-0">
          {reviewContent}
          {props.content.length > maxReviewToShow ? (
            <button
              type="button"
              className={readMoreBtnClass}
              onClick={handleReadMore}
            >
              Read More
            </button>
          ) : (
            <></>
          )}
        </p>
      </div>
    </div>
  );
}

ReviewCard.prototype = {
  author: PropTypes.string,
  author_details: PropTypes.object,
  content: PropTypes.string,
  created_at: PropTypes.string,
  id: PropTypes.string,
  updated_at: PropTypes.string,
};

export default ReviewCard;
