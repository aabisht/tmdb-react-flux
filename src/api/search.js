import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/search";
const apiParam = new ApiParameters();

// Search for companies.
export function getSearchCompanies(query, page = 1) {
  let urlPara = "";
  if (query) urlPara = urlPara + apiParam.setQuery(query);
  const url =
    baseURL +
    "/company" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    urlPara +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Search for collections.
export function getSearchCollections(query, language = "en-US", page = 1) {
  let urlPara = "";
  if (query) urlPara = urlPara + apiParam.setQuery(query);
  const url =
    baseURL +
    "/collection" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    urlPara +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Search for keywords.
export function getSearchKeywords(query, page = 1) {
  let urlPara = "";
  if (query) urlPara = urlPara + apiParam.setQuery(query);
  const url =
    baseURL +
    "/keyword" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    urlPara +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Search for movies.
export function getSearchMovies(
  query,
  year,
  primary_release_year,
  language = "en-US",
  page = 1,
  include_adult = true
) {
  let urlPara = "";
  if (query) urlPara = urlPara + apiParam.setQuery(query);
  if (year) urlPara = urlPara + apiParam.setYear(year);
  if (primary_release_year)
    urlPara = urlPara + apiParam.setPrimaryReleaseYear(primary_release_year);

  const url =
    baseURL +
    "/movie" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    urlPara +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page) +
    apiParam.setIncludeAdult(include_adult);

  return fetch(url).then(handleResponse).catch(handleError);
}

// Search multiple models in a single request. Multi search currently supports searching for movies, tv shows and people in a single request.
export function getMultiSearch(
  query,
  language = "en-US",
  page = 1,
  include_adult = false
) {
  let urlPara = "";
  if (query) urlPara = urlPara + apiParam.setQuery(query);

  const url =
    baseURL +
    "/multi" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    urlPara +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page) +
    apiParam.setIncludeAdult(include_adult);

  return fetch(url).then(handleResponse).catch(handleError);
}

// Search for people.
export function getSearchPeople(
  query,
  language = "en-US",
  page = 1,
  include_adult = false
) {
  let urlPara = "";
  if (query) urlPara = urlPara + apiParam.setQuery(query);

  const url =
    baseURL +
    "/person" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    urlPara +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page) +
    apiParam.setIncludeAdult(include_adult);

  return fetch(url).then(handleResponse).catch(handleError);
}

// Search for a TV show.
export function getSearchTVShows(
  query,
  first_air_date_year,
  language = "en-US",
  page = 1,
  include_adult = true
) {
  let urlPara = "";
  if (query) urlPara = urlPara + apiParam.setQuery(query);
  if (first_air_date_year)
    urlPara = urlPara + apiParam.setFirstAirDateYear(first_air_date_year);

  const url =
    baseURL +
    "/tv" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    urlPara +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page) +
    apiParam.setIncludeAdult(include_adult);

  return fetch(url).then(handleResponse).catch(handleError);
}
