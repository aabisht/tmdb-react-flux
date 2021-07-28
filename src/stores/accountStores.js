import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/accountActionTypes";

const CHANGE_EVENT = "change";
let _accountInfoData = JSON.parse(sessionStorage.getItem("accountData"));

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

  getAccountInfo() {
    return _accountInfoData;
  }
}

const accountStores = new AccountStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.CREATE_ACCOUNT_INFO:
      _accountInfoData = action.accountInfoData;
      accountStores.emitChange();
      break;
    default:
      break;
  }
});

export default accountStores;
