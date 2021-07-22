import dispatcher from "../appDispatcher";
import AuthenticationActionTypes from "../actions/actionTypes/authenticationActionTypes";
import * as authenticationApi from "../api/authentication";

export function createRequestToken() {
  return authenticationApi.getRequestToken().then((request_token) => {
    dispatcher.dispatch({
      actionType: AuthenticationActionTypes.CREATE_REQUEST_TOKEN,
      request_token,
    });
  });
}

export function createSessionId(username, password, request_token) {
  return authenticationApi
    .createSessionWithLogin(username, password, request_token)
    .then((session_id) => {
      dispatcher.dispatch({
        actionType: AuthenticationActionTypes.CREATE_SESSION_WITH_LOGIN,
        session_id,
      });
    });
}

export function createRequestToken(session_id) {
  return authenticationApi.deleteSession(session_id).then((response) => {
    dispatcher.dispatch({
      actionType: AuthenticationActionTypes.DELETE_SESSION,
      response,
    });
  });
}
