import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ConfigurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";
import apiConstants from "../../api/apiConstants";

function MediaCard(props) {
  const [apiConfigurations, setApiConfigurations] = useState(
    ConfigurationStores.getAPIConfiguration()
  );

  const [cardRef, setCardRef] = useState();

  useEffect(() => {
    ConfigurationStores.addChangeListener(onApiConfigurationsChange);
    if (apiConfigurations.length === 0) {
      if (!ConfigurationStores.getFullPageLoaderValue())
        configurationAction.fullPageLoaderFlag(true);
      configurationAction.loadAPIConfiguration().then(() => {
        if (ConfigurationStores.getFullPageLoaderValue())
          configurationAction.fullPageLoaderFlag(false);
      });
    }
    return () =>
      ConfigurationStores.removeChangeListner(onApiConfigurationsChange);
  }, [apiConfigurations.length]);

  const onApiConfigurationsChange = () => {
    setApiConfigurations(ConfigurationStores.getAPIConfiguration());
  };

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

  return ConfigurationStores.getBaseURL() && props.mediaCardData.poster_path ? (
    <div className="media-card-wrapper">
      <div className="media-card-container">
        <div
          className="media-card"
          onMouseOver={handleMediaCardPopupMouseEnter}
          ref={(mc) => setCardRef(mc)}
        >
          <div className="media-img-wrapper">
            <img
              src={
                ConfigurationStores.getBaseURL() +
                ConfigurationStores.getPosterSizes()[3] +
                props.mediaCardData.poster_path
              }
              alt={cardName}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

MediaCard.prototype = {
  mediaCardData: PropTypes.object.required,
  mediaCardDataType: PropTypes.string,
};

export default MediaCard;
