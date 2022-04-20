import React from "react";
import PropTypes from "prop-types";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import banner_path from "../../assets/banner-path-not-found.jpg";
import ConfigurationImage from "./configuration-image";
import poster_path from "../../assets/poster-path-not-found.jpg";
import apiConstants from "../../api/apiConstants";

function MediaDetailsCollection(props) {
  const mediaDetails = MediaDetailPageStore.getMediaDetails();
  const mediaId = parseInt(props.mediaId);

  return mediaDetails &&
    mediaDetails?.id === mediaId &&
    mediaDetails.belongs_to_collection ? (
    <div className="media-detail-collection-wrapper mb-4">
      <div className="media-detail-collection-banner-img-wrapper">
        {mediaDetails.belongs_to_collection.backdrop_path ? (
          <ConfigurationImage
            path={mediaDetails.belongs_to_collection.backdrop_path}
            alt={mediaDetails.belongs_to_collection.name}
            img_type={apiConstants.IMAGE_TYPE_BACKDROP}
            img_size_index={2}
            className="media-detail-collection-banner-img"
          />
        ) : (
          <img
            src={banner_path}
            alt={mediaDetails.belongs_to_collection.name}
            className="banner-not-found media-detail-collection-banner-img"
          />
        )}
        <div className="media-detail-collection-banner-overlay-bg"></div>
      </div>
      <div className="media-detail-collection-info-wrapper">
        <div className="row align-items-end">
          <div className="col-12 media-detail-collection-poster-wrapper">
            <div className="page-banner-poster-img-wrapper">
              {mediaDetails.belongs_to_collection.poster_path ? (
                <ConfigurationImage
                  path={mediaDetails.belongs_to_collection.poster_path}
                  alt={mediaDetails.belongs_to_collection.name}
                  img_type={apiConstants.IMAGE_TYPE_POSTER}
                  img_size_index={1}
                  className="media-detail-collection-poster-img"
                />
              ) : (
                <img
                  src={poster_path}
                  alt={mediaDetails.belongs_to_collection.name}
                  className="poster-not-found media-detail-collection-poster-img"
                />
              )}
            </div>
          </div>
          <div className="col-12  media-detail-collection-info-container">
            <h2 className="title mb-3">
              <strong>{mediaDetails.belongs_to_collection.name}</strong>
            </h2>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

MediaDetailsCollection.prototype = {
  mediaId: PropTypes.string.required,
};

export default MediaDetailsCollection;
