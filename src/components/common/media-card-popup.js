import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ConfigurationStores from "../../stores/configurationStores";
import apiConstants from "../../api/apiConstants";
import * as configurationAction from "../../actions/configurationAction";

function MediaCardPopup() {
  const [mediaCard, setMediaCard] = useState(
    ConfigurationStores.getMediaCardPopupData()
  );

  const genres = ConfigurationStores.getGenres();
  let genresWithName;

  useEffect(() => {
    ConfigurationStores.addChangeListener(onMediaCard);
    return () => ConfigurationStores.removeChangeListner(onMediaCard);
  }, [mediaCard]);

  const onMediaCard = () => {
    setMediaCard(ConfigurationStores.getMediaCardPopupData());
  };

  const getGenresWithId = (genresWithType) => {
    genresWithName = genresWithType.filter((_genres1) =>
      mediaCard.mediaCardData.genres.some(
        (_genres2) => _genres1.id === _genres2
      )
    );
  };

  const handleMediaCardPopupMouseLeave = () => {
    configurationAction.mediaCardPopupToggle(false, {});
    setMediaCardHoverWrapper("media-hover-wrapper");
  };

  if (genres && genres.length > 0 && mediaCard.mediaCardData.length > 0) {
    if (mediaCard.mediaCardData.type === apiConstants.MEDIA_TV) {
      getGenresWithId(genres[1].data.genres);
    } else {
      getGenresWithId(genres[0].data.genres);
    }
  }

  const [mediaCardHoverWrapper, setMediaCardHoverWrapper] = useState(
    "media-hover-wrapper"
  );

  if (mediaCard.show) {
    setTimeout(() => {
      setMediaCardHoverWrapper("media-hover-wrapper show");
    }, 1000);
  }

  return mediaCard.show ? (
    <div
      className="media-card-popup-wrapper"
      onMouseLeave={handleMediaCardPopupMouseLeave}
    >
      <div className="media-card-popup-container">
        <div className="media-popup-card">
          <div
            className={mediaCardHoverWrapper}
            style={mediaCard.mediaCardData.style}
          >
            <div className="media-media-wrapper">
              <div className="media-hover-img-wrapper">
                <img
                  src={
                    ConfigurationStores.getBaseURL() +
                    ConfigurationStores.getBackdropSizes()[1] +
                    mediaCard.mediaCardData.banner
                  }
                  alt={mediaCard.mediaCardData.title}
                />
              </div>
              <div className="media-hover-video-wrapper"></div>
              <div className="d-flex align-items-baseline justify-content-between media-meta">
                <div className="d-flex align-items-center media-type">
                  {mediaCard.mediaCardData.type === apiConstants.MEDIA_TV ? (
                    <span className="material-icons-outlined">tv</span>
                  ) : (
                    <span className="material-icons-outlined">movie</span>
                  )}
                  <small className="ms-2 meta-name text-uppercase">
                    {mediaCard.mediaCardData.type}
                  </small>
                </div>
                <div className="d-flex align-items-center star-rating">
                  <span className="material-icons-outlined">star_rate</span>
                  <small className="ms-2 meta-name text-uppercase">
                    {mediaCard.mediaCardData.voteAvg}
                  </small>
                </div>
              </div>
            </div>
            <div className="media-content-wrapper">
              <div className="media-title h3">
                {mediaCard.mediaCardData.title}
              </div>
              <div className="media-description mb-3">
                {mediaCard.mediaCardData.description}
              </div>
              <div className="media-actions d-flex align-content-center">
                <div>
                  <button
                    type="button"
                    className="btn link-text p-0"
                    title="Add to Watchlist"
                  >
                    <span className="material-icons-outlined">
                      control_point
                    </span>
                  </button>
                </div>
                <div className="ms-3">
                  <button
                    type="button"
                    className="btn link-text p-0"
                    title="Rate"
                  >
                    <span className="material-icons-outlined">star_rate</span>
                  </button>
                </div>
              </div>
              {mediaCard.mediaCardData.length > 0 &&
              mediaCard.mediaCardData.genres.length > 0 ? (
                <div className="media-genres">
                  <ul className="list-inline list-unstyled mt-3 mb-0">
                    {genresWithName.map((_genres) => {
                      return (
                        <li
                          className="media-genre-item list-inline-item"
                          key={_genres.id}
                        >
                          <NavLink to={"/tv-shows"}>{_genres.name}</NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default MediaCardPopup;
