import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";

const CHANGE_EVENT = "change";

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
}

const browsePageStores = new BrowsePageStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.LOAD_GENRES_DATA:
      _homePageData = action.homeGenreSliderData;
      browsePageStores.emitChange();
      break;
    default:
      break;
  }
});

export default browsePageStores;
