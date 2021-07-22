import dispatcher from "../appDispatcher";
import SharedActionTypes from "./actionTypes/sharedActionTypes";

export function isUserLoggedIn(isUserLoggedInFlag) {
  return dispatcher.dispatch({
    actionType: SharedActionTypes.IS_USER_LOGGED_IN,
    isUserLoggedInFlag,
  });
}

export function createSessionId(sessionId) {
  return dispatcher.dispatch({
    actionType: SharedActionTypes.CREATE_SESSION_WITH_LOGIN,
    sessionId,
  });
}
