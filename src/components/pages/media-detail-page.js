import React from "react";
import MediaDetailsPageBanner from "../common/media-detail-page-banner";
import MediaSocial from "../common/media-social";
import MediaWatchProviders from "../common/media-watch-providers";
import MediaDetailsMeta from "../common/media-detail-meta";

function MediaDetailPage(props) {
  const mediaType = props.match.params.type;
  const mediaId = props.match.params.mediaId;

  return (
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
            <MediaWatchProviders
              mediaType={mediaType}
              mediaId={mediaId}
            ></MediaWatchProviders>
          </div>
          <div className="col-12 col-sm-4 col-md-3 col-xl-2">
            <MediaSocial mediaType={mediaType} mediaId={mediaId}></MediaSocial>
            <MediaDetailsMeta
              mediaType={mediaType}
              mediaId={mediaId}
            ></MediaDetailsMeta>
          </div>
        </div>
      </div>
    </>
  );
}

export default MediaDetailPage;
