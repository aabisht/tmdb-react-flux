import dispatcher from "../appDispatcher";
import { forkJoin } from "rxjs";
import SearchPageActionTypes from "./actionTypes/searchPageActionTypes";
import * as searchApi from "../api/search";
import apiConstants from "../api/apiConstants";

export const loadSearchPageData = (
  searchQuery,
  language,
  pageNumber,
  callbackFunction
) => {
  const searchMovies = searchApi.getSearchMovies(
    searchQuery,
    null,
    null,
    language,
    pageNumber
  );
  const searchTvShows = searchApi.getSearchTVShows(
    searchQuery,
    null,
    language,
    pageNumber
  );

  const pArray = [searchMovies, searchTvShows];

  return forkJoin(pArray).subscribe((searchData) => {
    let _searchData = [];

    searchData[0].results.every((value) => {
      value.media_type = apiConstants.MEDIA_MOVIE;
      return _searchData.push(value);
    });

    searchData[1].results.every((value) => {
      value.media_type = apiConstants.MEDIA_TV;
      return _searchData.push(value);
    });

    _searchData = _searchData.sort(() => Math.random() - 0.5);

    const searchPageData = {
      page: pageNumber,
      results: _searchData,
      total_pages:
        searchData[0].total_pages > searchData[1].total_pages
          ? searchData[0].total_pages
          : searchData[1].total_pages,
      total_results:
        searchData[0].total_results > searchData[1].total_results
          ? searchData[0].total_results
          : searchData[1].total_results,
    };

    dispatcher.dispatch({
      actionType: SearchPageActionTypes.LOAD_SEARCH_PAGE_DATA,
      searchPageData,
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

export const setOldSearchQuery = (searchOldQuery) => {
  return dispatcher.dispatch({
    actionType: SearchPageActionTypes.SET_OLD_SEARCH_QUERY,
    searchOldQuery,
  });
};

export const setSearchQuery = (searchQuery) => {
  return dispatcher.dispatch({
    actionType: SearchPageActionTypes.SET_SEARCH_QUERY,
    searchQuery,
  });
};
