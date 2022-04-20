import React from "react";
import PropTypes from "prop-types";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import ReviewCard from "./review-card";

function MediaDetailReviews(props) {
  const mediaId = parseInt(props.mediaId);

  const mediaReviews = MediaDetailPageStore.getMediaReviews();

  return mediaId === mediaReviews.id ? (
    <div className="media-reviews-wrapper media-detail-meta-item mb-4 mt-0">
      <h2 className="h3 title">Reviews</h2>
      {mediaReviews.results.map((item, index) => {
        return (
          <div className="mt-3" key={index}>
            <ReviewCard
              author={item.author}
              author_details={item.author_details}
              content={item.content}
              created_at={item.created_at}
              id={item.id}
              updated_at={item.updated_at}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <></>
  );
}

MediaDetailReviews.prototype = {
  mediaId: PropTypes.string.required,
};

export default MediaDetailReviews;
