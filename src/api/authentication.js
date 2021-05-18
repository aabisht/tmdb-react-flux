// How do I generate a session id?
// As outlined in the getting started guide, the basics to getting a user authenticated look like this:

// Create a new
// Get the user to authorize the request token
// Create a new  with the athorized request token

import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/authentication";

// Create a temporary request token that can be used to validate a TMDB user login.
export function getRequestToken(api_key) {
  const url = baseURL + "/token/new?" + ApiParameters.setApiKey(api_key);
  return fetch(url).then(handleResponse).catch(handleError);
}
