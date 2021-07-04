import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/sharedActionTypes";

const CHANGE_EVENT = "change";
let _isLoginPageFlag;

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
}

const sharedStores = new SharedStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.IS_LOGIN_PAGE:
      _isLoginPageFlag = action.isLoginPage;
      break;
    default:
      break;
  }
});

export default sharedStores;
