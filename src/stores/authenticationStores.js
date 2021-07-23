import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/authenticationActionTypes";

const CHANGE_EVENT = "change";
let _isUserLoggedInFlag = false;
let _userSession;
let _requestTokenData = [];

class AuthenticationStores extends EventEmitter {
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

  getRequestTokenData() {
    return _requestTokenData;
  }
}

const authenticationStores = new AuthenticationStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.IS_USER_LOGGED_IN:
      _isUserLoggedInFlag = action.isUserLoggedInFlag;
      authenticationStores.emitChange();
      break;
    case actionType.CREATE_SESSION_WITH_LOGIN:
      _userSession = action.sessionId;
      authenticationStores.emitChange();
      break;
    case actionType.CREATE_REQUEST_TOKEN:
      _requestTokenData = action.request_token_data;
      authenticationStores.emitChange();
      break;
    default:
      break;
  }
});

export default authenticationStores;
