import React, { useState } from "react";
import PropTypes from "prop-types";
import ConfigurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";
import apiConstants from "../../api/apiConstants";
import poster_path from "../../assets/poster-path-not-found.jpg";
import ConfigurationImage from "./configuration-image";

function MediaCard(props) {
  const [cardRef, setCardRef] = useState();

  let cardName;
  if (
    props.mediaCardData?.media_type === apiConstants.MEDIA_TV ||
    props.mediaCardDataType === apiConstants.MEDIA_TV
  ) {
    cardName = props.mediaCardData?.name;
  } else {
    cardName = props.mediaCardData?.title;
  }

  const handleMediaCardPopupMouseEnter = () => {
    let cardRefRect = cardRef.getBoundingClientRect();
    const addedGutterSpace = 30;

    let data = {
      banner: props.mediaCardData?.backdrop_path,
      title: cardName,
      description: props.mediaCardData?.overview,
      type: props.mediaCardData?.media_type || props.mediaCardDataType,
      voteAvg: props.mediaCardData?.vote_average,
      genres: props.mediaCardData?.genre_ids,
      id: props.mediaCardData?.id,
      style: {
        width: cardRefRect.width + addedGutterSpace * 2,
        minHeight: cardRefRect.height + addedGutterSpace * 2,
        top:
          cardRefRect.top -
          document.body.getBoundingClientRect().top -
          addedGutterSpace,
      },
    };

    if (
      document.body.getBoundingClientRect().right - cardRefRect.right <
      addedGutterSpace * 2
    ) {
      data.style.right = -cardRefRect.right;
    } else {
      data.style.left =
        cardRefRect.left < addedGutterSpace * 2
          ? cardRefRect.left
          : cardRefRect.left - addedGutterSpace;
    }

    configurationAction.mediaCardPopupToggle(true, data);
  };

  return (
    <div className="media-card-wrapper h-100">
      <div className="media-card-container h-100">
        <div
          className="media-card h-100"
          onMouseOver={handleMediaCardPopupMouseEnter}
          ref={(mc) => setCardRef(mc)}
        >
          <div className="media-img-wrapper h-100">
            {ConfigurationStores.getBaseURL() &&
            props.mediaCardData.poster_path ? (
              <ConfigurationImage
                path={props.mediaCardData.poster_path}
                alt={cardName}
                img_type={apiConstants.IMAGE_TYPE_POSTER}
                img_size_index={3}
                className="h-100"
              />
            ) : (
              <img src={poster_path} alt={cardName} className="h-100" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

MediaCard.prototype = {
  mediaCardData: PropTypes.object.required,
  mediaCardDataType: PropTypes.string,
};

export default MediaCard;
