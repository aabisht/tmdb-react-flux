import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ConfigurationStores from "../../stores/configurationStores";
import AuthenticationStores from "../../stores/authenticationStores";
import AccountStores from "../../stores/accountStores";
import apiConstants from "../../api/apiConstants";
import * as configurationAction from "../../actions/configurationAction";
import * as accountAction from "../../actions/accountAction";
import * as movieApi from "../../api/movies";
import * as tvApi from "../../api/tv";
import { toast } from "react-toastify";
import StarRatings from "react-star-ratings";
import banner_path from "../../assets/banner-path-not-found.jpg";

const MediaCardPopup = () => {
  const [genres, setGenres] = useState(ConfigurationStores.getGenres());
  const [mediaCard, setMediaCard] = useState(
    ConfigurationStores.getMediaCardPopupData()
  );
  const [mediaCardRating, setMediaCardRating] = useState(
    ConfigurationStores.getMediaCardPopupData().mediaCardData.voteAvg
  );
  const [genresWithName, setGenresWithName] = useState([]);
  const [mediaCardHoverWrapper, setMediaCardHoverWrapper] = useState(
    "media-hover-wrapper"
  );

  const onMediaCard = () => {
    setMediaCard(ConfigurationStores.getMediaCardPopupData());
    setMediaCardRating(
      ConfigurationStores.getMediaCardPopupData().mediaCardData.voteAvg
    );
  };

  const onGenresChange = () => {
    setGenres(ConfigurationStores.getGenres());
  };

  const handleMediaCardPopupMouseLeave = () => {
    setMediaCardHoverWrapper("media-hover-wrapper");
    configurationAction.mediaCardPopupToggle(false, {});
  };

  const toggleToWatchlist = () => {
    const mediaData = {
      media_type: mediaCard.mediaCardData.type,
      media_id: mediaCard.mediaCardData.id,
      watchlist: true,
    };
    accountAction
      .addToWatchlist(
        AccountStores.getAccountInfo().id,
        AuthenticationStores.getSessionData().session_id,
        mediaData
      )
      .then((res) => {
        if (res.success) {
          toast(<AddToWatchListToast />, {
            position: "bottom-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            type: "success",
          });
        }
      });
  };

  const AddToWatchListToast = () => {
    return (
      <div className="d-flex align-items-start">
        <span className="material-icons">thumb_up</span>
        <span className="ms-2">
          <strong>{mediaCard.mediaCardData.title}</strong> added to watchlist.
        </span>
      </div>
    );
  };

  const handleRating = (newRating) => {
    if (mediaCard.mediaCardData.type === apiConstants.MEDIA_TV) {
      tvApi
        .rateTVShow(
          mediaCard.mediaCardData.id,
          AuthenticationStores.getSessionData().session_id,
          newRating * 2
        )
        .then((res) => {
          // setMediaCardRating(newRating * 2);
          successRatingToast(res);
        });
    } else {
      movieApi
        .rateMovie(
          mediaCard.mediaCardData.id,
          AuthenticationStores.getSessionData().session_id,
          newRating * 2
        )
        .then((res) => {
          // setMediaCardRating(newRating * 2);
          successRatingToast(res);
        });
    }
  };

  const successRatingToast = (res) => {
    if (res.success) {
      toast(<RatingToast />, {
        position: "bottom-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        type: "success",
      });
    }
  };

  const RatingToast = () => {
    return (
      <div className="d-flex align-items-start">
        <span className="material-icons">thumb_up</span>
        <span className="ms-2">
          You rated the <strong>{mediaCard.mediaCardData.title}</strong>.
        </span>
      </div>
    );
  };

  useEffect(() => {
    ConfigurationStores.addChangeListener(onMediaCard);
    ConfigurationStores.addChangeListener(onGenresChange);
    if (genres && genres.length > 0 && mediaCard.mediaCardData.genres) {
      const genresWithTypeData =
        mediaCard.mediaCardData.type === apiConstants.MEDIA_TV
          ? genres[1].data.genres
          : genres[0].data.genres;

      setGenresWithName(
        genresWithTypeData.filter((_genres1) =>
          mediaCard.mediaCardData.genres.some(
            (_genres2) => _genres1.id === _genres2
          )
        )
      );
    }

    if (mediaCard.show) {
      setTimeout(() => {
        setMediaCardHoverWrapper("media-hover-wrapper active");
      }, 300);
    }

    return () => {
      ConfigurationStores.removeChangeListner(onMediaCard);
      ConfigurationStores.removeChangeListner(onGenresChange);
    };
  }, [mediaCard, genres]);

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
                {mediaCard.mediaCardData.banner ? (
                  <img
                    src={
                      ConfigurationStores.getBaseURL() +
                      ConfigurationStores.getBackdropSizes()[1] +
                      mediaCard.mediaCardData.banner
                    }
                    alt={mediaCard.mediaCardData.title}
                  />
                ) : (
                  <img src={banner_path} alt={mediaCard.mediaCardData.title} />
                )}
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
            <div className="d-flex flex-column justify-content-between media-content-wrapper">
              <div className="media-content-name-desc-wrapper">
                <div className="media-title h3">
                  {mediaCard.mediaCardData.title}
                </div>
                <div className="media-description mb-3">
                  {mediaCard.mediaCardData.description}
                </div>
              </div>
              <div className="media-content-meta-wrapper">
                {AuthenticationStores.getIsUserLoggedIn() ? (
                  <div className="media-actions d-flex align-content-center">
                    <div className="add-to-watchlist-btn-wrapper">
                      <button
                        type="button"
                        className="btn link-text p-0"
                        title="Add to Watchlist"
                        onClick={toggleToWatchlist}
                      >
                        <span className="material-icons-outlined">
                          control_point
                        </span>
                      </button>
                    </div>
                    <div className="ms-3 star-rate-btn-wrapper">
                      <StarRatings
                        rating={mediaCardRating / 2}
                        changeRating={handleRating}
                        numberOfStars={5}
                        svgIconPath={
                          "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        }
                        svgIconViewBox={"0 0 24 24"}
                        starHoverColor={"#1ed5a9"}
                        starRatedColor={"#1ed5a9"}
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {genresWithName.length > 0 ? (
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
    </div>
  ) : (
    <></>
  );
};

export default MediaCardPopup;
