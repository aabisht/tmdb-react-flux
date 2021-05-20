import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/genre";
const apiParam = new ApiParameters();

// Get the list of official genres for movies and TV shows.
export function getGenres(media_type, language = "en-US") {
  const url =
    baseURL +
    "/" +
    media_type +
    "/list" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}
