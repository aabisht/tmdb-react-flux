import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/certification";
const apiParam = new ApiParameters();

// Create a temporary request token that can be used to validate a TMDB user login.
export function getMovieCertifications(media_type) {
  const url =
    baseURL +
    "/" +
    media_type +
    "/list" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}
