import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/accountActionTypes";

const CHANGE_EVENT = "change";
let _accountInfoData = [];

class AccountStores extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}

const accountStores = new AccountStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.CREATE_ACCOUNT_INFO:
      _accountInfoData = action.accountInfoData;
      authenticationStores.emitChange();
      break;
    default:
      break;
  }
});

export default accountStores;
