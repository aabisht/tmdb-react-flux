// How do I generate a session id?
// As outlined in the getting started guide, the basics to getting a user authenticated look like this:

// Create a new
// Get the user to authorize the request token
// Create a new  with the athorized request token

import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/authentication";
const apiParam = new ApiParameters();

// Create a temporary request token that can be used to validate a TMDB user login.
export function getRequestToken() {
  const url = baseURL + "/token/new" + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// You can use this method to create a fully valid session ID once a user has validated the request token.
export function createSession(request_token) {
  const url =
    baseURL + "/session/new" + apiParam.setApiKey(apiConstants.API_KEY);

  const mediaData = {
    request_token: request_token,
  };

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      ...mediaData,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

// This method allows an application to validate a request token by entering a username and password.
export function createSessionWithLogin(username, password, request_token) {
  const url =
    baseURL +
    "/token/validate_with_login" +
    apiParam.setApiKey(apiConstants.API_KEY);

  const mediaData = {
    username: username,
    password: password,
    request_token: request_token,
  };

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      ...mediaData,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

// If you would like to delete (or "logout") from a session, call this method with a valid session ID.
export function deleteSession(session_id) {
  const url = baseURL + "/session" + apiParam.setApiKey(apiConstants.API_KEY);

  const mediaData = {
    session_id: session_id,
  };

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      ...mediaData,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
