import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import DropDown from "./dropdown";
import TvSeasonList from "../common/tv-season-list";

function TvSeason(props) {
  const mediaType = props.mediaType;
  const mediaId = parseInt(props.mediaId);

  const [mediaDetails, setMediaDetails] = useState(
    MediaDetailPageStore.getMediaDetails()
  );

  const [selectedSeason, setSelectedSeason] = useState(
    mediaDetails.seasons[mediaDetails.seasons.length - 1]
  );

  const onMediaDetailsChange = () => {
    setMediaDetails(MediaDetailPageStore.getMediaDetails());
  };

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaDetailsChange);
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaDetailsChange);
    };
  }, [mediaType, mediaId]);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    document.querySelector(".season-selector-text").classList.remove("show");
    document
      .querySelector(".season-dropdown-wrappper")
      .classList.remove("show");
  };

  return mediaDetails && mediaDetails.seasons.length > 0 ? (
    <div className="tv-seadon-wrapper">
      <div className="mb-3">
        <DropDown
          dropdownText={[
            <div
              className=" d-flex align-item-center justify-content-between"
              key="watchProviderSelector"
            >
              <span>{"Season " + selectedSeason.season_number}</span>
              <span className="material-icons-outlined">
                keyboard_arrow_down
              </span>
            </div>,
          ]}
          dropdownList={[
            <ul
              className="list-unstyled dropdown-list-wrappper season-dropdown-list-wrappper"
              key="watchProviderDropdown"
            >
              {mediaDetails.seasons.map((item, index) => {
                let activeClass = item.id === selectedSeason.id ? "active" : "";
                return (
                  <li key={index} className={activeClass}>
                    <button
                      type="button"
                      className="btn d-block text-nowrap w-100"
                      onClick={() => handleSeasonChange(item)}
                    >
                      {"Season " + item.season_number}
                    </button>
                  </li>
                );
              })}
            </ul>,
          ]}
          dropdownPosition="left"
          dropdownTextClass="secondary outline text-start season-selector-text"
          dropdownListClass="season-dropdown-wrappper"
        />
      </div>
      <TvSeasonList
        mediaId={mediaId}
        season_number={selectedSeason.season_number}
      />
    </div>
  ) : (
    <></>
  );
}

TvSeason.prototype = {
  mediaId: PropTypes.string.required,
  mediaType: PropTypes.string.required,
};

export default TvSeason;
