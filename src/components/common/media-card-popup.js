import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ConfigurationStores from "../../stores/configurationStores";

function MediaCardPopup() {
  const [mediaCard, setMediaCard] = useState(
    ConfigurationStores.getMediaCardPopupData()
  );

  useEffect(() => {
    ConfigurationStores.addChangeListener(onMediaCard);
    return () => ConfigurationStores.removeChangeListner(onMediaCard);
  }, [mediaCard]);

  const onMediaCard = () => {
    setMediaCard(ConfigurationStores.getMediaCardPopupData());
  };

  return mediaCard.show ? (
    <div className="media-card-popup-wrapper">
      <div className="media-card-popup-container">
        <div className="media-popup-card">
          <div className="media-hover-wrapper">
            <div className="media-media-wrapper">
              <div className="media-hover-img-wrapper">
                <img
                  src="https://www.themoviedb.org/t/p/w533_and_h300_bestv2/ykElAtsOBoArgI1A8ATVH0MNve0.jpg"
                  alt={mediaCard.mediaCardData.title}
                />
              </div>
              <div className="media-hover-video-wrapper"></div>
            </div>
            <div className="media-content-wrapper">
              <div className="media-title h3">
                {mediaCard.mediaCardData.title}
              </div>
              <div className="media-description">
                <p>{mediaCard.mediaCardData.description}</p>
              </div>
              <div className="media-actions">
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
                <div>
                  <button
                    type="button"
                    className="btn link-text p-0"
                    title="Rate"
                  >
                    <span className="material-icons-outlined">star_rate</span>
                  </button>
                </div>
              </div>
              <div className="media-meta">
                <span className="media-type">
                  {mediaCard.mediaCardData.type}
                </span>
                <span className="media-run-time">
                  {mediaCard.mediaCardData.voteAvg}
                </span>
              </div>
              <div className="media-genres">
                <ul className="list-unstyled">
                  <li>
                    <NavLink to={"/tv-shows"}>Drama</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/tv-shows"}>Sci-Fi & Fantasy</NavLink>
                  </li>
                </ul>
              </div>
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
