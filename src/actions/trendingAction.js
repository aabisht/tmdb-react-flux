import dispatcher from "../appDispatcher";
import TrendingActionTypes from "./actionTypes/trendingActionTypes";
import * as trendingApi from "../api/trending";
import apiConstants from "../api/apiConstants";
import { forkJoin } from "rxjs";

export const loadAllTrendingData = () => {
  return trendingApi
    .getDetails(apiConstants.MEDIA_ALL, apiConstants.TIME_WINDOW_DAY)
    .then((trendingAllData) => {
      dispatcher.dispatch({
        actionType: TrendingActionTypes.LOAD_TRENDING_DATA,
        trendingAllData,
      });
    });
};

export const loadMovieTrendingData = () => {
  return trendingApi
    .getDetails(apiConstants.MEDIA_MOVIE, apiConstants.TIME_WINDOW_DAY)
    .then((trendingMovieData) => {
      dispatcher.dispatch({
        actionType: TrendingActionTypes.LOAD_TRENDING_MOVIE_DATA,
        trendingMovieData,
      });
    });
};

export const loadTVTrendingData = () => {
  return trendingApi
    .getDetails(apiConstants.MEDIA_TV, apiConstants.TIME_WINDOW_DAY)
    .then((trendingTVData) => {
      dispatcher.dispatch({
        actionType: TrendingActionTypes.LOAD_TRENDING_TV_DATA,
        trendingTVData,
      });
    });
};

export const loadPersonTrendingData = () => {
  return trendingApi
    .getDetails(apiConstants.MEDIA_PERSON, apiConstants.TIME_WINDOW_DAY)
    .then((trendingPersonData) => {
      dispatcher.dispatch({
        actionType: TrendingActionTypes.LOAD_TRENDING_PERSON_DATA,
        trendingPersonData,
      });
    });
};

export const loadMovieTVTrendingData = () => {
  const trendingMovie = trendingApi.getDetails(
    apiConstants.MEDIA_MOVIE,
    apiConstants.TIME_WINDOW_DAY
  );
  const trendingTV = trendingApi.getDetails(
    apiConstants.MEDIA_TV,
    apiConstants.TIME_WINDOW_DAY
  );
  const pArray = [trendingMovie, trendingTV];
  let _trendingMedia = [];

  return forkJoin(pArray).subscribe((trendingMediaData) => {
    trendingMediaData[0].results.every((value, index) => {
      if (index >= 10) return false;
      return _trendingMedia.push(value);
    });

    trendingMediaData[1].results.every((value, index) => {
      if (index >= 10) return false;
      return _trendingMedia.push(value);
    });

    _trendingMedia = _trendingMedia.sort(() => Math.random() - 0.5);

    dispatcher.dispatch({
      actionType: TrendingActionTypes.LOAD_TRENDING_MOVIE_TV_DATA,
      trendingMedia: _trendingMedia,
    });
  });
};
