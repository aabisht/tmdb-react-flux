import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes/authenticationActionTypes";

const CHANGE_EVENT = "change";
let _request_token = [];
let _session_id = [];
let _delete_session_id = [];

class AuthenticationStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getRequestToken() {
    return _request_token;
  }

  getSessionId() {
    return _session_id;
  }

  getDeleteSessionId() {
    return _delete_session_id;
  }
}

const authenticationStore = new AuthenticationStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_REQUEST_TOKEN:
      _request_token = action.request_token;
      configurationStores.emitChange();
      break;
    case actionTypes.CREATE_SESSION_WITH_LOGIN:
      _session_id = action.session_id;
      configurationStores.emitChange();
      break;
    case actionTypes.DELETE_SESSION:
      _delete_session_id = action.response;
      configurationStores.emitChange();
      break;
    default:
      break;
  }
});
export default authenticationStore;
