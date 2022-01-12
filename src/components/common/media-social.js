import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";

function MediaSocial(props) {
  const [mediaExternalIDs, setMediaExternalIDs] = useState([]),
    [mediaDetails, setMediaDetails] = useState([]),
    mediaType = props.mediaType,
    mediaId = props.mediaId;

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaExternalIDsChange);
    MediaDetailPageStore.addChangeListener(onMediaDetailsChange);
    mediaDetailPageAction.loadMediaExternalIds(mediaType, mediaId);
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaDetailsChange);
      MediaDetailPageStore.removeChangeListner(onMediaExternalIDsChange);
    };
  }, [mediaType, mediaId]);

  const onMediaExternalIDsChange = () => {
    setMediaExternalIDs(MediaDetailPageStore.getMediaExternalIDs());
  };

  const onMediaDetailsChange = () => {
    setMediaDetails(MediaDetailPageStore.getMediaDetails());
  };

  ReactTooltip.rebuild();

  return (
    <>
      {(mediaExternalIDs && Object.keys(mediaExternalIDs).length > 0) ||
      (mediaDetails && Object.keys(mediaDetails).length > 0) ? (
        <>
          <div className="external-ids-wrapper">
            <ul className="social-list list-unstyled d-flex align-content-center justify-content-between">
              {mediaExternalIDs.facebook_id ? (
                <li>
                  <a
                    href={
                      "https://www.facebook.com/" + mediaExternalIDs.facebook_id
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="social-link facebook d-flex align-content-center justify-content-center"
                    data-tip="Visit Facebook"
                  >
                    <span className="social-icon icon-facebook"></span>
                  </a>
                </li>
              ) : (
                <></>
              )}
              {mediaExternalIDs.twitter_id ? (
                <li>
                  <a
                    href={"https://twitter.com/" + mediaExternalIDs.twitter_id}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link twitter d-flex align-content-center justify-content-center"
                    data-tip="Visit Twitter"
                  >
                    <span className="social-icon icon-twitter"></span>
                  </a>
                </li>
              ) : (
                <></>
              )}
              {mediaExternalIDs.instagram_id ? (
                <li>
                  <a
                    href={
                      "https://www.instagram.com/" +
                      mediaExternalIDs.instagram_id
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="social-link instagram d-flex align-content-center justify-content-center"
                    data-tip="Visit Instagram"
                  >
                    <span className="social-icon icon-instagram"></span>
                  </a>
                </li>
              ) : (
                <></>
              )}
              {mediaExternalIDs.imdb_id ? (
                <li>
                  <a
                    href={
                      "https://www.imdb.com/title/" + mediaExternalIDs.imdb_id
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="social-link imdb d-flex align-content-center justify-content-center"
                    data-tip="Visit IMDB"
                  >
                    <span className="social-icon icon-imdb"></span>
                  </a>
                </li>
              ) : (
                <></>
              )}
              {mediaDetails.homepage ? (
                <li>
                  <a
                    href={mediaDetails.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link homepage d-flex align-content-center justify-content-center"
                    data-tip="Visit Homepage"
                  >
                    <span className="social-icon material-icons-outlined">
                      link
                    </span>
                  </a>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

MediaSocial.prototype = {
  mediaType: PropTypes.string.required,
  mediaId: PropTypes.string.required,
};

export default MediaSocial;
