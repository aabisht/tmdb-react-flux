import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/authenticationActionTypes";

const CHANGE_EVENT = "change";
let _isUserLoggedInFlag = false;
let _sessionWithLoginData = [];
let _requestTokenData = [];
let _sessionData = [];

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

  getRequestTokenData() {
    return _requestTokenData;
  }

  getSessionWithLogin() {
    return _sessionWithLoginData;
  }

  getSessionData() {
    return _sessionData;
  }
}

const authenticationStores = new AuthenticationStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.IS_USER_LOGGED_IN:
      _isUserLoggedInFlag = action.isUserLoggedInFlag;
      authenticationStores.emitChange();
      break;
    case actionType.CREATE_REQUEST_TOKEN:
      _requestTokenData = action.request_token_data;
      authenticationStores.emitChange();
      break;
    case actionType.CREATE_SESSION_WITH_LOGIN:
      _sessionWithLoginData = action.create_session_with_login_data;
      authenticationStores.emitChange();
      break;
    case actionType.CREATE_SESSION:
      _sessionData = action.session_data;
      authenticationStores.emitChange();
      break;
    case actionType.DELETE_SESSION:
      _sessionWithLoginData = [];
      _requestTokenData = [];
      _sessionData = [];
      authenticationStores.emitChange();
      break;
    default:
      break;
  }
});

export default authenticationStores;
