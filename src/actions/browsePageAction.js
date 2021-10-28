import dispatcher from "../appDispatcher";
import * as discoverApi from "../api/discover";
import * as trendingApi from "../api/trending";
import BrowsePageActionTypes from "./actionTypes/browsePageActionTypes";
import apiConstants from "../api/apiConstants";
import { forkJoin } from "rxjs";

export const loadBrowsePageData = (
  filterParameter,
  mediaType,
  language,
  pageNumber
) => {
  return discoverApi
    .getMediaDiscover(filterParameter, mediaType, language, pageNumber)
    .then((browsePageData) => {
      dispatcher.dispatch({
        actionType: BrowsePageActionTypes.LOAD_BROWSE_PAGE_DATA,
        browsePageData,
      });
    });
};

export const loadBrowsePageTrendingData = (pageNumber, callbackFunction) => {
  const trendingMovie = trendingApi.getDetails(
    apiConstants.MEDIA_MOVIE,
    apiConstants.TIME_WINDOW_DAY,
    pageNumber
  );
  const trendingTV = trendingApi.getDetails(
    apiConstants.MEDIA_TV,
    apiConstants.TIME_WINDOW_DAY,
    pageNumber
  );

  const pArray = [trendingMovie, trendingTV];
  let _trendingMedia = [];
  let browseTrendingPageData;

  return forkJoin(pArray).subscribe((trendingMediaData) => {
    trendingMediaData[0].results.every((value) => {
      return _trendingMedia.push(value);
    });
    trendingMediaData[1].results.every((value) => {
      return _trendingMedia.push(value);
    });
    _trendingMedia = _trendingMedia.sort(() => Math.random() - 0.5);
    browseTrendingPageData = {
      page: pageNumber,
      results: _trendingMedia,
      total_pages:
        trendingMediaData[0].total_pages >= trendingMediaData[1].total_pages
          ? trendingMediaData[0].total_pages
          : trendingMediaData[1].total_pages,
      total_results:
        trendingMediaData[0].total_results >= trendingMediaData[1].total_results
          ? trendingMediaData[0].total_results
          : trendingMediaData[1].total_results,
    };
    dispatcher.dispatch({
      actionType: BrowsePageActionTypes.LOAD_BROWSE_PAGE_TRENDING_MOVIE_TV_DATA,
      browseTrendingPageData,
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};
