import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/tv";
const apiParam = new ApiParameters();

// Get the primary TV show details by id.
export function getDetails(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Grab the following account states for a session:
// 1. TV show rating
// 2. If it belongs to your watchlist
// 3. If it belongs to your favourite list
export function getAccountStates(tv_id, session_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/account_states" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the aggregate credits (cast and crew) that have been added to a TV show.
export function getAggregateCredits(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/aggregate_credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the aggregate credits (cast and crew) that have been added to a TV show.
export function getAlternativeTitles(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/alternative_titles" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the list of content ratings (certifications) that have been added to a TV show.
export function getContentRatings(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/content_ratings" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the credits (cast and crew) that have been added to a TV show.
export function getCredits(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get all of the episode groups that have been created for a TV show. With a group ID you can call the  method.
export function getEpisodeGroups(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/episode_groups" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get all of the episode groups that have been created for a TV show. With a group ID you can call the  method.
export function getExternalIDs(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/external_ids" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the images that belong to a TV show.
export function getImages(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/images" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the keywords that have been added to a TV show.
export function getKeywords(tv_id) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/keywords" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the images that belong to a TV show.
export function getRecommendations(tv_id, language = "en-US", page = 1) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/recommendations" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the reviews for a TV show.
export function getReviews(tv_id, language = "en-US", page = 1) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/reviews" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the keywords that have been added to a TV show.
export function getScreenedTheatrically(tv_id) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/screened_theatrically" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of similar TV shows. These items are assembled by looking at keywords and genres.
export function getSimilarTVShows(tv_id, language = "en-US", page = 1) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/similar" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of the translations that exist for a TV show.
export function getTranslations(tv_id) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/translations" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the videos that have been added to a TV show.
export function getVideos(tv_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/videos" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the videos that have been added to a TV show.
export function getWatchProviders(tv_id) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/watch/providers" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Rate a TV show.
//  The rating value is expected to be between 0.5 and 10.0.
export function rateTVShow(tv_id, session_id, rating) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/rating" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id);

  const mediaData = {
    value: rating,
  };

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

// Remove your rating for a TV Show.
export function deleteRating(tv_id, session_id) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/rating" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id);

  return fetch(url, {
    method: "DELETE",
    headers: { "content-type": "application/json;charset=utf-8" },
  })
    .then(handleResponse)
    .catch(handleError);
}

// Get the most newly created TV show. This is a live response and will continuously change.
export function getLatest(language = "en-US") {
  const url =
    baseURL +
    "/latest" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of TV shows that are airing today. This query is purely day based as we do not currently support airing times.
export function getTVAiringToday(language = "en-US", page = 1) {
  const url =
    baseURL +
    "/airing_today" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of TV shows that are airing today. This query is purely day based as we do not currently support airing times.
export function getTVOnTheAir(language = "en-US", page = 1) {
  const url =
    baseURL +
    "/on_the_air" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of the current popular TV shows on TMDB. This list updates daily.
export function getPopular(language = "en-US", page = 1) {
  const url =
    baseURL +
    "/popular" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of the top rated TV shows on TMDB.
export function getTopRated(language = "en-US", page = 1) {
  const url =
    baseURL +
    "/top_rated" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}
