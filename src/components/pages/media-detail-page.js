import React from "react";
import MediaDetailsPageBanner from "../common/media-detail-page-banner";

function MediaDetailPage(props) {
  const mediaType = props.match.params.type;
  const mediaId = props.match.params.mediaId;

  return (
    <MediaDetailsPageBanner
      mediaType={mediaType}
      mediaId={mediaId}
    ></MediaDetailsPageBanner>
  );
}

export default MediaDetailPage;
