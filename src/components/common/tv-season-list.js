import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MediaDetailPageStore from "../../stores/mediaDetailPageStore";
import * as mediaDetailPageAction from "../../actions/mediaDetailPageAction";
import poster_path from "../../assets/poster-path-not-found.jpg";
import ConfigurationImage from "./configuration-image";
import apiConstants from "../../api/apiConstants";
import Moment from "react-moment";
import EpisodeAirCard from "./episode-air-card";

function TvSeasonList(props) {
  const mediaType = props.mediaType;
  const mediaId = parseInt(props.mediaId);
  const lastSeasonId = parseInt(props.lastSeasonId);
  const season_number = parseInt(props.season_number);

  const [tvSeasonList, setTvSeasonList] = useState(
    MediaDetailPageStore.getTvSeasonEpisodeList()
  );

  const [mediaDetails, setMediaDetails] = useState(
    MediaDetailPageStore.getMediaDetails()
  );

  const onMediaDetailsChange = () => {
    setMediaDetails(MediaDetailPageStore.getMediaDetails());
  };

  const onTvSeasonListChange = () => {
    setTvSeasonList(MediaDetailPageStore.getTvSeasonEpisodeList());
  };

  useEffect(() => {
    MediaDetailPageStore.addChangeListener(onMediaDetailsChange);
    MediaDetailPageStore.addChangeListener(onTvSeasonListChange);
    if (
      lastSeasonId !== MediaDetailPageStore.getTvSeasonEpisodeList().id &&
      season_number !==
        MediaDetailPageStore.getTvSeasonEpisodeList().season_number
    )
      mediaDetailPageAction.loadTVSeasonEpisodeList(
        MediaDetailPageStore.getMediaDetails().id,
        MediaDetailPageStore.getMediaDetails().seasons.at(-1).season_number
      );
    return () => {
      MediaDetailPageStore.removeChangeListner(onMediaDetailsChange);
      MediaDetailPageStore.removeChangeListner(onTvSeasonListChange);
    };
  }, [mediaType, mediaId, lastSeasonId, season_number]);

  return mediaDetails &&
    tvSeasonList &&
    Object.keys(tvSeasonList).length > 0 ? (
    <div className="tv-season-list-wrapper">
      <div className="tv-season-name-wrapper">
        <div className="row align-items-end">
          <div className="col-12 tv-season-img-wrapper">
            <div className="page-banner-poster-img-wrapper">
              {tvSeasonList.poster_path ? (
                <ConfigurationImage
                  path={tvSeasonList.poster_path}
                  alt={tvSeasonList.name}
                  img_type={apiConstants.IMAGE_TYPE_POSTER}
                  img_size_index={1}
                />
              ) : (
                <img src={poster_path} alt={tvSeasonList.name} />
              )}
            </div>
          </div>
          <div className="col-12 tv-season-info-wrapper">
            <h2 className="title">
              <strong>
                {tvSeasonList.name}
                <small className="ms-2">
                  <em>
                    {<Moment format="YYYY">{tvSeasonList.air_date}</Moment>}
                  </em>
                  <span> | </span>
                  <em>{tvSeasonList.episodes.length} Episodes</em>
                </small>
              </strong>
            </h2>
            <p>{tvSeasonList.overview}</p>
          </div>
        </div>
      </div>
      <div className="tv-season-list-wrapper">
        <div className="tv-season-list-wrapper">
          <div className="row">
            {tvSeasonList.episodes.map((cardData, index) => {
              return (
                <div className="col-xl-3 col-lg-4 col-sm-6 mb-4" key={index}>
                  <EpisodeAirCard
                    still_path={cardData?.still_path}
                    name={cardData?.name}
                    overview={cardData?.overview}
                    air_date={cardData?.air_date}
                    vote_average={cardData?.vote_average}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

TvSeasonList.prototype = {
  mediaId: PropTypes.string.required,
  mediaType: PropTypes.string.required,
  lastSeasonId: PropTypes.string.required,
  season_number: PropTypes.string.required,
};

export default TvSeasonList;
