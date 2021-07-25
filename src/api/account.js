import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/account";
const apiParam = new ApiParameters();

// Get your account details.
export function getAccountDetail(session_id) {
  const url =
    baseURL +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get all of the lists created by an account. Will invlude private lists if you are the owner.
export function getCreatedLists(session_id, language = "en-US", page = "1") {
  const url =
    baseURL +
    "/lists" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setSessionID(session_id) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the list of your favorite movies or TV shows.
export function getFavorite(
  session_id,
  media_type,
  language = "en-US",
  page = "1",
  sort_by = apiConstants.SORT_BY_CREATED_AT_ASC
) {
  const url =
    baseURL +
    "/favorite/" +
    media_type +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setSessionID(session_id) +
    apiParam.setSortBy(sort_by) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// This method allows you to mark a movie or TV show as a favorite item.
export function markAsFavorite(session_id, mediaData) {
  const url =
    baseURL +
    "/favorite" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id);

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      ...mediaData,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}

// Get a list of all the movies, TV shows and TV episodes you have rated.
export function getRated(
  session_id,
  media_type,
  episodes,
  language = "en-US",
  page = "1",
  sort_by = apiConstants.SORT_BY_CREATED_AT_ASC
) {
  let _episodes = episodes ? "/" + episodes : "";
  const url =
    baseURL +
    "/rated/" +
    media_type +
    _episodes +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setSessionID(session_id) +
    apiParam.setSortBy(sort_by) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of all the movies or TV shows you have added to your watchlist.
export function getWatchlist(
  session_id,
  media_type,
  language = "en-US",
  page = "1",
  sort_by = apiConstants.SORT_BY_CREATED_AT_ASC
) {
  const url =
    baseURL +
    "/watchlist/" +
    media_type +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setSessionID(session_id) +
    apiParam.setSortBy(sort_by) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// This method allows you to mark a movie or TV show as a favorite item.
export function addToWatchlist(session_id, mediaData) {
  const url =
    baseURL +
    "/watchlist" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id);

  return fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      ...mediaData,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
