import dispatcher from "../appDispatcher";
import * as discoverApi from "../api/discover";
import BrowsePageActionTypes from "./actionTypes/browsePageActionTypes";

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
