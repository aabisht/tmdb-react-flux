import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/searchPageActionTypes";

const CHANGE_EVENT = "change";
let _searchPageData = [];
let _pageNumber;
let _total_pages;
let _total_results;
let _searchQuery = "";
let _searchQueryOld = "";

class SearchPageStores extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
    this.setMaxListeners(0);
  }

  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
    this.setMaxListeners(0);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getSearchPageData() {
    return _searchPageData;
  }

  getPageNumber() {
    return _pageNumber;
  }

  getTotalPages() {
    return _total_pages;
  }

  getTotalResults() {
    return _total_results;
  }

  getSearchQuery() {
    return _searchQuery;
  }

  getOldSearchQuery() {
    return _searchQueryOld;
  }
}

const searchPageStores = new SearchPageStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.LOAD_SEARCH_PAGE_DATA:
      _searchPageData = action.searchPageData.results;
      _pageNumber = action.searchPageData.page;
      _total_pages = action.searchPageData.total_pages;
      _total_results = action.searchPageData.total_results;
      searchPageStores.emitChange();
      break;
    case actionType.SET_SEARCH_QUERY:
      _searchQuery = action.searchQuery;
      searchPageStores.emitChange();
      break;
    case actionType.SET_OLD_SEARCH_QUERY:
      _searchQueryOld = action.searchOldQuery;
      searchPageStores.emitChange();
      break;
    default:
      break;
  }
});

export default searchPageStores;
