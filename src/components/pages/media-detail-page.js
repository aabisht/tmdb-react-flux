import React, { useEffect, useState } from "react";
import MediaDetailsPageBanner from "../common/media-detail-page-banner";
import MediaSocial from "../common/media-social";
import MediaWatchProviders from "../common/media-watch-providers";
import MediaDetailsMeta from "../common/media-detail-meta";
import MediaDetailsCredits from "../common/media-detail-credits";
import MediaDetailsReviews from "../common/media-detail-reviews";
import MediaDetailsCollection from "../common/media-details-collection";
import apiConstants from "../../api/apiConstants";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";

function MediaDetailPage(props) {
  const mediaType = props.match.params.type;
  const mediaId = props.match.params.mediaId;

  const [mediaDetails, setMediaDetails] = useState(
    MediaDetailPageStore.getMediaDetails()
  );

  const onMediaDetailsChange = () => {
    setMediaDetails(MediaDetailPageStore.getMediaDetails());
  };

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaDetailsChange);
    if (
      MediaDetailPageStore.getMediaDetails() &&
      mediaId !== MediaDetailPageStore.getMediaDetails().id
    )
      mediaDetailPageAction.loadMediaData(mediaType, mediaId);
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaDetailsChange);
    };
  }, [mediaType, mediaId]);

  return mediaDetails && Object.keys(mediaDetails).length > 0 ? (
    <>
      <div className="mb-4">
        <MediaDetailsPageBanner
          mediaType={mediaType}
          mediaId={mediaId}
        ></MediaDetailsPageBanner>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-9 col-xl-10">
            <MediaWatchProviders mediaType={mediaType} mediaId={mediaId} />
            <MediaDetailsCredits mediaType={mediaType} mediaId={mediaId} />
            <MediaDetailsReviews mediaType={mediaType} mediaId={mediaId} />
            {props.match.params.type !== apiConstants.MEDIA_TV ? (
              <MediaDetailsCollection mediaType={mediaType} mediaId={mediaId} />
            ) : (
              <></>
            )}
          </div>
          <div className="col-12 col-sm-4 col-md-3 col-xl-2">
            <MediaSocial mediaType={mediaType} mediaId={mediaId} />
            <MediaDetailsMeta mediaType={mediaType} mediaId={mediaId} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default MediaDetailPage;
