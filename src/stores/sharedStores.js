import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/sharedActionTypes";

const CHANGE_EVENT = "change";
let _isUserLoggedInFlag = false;
let _userSession;

class SharedStores extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getIsUserLoggedIn() {
    return _isUserLoggedInFlag;
  }

  getSessionId() {
    return _userSession;
  }
}

const sharedStores = new SharedStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.IS_USER_LOGGED_IN:
      _isUserLoggedInFlag = action.isUserLoggedInFlag;
      sharedStores.emitChange();
      break;
    case actionType.CREATE_SESSION_WITH_LOGIN:
      _userSession = action.sessionId;
      sharedStores.emitChange();
      break;
    default:
      break;
  }
});

export default sharedStores;
