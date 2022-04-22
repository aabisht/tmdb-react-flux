import dispatcher from "../appDispatcher";
import apiConstants from "../api/apiConstants";
import * as moviesApi from "../api/movies";
import * as tvApi from "../api/tv";
import * as tvSeasonsApi from "../api/tvSeasons";
import MediaDetailPageActionTypes from "./actionTypes/mediaDetailPageActionTypes";

export const loadMediaData = (mediaType, mediaId) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getDetails(mediaId));
    pArray.push(tvApi.getCredits(mediaId));
    pArray.push(tvApi.getReviews(mediaId));
    pArray.push(tvApi.getExternalIDs(mediaId));
    pArray.push(tvApi.getVideos(mediaId));
  } else {
    pArray.push(moviesApi.getDetails(mediaId));
    pArray.push(moviesApi.getCredits(mediaId));
    pArray.push(moviesApi.getReviews(mediaId));
    pArray.push(moviesApi.getExternalIDs(mediaId));
    pArray.push(moviesApi.getVideos(mediaId));
  }

  return Promise.all(pArray).then((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DETAIL,
      mediaDetails: mediaData[0],
      mediaCredits: mediaData[1],
      mediaReviews: mediaData[2],
      mediaExternalIDs: mediaData[3],
      mediaVideo: mediaData[4],
    });
  });
};

export const loadMediaVideo = (mediaType, mediaId) => {
  const loadMediaVideoApi =
    mediaType === apiConstants.MEDIA_TV
      ? tvApi.getVideos(mediaId)
      : moviesApi.getVideos(mediaId);

  return loadMediaVideoApi.then((mediaVideo) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_VIDEO,
      mediaVideo,
    });
  });
};

export const loadMediaExternalIds = (mediaType, mediaId) => {
  const loadMediaExternalIdsApi =
    mediaType === apiConstants.MEDIA_TV
      ? tvApi.getExternalIDs(mediaId)
      : moviesApi.getExternalIDs(mediaId);
  return loadMediaExternalIdsApi.then((mediaExternalIDs) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_EXTERNAL_IDS,
      mediaExternalIDs,
    });
  });
};

export const loadMediaWatchProvider = (mediaType, mediaId) => {
  const loadMediaWatchProviderApi =
    mediaType === apiConstants.MEDIA_TV
      ? tvApi.getWatchProviders(mediaId)
      : moviesApi.getWatchProviders(mediaId);
  return loadMediaWatchProviderApi.then((mediaWatchProviders) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_WATCH_PROVIDER,
      mediaWatchProviders,
    });
  });
};

export const loadMediaCredits = (mediaType, mediaId) => {
  const loadMediaCreditsApi =
    mediaType === apiConstants.MEDIA_TV
      ? tvApi.getCredits(mediaId)
      : moviesApi.getCredits(mediaId);
  return loadMediaCreditsApi.then((mediaCredits) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_CREDITS,
      mediaCredits,
    });
  });
};

export const loadMediaReviews = (mediaType, mediaId) => {
  const loadMediaReviewsApi =
    mediaType === apiConstants.MEDIA_TV
      ? tvApi.getReviews(mediaId)
      : moviesApi.getReviews(mediaId);
  return loadMediaReviewsApi.then((mediaReviews) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_REVIEWS,
      mediaReviews,
    });
  });
};

export const loadTVSeasonEpisodeList = (tv_id, season_number) => {
  return tvSeasonsApi.getDetails(tv_id, season_number).then((seasonDetail) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_TV_SEASON_EPISODE_LIST,
      seasonDetail,
    });
  });
};
