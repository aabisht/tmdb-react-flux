import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";

function VideoBanner(props) {
  const mediaType = props.mediaType;
  const mediaId = parseInt(props.mediaId);
  const [mediaVideo, setMediaVideo] = useState(
    MediaDetailPageStore.getMediaVideos()
  );
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

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaVideoChange);
    mediaDetailPageAction.loadMediaVideo(mediaType, mediaId);
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaVideoChange);
    };
  }, [mediaType, mediaId]);

  const onMediaVideoChange = () => {
    setMediaVideo(MediaDetailPageStore.getMediaVideos());
  };

  const onVideoReady = (event) => {
    event.target.playVideo();
    setVideoBannerClass("page-banner-video-bg hide-image");
  };

  const onVideoEnd = (event) => {
    event.target.playVideo();
    setVideoBannerClass("page-banner-video-bg");
  };

  return mediaVideo.length > 0 ? (
    <div className={videoBannerClass}>
      <div className="page-banner-video-foreground">
        <YouTube
          videoId={mediaVideo[0].key}
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
  mediaType: PropTypes.string.required,
  mediaId: PropTypes.string.required,
};

export default VideoBanner;
