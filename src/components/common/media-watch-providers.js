import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import ReactTooltip from "react-tooltip";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";

function MediaWatchProviders(props) {
  const mediaType = props.mediaType,
    mediaId = props.mediaId,
    [mediaWatchProviders, setMediaWatchProviders] = useState([]);

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaWatchProvidersChange);
    mediaDetailPageAction.loadMediaWatchProvider(mediaType, mediaId);
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaWatchProvidersChange);
    };
  }, [mediaType, mediaId]);

  const onMediaWatchProvidersChange = () => {
    setMediaWatchProviders(MediaDetailPageStore.getMediaWatchProviders());
  };

  // console.log(mediaWatchProviders.results);

  return <></>;
}

MediaWatchProviders.prototype = {
  mediaType: PropTypes.string.required,
  mediaId: PropTypes.string.required,
};

export default MediaWatchProviders;
