import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/certification";

// Create a temporary request token that can be used to validate a TMDB user login.
export function getMovieCertifications(media_type) {
  const url =
    baseURL +
    "/" +
    media_type +
    "/list" +
    ApiParameters.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}
