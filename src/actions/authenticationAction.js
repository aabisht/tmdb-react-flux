import dispatcher from "../appDispatcher";
import SharedActionTypes from "./actionTypes/authenticationActionTypes";
import * as authenticationApi from "../api/authentication";

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

export function createRequestToken() {
  return authenticationApi.getRequestToken().then((request_token_data) => {
    dispatcher.dispatch({
      actionType: SharedActionTypes.CREATE_REQUEST_TOKEN,
      request_token_data,
    });
  });
}
