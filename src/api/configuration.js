import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/configuration";
const apiParam = new ApiParameters();

// Get the system wide configuration information. Some elements of the API require some knowledge of this configuration data. The purpose of this is to try and keep the actual API responses as light as possible. It is recommended you cache this data within your application and check for updates every few days.
// This method currently holds the data relevant to building image URLs as well as the change key map.
// To build an image URL, you will need 3 pieces of data. The base_url, size and file_path. Simply combine them all and you will have a fully qualified URL. Here’s an example URL:
// https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg
// The configuration method also contains the list of change keys which can be useful if you are building an app that consumes data from the change feed.
export async function getAPIConfiguration() {
  const url = baseURL + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the list of countries (ISO 3166-1 tags) used throughout TMDB.
export function getCountries() {
  const url = baseURL + "/countries" + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of the jobs and departments we use on TMDB.
export function getJobs() {
  const url = baseURL + "/jobs" + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the list of languages (ISO 639-1 tags) used throughout TMDB.
export function getLanguages() {
  const url = baseURL + "/languages" + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of the officially supported translations on TMDB.
export function getPrimaryTranslations() {
  const url =
    baseURL +
    "/primary_translations" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the list of timezones used throughout TMDB.
export function getTimezones() {
  const url = baseURL + "/timezones" + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}
