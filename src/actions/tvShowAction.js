import dispatcher from "../appDispatcher";
import * as discoverApi from "../api/discover";
import * as trendingApi from "../api/trending";
import TVShowActionTypes from "./actionTypes/tvShowActionTypes";
import apiConstants from "../api/apiConstants";
import { forkJoin } from "rxjs";

export const loadTVShowPageTrendingData = () => {
  return trendingApi
    .getDetails(apiConstants.MEDIA_TV, apiConstants.TIME_WINDOW_DAY)
    .then((trendingTVShowData) => {
      dispatcher.dispatch({
        actionType: TVShowActionTypes.LOAD_TV_SHOW_PAGE_TRENDING_DATA,
        trendingTVShowData: trendingTVShowData.results,
      });
    });
};

export const loadTVShowPageData = (genresList, callbackFunction) => {
  const pArray = [];

  genresList.every((item) => {
    const filter = {
      with_genres: item.id,
    };
    return pArray.push(
      discoverApi.getMediaDiscover(filter, apiConstants.MEDIA_TV)
    );
  });

  return forkJoin(pArray).subscribe((data) => {
    let tvShowData = [];
    data.forEach((item, index) => {
      tvShowData.push({
        id: genresList[index].id,
        name: genresList[index].name,
        type: genresList[index].type,
        sliderData: item.results,
      });
    });

    dispatcher.dispatch({
      actionType: TVShowActionTypes.LOAD_TV_SHOW_PAGE_DATA,
      tvShowData,
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};
