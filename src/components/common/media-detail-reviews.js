import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import ReviewCard from "./review-card";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";
// import TabView from "./tab-view";
// import CreditsCard from "./credits-card";
// import apiConstants from "../../api/apiConstants";

function MediaDetailsReviews(props) {
  const mediaType = props.mediaType;
  const mediaId = parseInt(props.mediaId);

  const [mediaReviews, setMediaReviews] = useState(
    MediaDetailPageStore.getMediaReviews()
  );

  const onMediaReviewsChange = () => {
    setMediaReviews(MediaDetailPageStore.getMediaReviews());
  };

  console.log(mediaReviews.results);
  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaReviewsChange);
    if (
      MediaDetailPageStore.getMediaReviews() &&
      mediaId !== MediaDetailPageStore.getMediaReviews().id
    )
      mediaDetailPageAction.loadMediaReviews(mediaType, mediaId);
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaReviewsChange);
    };
  }, [mediaType, mediaId]);

  return mediaReviews.results && mediaReviews.results.length > 0 ? (
    <div className="media-reviews-wrapper media-detail-meta-item">
      <h2 className="h3 title">Reviews</h2>
      {mediaReviews.results.map((item, index) => {
        return (
          <div className="mt-3">
            <ReviewCard
              key={index}
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

MediaDetailsReviews.prototype = {
  mediaType: PropTypes.string.required,
  mediaId: PropTypes.string.required,
};

export default MediaDetailsReviews;
