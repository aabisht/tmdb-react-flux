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
  const mediaId = parseInt(props.match.params.mediaId);

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
    ) {
      configurationAction.fullPageLoaderFlag(true);
      mediaDetailPageAction.loadMediaData(mediaType, mediaId).then(() => {
        configurationAction.fullPageLoaderFlag(false);
      });
    }
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaDetailsChange);
    };
  }, [mediaType, mediaId]);

  return mediaDetails &&
    Object.keys(mediaDetails).length > 0 &&
    mediaDetails.id === mediaId ? (
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
            <MediaDetailsCredits mediaId={mediaId} />
            <MediaDetailReviews mediaId={mediaId} />
          </div>
          <div className="col-12 col-sm-4 col-md-3 col-xl-2">
            <MediaSocial mediaId={mediaId} />
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
