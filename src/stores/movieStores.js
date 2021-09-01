import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";

const CHANGE_EVENT = "change";

class MovieStores extends EventEmitter {
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

const movieStores = new MovieStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
  }
});

export default movieStores;
