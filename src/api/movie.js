import apiConstants from "./apiConstants";
import { handleResponse, handleError } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/movie";

export function getDetails(movie_id, api_key, language = "en-US") {
  const url =
    baseURL + "/" + movie_id + "?api_key=" + api_key + "&language=" + language;
  return fetch(url).then(handleResponse).catch(handleError);
}
