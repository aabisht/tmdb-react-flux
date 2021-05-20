import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/find";
const apiParam = new ApiParameters();

// The find method makes it easy to search for objects in our database by an external id.
// This method will search all objects (movies, TV shows and people) and return the results in a single response.
// The supported external sources for each object are as follows.
export function getFindByID(external_id, external_source, language = "en-US") {
  const url =
    baseURL +
    "/" +
    external_id +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setExternalSource(external_source);
  return fetch(url).then(handleResponse).catch(handleError);
}
