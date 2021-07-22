import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/sharedActionTypes";

const CHANGE_EVENT = "change";
let _isLoginPageFlag;
let _isUserLoggedInFlag;

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

  getIsLoginPage() {
    return _isLoginPageFlag;
  }

  getIsUserLoggedIn() {
    console.log("Dispatcher: ", _isUserLoggedInFlag);
    return _isUserLoggedInFlag;
  }
}

const sharedStores = new SharedStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.IS_LOGIN_PAGE:
      _isLoginPageFlag = action.isLoginPage;
      sharedStores.emitChange();
      break;
    case actionType.IS_USER_LOGGED_IN:
      _isUserLoggedInFlag = action.isUserLoggedInFlag;
      console.log("Dispatcher: ", _isUserLoggedInFlag);
      sharedStores.emitChange();
      break;
    default:
      break;
  }
});

export default sharedStores;
