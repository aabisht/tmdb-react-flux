// How do I generate a session id?
// As outlined in the getting started guide, the basics to getting a user authenticated look like this:

// Create a new
// Get the user to authorize the request token
// Create a new  with the athorized request token

import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/authentication";

// Create a temporary request token that can be used to validate a TMDB user login.
export function getRequestToken() {
  const url =
    baseURL + "/token/new?" + ApiParameters.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// This method allows you to mark a movie or TV show as a favorite item.
export function createSessionWithLogin(username, password, request_token) {
  const url =
    baseURL +
    "/token/validate_with_login?" +
    ApiParameters.setApiKey(apiConstants.API_KEY);

  const mediaData = {
    username: username,
    password: password,
    request_token: request_token,
  };

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...mediaData,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

// If you would like to delete (or "logout") from a session, call this method with a valid session ID.
export function deleteSession(session_id) {
  const url =
    baseURL + "/session?" + ApiParameters.setApiKey(apiConstants.API_KEY);

  const mediaData = {
    session_id: session_id,
  };

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...mediaData,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
