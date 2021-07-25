import dispatcher from "../appDispatcher";
import AccountActionTypes from "./actionTypes/accountActionTypes";
import * as accountApi from "../api/account";

export const createAccountDetail = (session_id) => {
  return accountApi.getAccountDetail(session_id).then((accountInfoData) => {
    dispatcher.dispatch({
      actionType: AccountActionTypes.CREATE_ACCOUNT_INFO,
      accountInfoData,
    });
  });
};
