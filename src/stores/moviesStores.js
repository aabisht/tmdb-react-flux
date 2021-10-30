import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/movieActionTypes";

const CHANGE_EVENT = "change";
let _moviesData = [];
let _moviesTrendingData = [];

class MoviesPageStores extends EventEmitter {
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

  getMoviesData() {
    return _moviesData.sort(() => Math.random() - 0.5);
  }

  getMoviesTrendingData() {
    return _moviesTrendingData;
  }
}

const moviesPageStores = new MoviesPageStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.LOAD_MOVIE_PAGE_DATA:
      _moviesData = action.moviesData;
      moviesPageStores.emitChange();
      break;
    case actionType.LOAD_MOVIE_PAGE_TRENDING_DATA:
      _moviesTrendingData = action.trendingMoviesData;
      moviesPageStores.emitChange();
      break;
    default:
      break;
  }
});

export default moviesPageStores;
