import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ConfigurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";
import apiConstants from "../../api/apiConstants";

function MediaCard(props) {
  const [apiConfigurations, setApiConfigurations] = useState(
    ConfigurationStores.getAPIConfiguration()
  );

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
  if (props.mediaCardData?.media_type === apiConstants.MEDIA_TV) {
    cardName = props.mediaCardData?.name;
  } else {
    cardName = props.mediaCardData?.title;
  }

  // const toggleMediaCardPopup = () => {
  //   ConfigurationStores.getMediaCardPopupData().show
  //     ? configurationAction.mediaCardPopupToggle(false, {})
  //     : configurationAction.mediaCardPopupToggle(
  //         true,
  //         mediaCardPopUpData(
  //           props.mediaCardData?.backdrop_path,
  //           cardName,
  //           props.mediaCardData?.overview,
  //           props.mediaCardData?.media_type,
  //           props.mediaCardData?.vote_average,
  //           props.mediaCardData?.genre_ids
  //         )
  //       );
  // };

  // const mediaCardPopUpData = (
  //   mediaCardPopupBanner,
  //   mediaCardPopupTitle,
  //   mediaCardPopupDescription,
  //   mediaCardPopupType,
  //   mediaCardVoteAvg,
  //   mediaCardPopupGenres
  // ) => {
  //   return {
  //     banner: mediaCardPopupBanner,
  //     title: mediaCardPopupTitle,
  //     description: mediaCardPopupDescription,
  //     type: mediaCardPopupType,
  //     voteAvg: mediaCardVoteAvg,
  //     genres: mediaCardPopupGenres,
  //   };
  // };

  return (
    <div className="media-card-wrapper">
      <div className="media-card-container">
        <div className="media-card">
          <div className="media-img-wrapper">
            <img
              src={
                ConfigurationStores.getBaseURL() +
                ConfigurationStores.getPosterSizes()[3] +
                props.mediaCardData?.poster_path
              }
              alt={cardName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

MediaCard.prototype = {
  mediaCardData: PropTypes.object.required,
};

export default MediaCard;
