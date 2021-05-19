import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/collection";

// Get collection details by id.
export function getDetails(collection_id) {
  const url =
    baseURL +
    "/" +
    collection_id +
    ApiParameters.setApiKey(apiConstants.API_KEY) +
    ApiParameters.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the images for a collection by id.
export function getImages(collection_id) {
  const url =
    baseURL +
    "/" +
    collection_id +
    "/images" +
    ApiParameters.setApiKey(apiConstants.API_KEY) +
    ApiParameters.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the list translations for a collection by id.
export function getTranslations(collection_id) {
  const url =
    baseURL +
    "/" +
    collection_id +
    "/translations" +
    ApiParameters.setApiKey(apiConstants.API_KEY) +
    ApiParameters.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}
