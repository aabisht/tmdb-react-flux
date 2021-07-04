import dispatcher from "../appDispatcher";
import SharedActionTypes from "./actionTypes/sharedActionTypes";

export function isLoginPage(isLoginPageFlag) {
  return dispatcher.dispatch({
    actionType: SharedActionTypes.IS_LOGIN_PAGE,
    isLoginPage: isLoginPageFlag,
  });
}
