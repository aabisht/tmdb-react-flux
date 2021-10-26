import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/browsePageActionTypes";

const CHANGE_EVENT = "change";
let _browsePageData = [];
let _pageNumber;
let _total_pages;
let _total_results;

class BrowsePageStores extends EventEmitter {
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

  getBrowsePageData() {
    return _browsePageData;
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
}

const browsePageStores = new BrowsePageStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.LOAD_BROWSE_PAGE_DATA:
      _browsePageData = action.browsePageData.results;
      _pageNumber = action.browsePageData.page;
      _total_pages = action.browsePageData.total_pages;
      _total_results = action.browsePageData.total_results;
      browsePageStores.emitChange();
      break;
    default:
      break;
  }
});

export default browsePageStores;
