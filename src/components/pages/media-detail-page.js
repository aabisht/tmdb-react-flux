import React, { useEffect, useState } from "react";
import MediaDetailPageBanner from "../common/media-detail-page-banner";
import MediaSocial from "../common/media-social";
import MediaWatchProviders from "../common/media-watch-providers";
import MediaDetailMeta from "../common/media-detail-meta";
import MediaDetailsCredits from "../common/media-detail-credits";
import MediaDetailReviews from "../common/media-detail-reviews";
import MediaDetailsCollection from "../common/media-details-collection";
import apiConstants from "../../api/apiConstants";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import TvSeason from "../common/tv-season";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";
import * as configurationAction from "../../actions/configurationAction";

function MediaDetailPage(props) {
  const mediaType = props.match.params.type;
  const mediaId = props.match.params.mediaId;

  const [mediaDetails, setMediaDetails] = useState(
    MediaDetailPageStore.getMediaDetails()
  );

  const [mediaCredits, setMediaCredits] = useState(
    MediaDetailPageStore.getMediaCredits()
  );

  const [mediaReviews, setMediaReviews] = useState(
    MediaDetailPageStore.getMediaReviews()
  );

  const [mediaExternalIDs, setMediaExternalIDs] = useState(
    MediaDetailPageStore.getMediaExternalIDs()
  );

  const onMediaDetailsChange = () => {
    setMediaDetails(MediaDetailPageStore.getMediaDetails());
  };

  const onMediaCreditsChange = () => {
    setMediaCredits(MediaDetailPageStore.getMediaCredits());
  };

  const onMediaReviewsChange = () => {
    setMediaReviews(MediaDetailPageStore.getMediaReviews());
  };

  const onMediaExternalIDsChange = () => {
    setMediaExternalIDs(MediaDetailPageStore.getMediaExternalIDs());
  };

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaDetailsChange);
    MediaDetailPageStore.addChangeListener(onMediaCreditsChange);
    MediaDetailPageStore.addChangeListener(onMediaReviewsChange);
    MediaDetailPageStore.addChangeListener(onMediaExternalIDsChange);
    if (
      MediaDetailPageStore.getMediaDetails() &&
      mediaId !== MediaDetailPageStore.getMediaDetails().id
    ) {
      configurationAction.fullPageLoaderFlag(true);
      mediaDetailPageAction.loadMediaData(mediaType, mediaId, () => {
        configurationAction.fullPageLoaderFlag(false);
      });
    }
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaDetailsChange);
      MediaDetailPageStore.removeChangeListner(onMediaCreditsChange);
      MediaDetailPageStore.removeChangeListner(onMediaReviewsChange);
      MediaDetailPageStore.removeChangeListner(onMediaExternalIDsChange);
    };
  }, [mediaType, mediaId]);

  return mediaDetails && Object.keys(mediaDetails).length > 0 ? (
    <>
      <div className="mb-4">
        <MediaDetailPageBanner
          mediaType={mediaType}
          mediaId={mediaId}
        ></MediaDetailPageBanner>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-9 col-xl-10">
            <MediaWatchProviders mediaType={mediaType} mediaId={mediaId} />
            {props.match.params.type === apiConstants.MEDIA_TV ? (
              mediaDetails.seasons && mediaDetails.seasons.length > 0 ? (
                <TvSeason mediaId={mediaId} />
              ) : (
                <></>
              )
            ) : (
              <MediaDetailsCollection mediaId={mediaId} />
            )}
            {mediaCredits &&
            (mediaCredits.cast?.length > 0 || mediaCredits.crew?.length > 0) ? (
              <MediaDetailsCredits mediaId={mediaId} />
            ) : (
              <></>
            )}
            {mediaReviews && mediaReviews.results?.length > 0 ? (
              <MediaDetailReviews mediaId={mediaId} />
            ) : (
              <></>
            )}
          </div>
          <div className="col-12 col-sm-4 col-md-3 col-xl-2">
            {(mediaExternalIDs && Object.keys(mediaExternalIDs).length > 0) ||
            (mediaDetails && mediaDetails?.homepage) ? (
              <MediaSocial mediaId={mediaId} />
            ) : (
              <></>
            )}
            <MediaDetailMeta mediaType={mediaType} mediaId={mediaId} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default MediaDetailPage;
