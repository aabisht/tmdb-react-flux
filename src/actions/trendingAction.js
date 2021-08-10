import dispatcher from "../appDispatcher";
import TrendingActionTypes from "./actionTypes/trendingActionTypes";
import * as trendingApi from "../api/trending";
import apiConstants from "../api/apiConstants";

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
