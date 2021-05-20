import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/collection";
const apiParam = new ApiParameters();

// Get collection details by id.
export function getDetails(collection_id) {
  const url =
    baseURL +
    "/" +
    collection_id +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the images for a collection by id.
export function getImages(collection_id) {
  const url =
    baseURL +
    "/" +
    collection_id +
    "/images" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the list translations for a collection by id.
export function getTranslations(collection_id) {
  const url =
    baseURL +
    "/" +
    collection_id +
    "/translations" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}
