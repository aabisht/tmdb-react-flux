import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/tvShowActionTypes";

const CHANGE_EVENT = "change";
let _tvShowData = [];
let _tvShowTrendingData = [];

class TvShowPageStores extends EventEmitter {
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

  getTvShowData() {
    return _tvShowData.sort(() => Math.random() - 0.5);
  }

  getTvShowTrendingData() {
    return _tvShowTrendingData;
  }
}

const tvShowPageStores = new TvShowPageStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.LOAD_TV_SHOW_PAGE_DATA:
      _tvShowData = action.tvShowData;
      tvShowPageStores.emitChange();
      break;
    case actionType.LOAD_TV_SHOW_PAGE_TRENDING_DATA:
      _tvShowTrendingData = action.trendingTVShowData;
      tvShowPageStores.emitChange();
      break;
    default:
      break;
  }
});

export default tvShowPageStores;
