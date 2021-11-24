import dispatcher from "../appDispatcher";
import apiConstants from "../api/apiConstants";
import * as moviesApi from "../api/movies";
import * as tvApi from "../api/tv";
import MediaDetailPageActionTypes from "./actionTypes/mediaDetailPageActionTypes";
import { forkJoin } from "rxjs";

export const loadMediaDetail = (mediaType, mediaId) => {
  return mediaType === apiConstants.MEDIA_TV
    ? tvApi.getDetails(mediaId).then((mediaDetails) => {
        dispatcher.dispatch({
          actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DETAILS,
          mediaDetails,
        });
      })
    : moviesApi.getDetails(mediaId).then((mediaDetails) => {
        dispatcher.dispatch({
          actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DETAILS,
          mediaDetails,
        });
      });
};

export const loadMediaVideo = (mediaType, mediaId) => {
  return mediaType === apiConstants.MEDIA_TV
    ? tvApi.getVideos(mediaId).then((mediaVideo) => {
        dispatcher.dispatch({
          actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DETAILS,
          mediaVideo,
        });
      })
    : moviesApi.getVideos(mediaId).then((mediaVideo) => {
        dispatcher.dispatch({
          actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DETAILS,
          mediaVideo,
        });
      });
};

export const loadMediaDataAndVideo = (mediaType, mediaId, callbackFunction) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getDetails(mediaId));
    pArray.push(tvApi.getVideos(mediaId));
  } else {
    pArray.push(moviesApi.getDetails(mediaId));
    pArray.push(moviesApi.getVideos(mediaId));
  }

  return forkJoin(pArray).subscribe((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DETAIL_AND_VIDEO_VIDEO,
      mediaDetails: mediaData[0],
      mediaVideo: mediaData[1].results,
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

export const mediaDetailData = (
  mediaType,
  id,
  session_id,
  callbackFunction
) => {
  const pArray =
    mediaType === apiConstants.MEDIA_TV
      ? loadTVData(id, session_id)
      : loadMovieData(id, session_id);

  return forkJoin(pArray).subscribe((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DATA,
      mediaType,
      mediaData,
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

const loadMovieData = (movieId, session_id) => {
  const pArray = [];
  pArray.push(moviesApi.getDetails(movieId));
  pArray.push(moviesApi.getCredits(movieId));
  pArray.push(moviesApi.getExternalIDs(movieId));
  pArray.push(moviesApi.getImages(movieId));
  pArray.push(moviesApi.getVideos(movieId));
  pArray.push(moviesApi.getWatchProviders(movieId));
  pArray.push(moviesApi.getReviews(movieId));
  pArray.push(moviesApi.getAlternativeTitles(movieId));
  pArray.push(moviesApi.getRecommendations(movieId));
  pArray.push(moviesApi.getSimilarMovies(movieId));
  pArray.push(moviesApi.getReleaseDates(movieId));
  if (session_id) pArray.push(moviesApi.getAccountStates(movieId, session_id));

  return pArray;
};

const loadTVData = (tvId, session_id) => {
  const pArray = [];
  pArray.push(tvApi.getDetails(tvId));
  pArray.push(tvApi.getCredits(tvId));
  pArray.push(tvApi.getExternalIDs(tvId));
  pArray.push(tvApi.getImages(tvId));
  pArray.push(tvApi.getVideos(tvId));
  pArray.push(tvApi.getWatchProviders(tvId));
  pArray.push(tvApi.getReviews(tvId));
  pArray.push(tvApi.getAlternativeTitles(tvId));
  pArray.push(tvApi.getRecommendations(tvId));
  pArray.push(tvApi.getSimilarTVShows(tvId));
  pArray.push(tvApi.getAggregateCredits(tvId));
  if (session_id) pArray.push(moviesApi.getAccountStates(tvId, session_id));

  return pArray;
};
