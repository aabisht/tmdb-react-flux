import dispatcher from "../appDispatcher";
import SharedActionTypes from "./actionTypes/authenticationActionTypes";
import * as authenticationApi from "../api/authentication";

export function isUserLoggedIn(isUserLoggedInFlag) {
  return dispatcher.dispatch({
    actionType: SharedActionTypes.IS_USER_LOGGED_IN,
    isUserLoggedInFlag,
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

export function createSessionWithLogin(username, password, request_token) {
  return authenticationApi
    .createSessionWithLogin(username, password, request_token)
    .then((create_session_with_login_data) => {
      dispatcher.dispatch({
        actionType: SharedActionTypes.CREATE_SESSION_WITH_LOGIN,
        create_session_with_login_data,
      });
    });
}

export function createSession(request_token) {
  return authenticationApi.createSession(request_token).then((session_data) => {
    dispatcher.dispatch({
      actionType: SharedActionTypes.CREATE_SESSION,
      session_data,
    });
  });
}

export function createSessionWithSavedSession(session_data) {
  return dispatcher.dispatch({
    actionType: SharedActionTypes.CREATE_SESSION,
    session_data,
  });
}

export function deleteSession(session_id) {
  return authenticationApi
    .deleteSession(session_id)
    .then((delete_session_data) => {
      dispatcher.dispatch({
        actionType: SharedActionTypes.DELETE_SESSION,
        delete_session_data,
      });
    });
}
