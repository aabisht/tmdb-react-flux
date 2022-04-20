import React, { useState } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";

function VideoBanner(props) {
  const mediaId = parseInt(props.mediaId);
  const mediaVideo = MediaDetailPageStore.getMediaVideos();
  const [videoBannerClass, setVideoBannerClass] = useState(
    "page-banner-video-bg"
  );

  const opts = {
    height: "630",
    width: "1120",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 0,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 1,
      disablekb: 1,
    },
  };

  const onVideoReady = (event) => {
    event.target.playVideo();
    setVideoBannerClass("page-banner-video-bg hide-image");
  };

  const onVideoEnd = (event) => {
    event.target.playVideo();
    setVideoBannerClass("page-banner-video-bg");
  };

  return mediaId === mediaVideo.id && mediaVideo.results?.length > 0 ? (
    <div className={videoBannerClass}>
      <div className="page-banner-video-foreground">
        <YouTube
          videoId={mediaVideo.results[0].key}
          opts={opts}
          onReady={onVideoReady}
          onEnd={onVideoEnd}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}

VideoBanner.prototype = {
  mediaId: PropTypes.string.required,
};

export default VideoBanner;
