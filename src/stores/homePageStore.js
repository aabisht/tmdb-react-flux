import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/homePageActionTypes";

const CHANGE_EVENT = "change";
let _homePageData = [];

class HomePageStores extends EventEmitter {
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

  getHomePageData() {
    return _homePageData.sort(() => Math.random() - 0.5);
  }
}

const homePageStores = new HomePageStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.LOAD_GENRES_DATA:
      _homePageData = action.homeGenreSliderData;
      homePageStores.emitChange();
      break;
    default:
      break;
  }
});

export default homePageStores;
