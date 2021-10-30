import dispatcher from "../appDispatcher";
import * as discoverApi from "../api/discover";
import * as trendingApi from "../api/trending";
import MoviewActionTypes from "./actionTypes/movieActionTypes";
import apiConstants from "../api/apiConstants";
import { forkJoin } from "rxjs";

export const loadMoviesPageTrendingData = () => {
  return trendingApi
    .getDetails(apiConstants.MEDIA_MOVIE, apiConstants.TIME_WINDOW_DAY)
    .then((trendingMoviesData) => {
      dispatcher.dispatch({
        actionType: MoviewActionTypes.LOAD_MOVIE_PAGE_TRENDING_DATA,
        trendingMoviesData: trendingMoviesData.results,
      });
    });
};

export const loadMoviesPageData = (genresList, callbackFunction) => {
  const pArray = [];

  genresList.every((item) => {
    const filter = {
      with_genres: item.id,
    };
    return pArray.push(
      discoverApi.getMediaDiscover(filter, apiConstants.MEDIA_MOVIE)
    );
  });

  return forkJoin(pArray).subscribe((data) => {
    let moviesData = [];
    data.forEach((item, index) => {
      moviesData.push({
        id: genresList[index].id,
        name: genresList[index].name,
        type: genresList[index].type,
        sliderData: item.results,
      });
    });

    dispatcher.dispatch({
      actionType: MoviewActionTypes.LOAD_MOVIE_PAGE_DATA,
      moviesData,
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};
