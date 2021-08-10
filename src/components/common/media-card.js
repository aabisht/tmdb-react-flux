import React from "react";
import ConfigurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";

function MediaCard() {
  const toggleMediaCardPopup = () => {
    ConfigurationStores.getMediaCardPopupData().show
      ? configurationAction.mediaCardPopupToggle(false, {})
      : configurationAction.mediaCardPopupToggle(
          true,
          mediaCardPopUpData(
            "/dq18nCTTLpy9PmtzZI6Y2yAgdw5.jpg",
            "Loki",
            "After stealing the Tesseract during the events of “Avengers: Endgame,” an alternate version of Loki is brought to the mysterious Time Variance Authority, a bureaucratic organization that exists outside of time and space and monitors the timeline. They give Loki a choice: face being erased from existence due to being a “time variant” or help fix the timeline and stop a greater threat.",
            "TV",
            "8.1",
            [28, 12, 53, 878]
          )
        );
  };

  const mediaCardPopUpData = (
    mediaCardPopupBanner,
    mediaCardPopupTitle,
    mediaCardPopupDescription,
    mediaCardPopupType,
    mediaCardVoteAvg,
    mediaCardPopupGenres
  ) => {
    return {
      banner: mediaCardPopupBanner,
      title: mediaCardPopupTitle,
      description: mediaCardPopupDescription,
      type: mediaCardPopupType,
      voteAvg: mediaCardVoteAvg,
      genres: mediaCardPopupGenres,
    };
  };

  return (
    <div className="media-card-wrapper" onClick={toggleMediaCardPopup}>
      <div className="media-card-container">
        <div className="media-card">
          <div className="media-img-wrapper">
            <img
              src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg"
              alt="Loki"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MediaCard;
