import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/tv";
const apiParam = new ApiParameters();

// Get the TV season details by id.
export function getDetails(tv_id, season_number, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Returns all of the user ratings for the season's episodes.
export function getAccountStates(
  tv_id,
  season_number,
  session_id,
  language = "en-US"
) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/account_states" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the aggregate credits for TV season.
// This call differs from the main credits call in that it does not only return the season credits, but rather is a view of all the
// cast & crew for all of the episodes belonging to a season.
export function getAggregateCredits(tv_id, season_number, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/aggregate_credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the credits for TV season.
export function getCredits(tv_id, season_number, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the credits for TV season.
export function getExternalIDs(tv_id, season_number, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/external_ids" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the images that belong to a TV season.
export function getImages(tv_id, season_number, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/images" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the Translations that belong to a TV season.
export function getTranslations(tv_id, season_number, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/translations" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the videos that have been added to a TV season.
export function getVideos(tv_id, season_number, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/videos" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}
