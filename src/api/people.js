import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/person";
const apiParam = new ApiParameters();

// Get the primary person details by id.
export function getDetails(person_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    person_id +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the movie credits for a person.
export function getMovieCredits(person_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    person_id +
    "/movie_credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the TV credits for a person.
export function getTVCredits(person_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    person_id +
    "/tv_credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the movie and TV credits together in a single response.
export function getCombinedCredits(person_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    person_id +
    "/combined_credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the movie and TV credits together in a single response.
export function getExternalIDs(person_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    person_id +
    "/external_ids" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the movie and TV credits together in a single response.
export function getImages(person_id) {
  const url =
    baseURL +
    "/" +
    person_id +
    "/images" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the images that this person has been tagged in.
export function getTaggedImages(person_id, language = "en-US", page = 1) {
  const url =
    baseURL +
    "/" +
    person_id +
    "/tagged_images" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of translations that have been created for a person.
export function getGetTranslations(person_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    person_id +
    "/translations" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the most newly created person. This is a live response and will continuously change.
export function getLatest(language = "en-US") {
  const url =
    baseURL +
    "/latest" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the most newly created person. This is a live response and will continuously change.
export function getPopular(language = "en-US", page = 1) {
  const url =
    baseURL +
    "/popular" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(1);
  return fetch(url).then(handleResponse).catch(handleError);
}
