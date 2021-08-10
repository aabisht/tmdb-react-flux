import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/trendingActionTypes";

const CHANGE_EVENT = "change";
let _trendingAll = [];
let _trendingMovie = [];
let _trendingTV = [];
let _trendingPerson = [];

class TrendingStores extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getTrendingAll() {
    return _trendingAll;
  }

  getTrendingMovie() {
    return _trendingMovie;
  }

  getTrendingTV() {
    return _trendingTV;
  }

  getTrendingPerson() {
    return _trendingPerson;
  }
}

const trendingStores = new TrendingStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.LOAD_TRENDING_ALL_DATA:
      _trendingAll = action.trendingAllData;
      trendingStores.emitChange();
      break;
    case actionType.LOAD_TRENDING_MOVIE_DATA:
      _trendingMovie = action.trendingMovieData;
      trendingStores.emitChange();
      break;
    case actionType.LOAD_TRENDING_TV_DATA:
      _trendingTV = action.trendingTVData;
      trendingStores.emitChange();
      break;
    case actionType.LOAD_TRENDING_PERSON_DATA:
      _trendingPerson = action.trendingPersonData;
      trendingStores.emitChange();
      break;
    default:
      break;
  }
});

export default trendingStores;
