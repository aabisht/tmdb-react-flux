import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/movie";
const apiParam = new ApiParameters();

// Get the primary information about a movie.
export function getDetails(movie_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    movie_id +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Grab the following account states for a session:
// 1. Movie rating
// 2. If it belongs to your watchlist
// 3. If it belongs to your favourite list
export function getAccountStates(movie_id, session_id) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/account_states" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get all of the alternative titles for a movie.
export function getAlternativeTitles(movie_id, country) {
  let urlPara = "";
  if (country) urlPara = urlPara + apiParam.setCountry(country);
  const url =
    baseURL +
    "/" +
    movie_id +
    "/alternative_titles" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    urlPara;
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the cast and crew for a movie.
export function getCredits(movie_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the external ids for a movie. We currently support the following external sources.
// 1. IMDb ID
// 2. Facebook
// 3. Instagram
// 4. Twitter
export function getExternalIDs(movie_id) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/external_ids" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the images that belong to a movie.
export function getImages(movie_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/images" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the keywords that have been added to a movie.
export function getKeywords(movie_id) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/keywords" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of lists that this movie belongs to.
export function getLists(movie_id, language = "en-US", page = 1) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/lists" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of recommended movies for a movie.
export function getRecommendations(movie_id, language = "en-US", page = 1) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/recommendations" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the release date along with the certification for a movie.
export function getReleaseDates(movie_id) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/release_dates" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the user reviews for a movie.
export function getReviews(movie_id, language = "en-US", page = 1) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/reviews" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website.
// These items are assembled by looking at keywords and genres.
export function getSimilarMovies(movie_id, language = "en-US", page = 1) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/similar" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of translations that have been created for a movie.
export function getTranslations(movie_id) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/translations" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the videos that have been added to a movie.
export function getVideos(movie_id, language = "en-US") {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/videos" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Powered by our partnership with JustWatch, you can query this method to get a list of the availabilities per country by provider.
// This is not going to return full deep links, but rather, it's just enough information to display what's available where.
export function getWatchProviders(movie_id) {
  const url =
    baseURL +
    "/" +
    movie_id +
    "/watch/providers" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// This method allows you to mark a movie or TV show as a favorite item.
//  The rating value is expected to be between 0.5 and 10.0.
export function rateMovie(session_id, rating) {
  const url =
    baseURL +
    "/" +
    movie_id +
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

// Remove your rating for a movie.
export function deleteMovieRating(session_id) {
  const url =
    baseURL +
    "/" +
    movie_id +
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

// Get the most newly created movie. This is a live response and will continuously change.
export function getLatest(language = "en-US") {
  const url =
    baseURL +
    "/latest" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.
export function getNowPlaying(region, language = "en-US", page = 1) {
  let urlPara = "";
  if (region) urlPara = urlPara + apiParam.setRegion(region);
  const url =
    baseURL +
    "/now_playing" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page) +
    urlPara;
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of the current popular movies on TMDB. This list updates daily.
export function getPopular(region, language = "en-US", page = 1) {
  let urlPara = "";
  if (region) urlPara = urlPara + apiParam.setRegion(region);
  const url =
    baseURL +
    "/popular" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page) +
    urlPara;
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the top rated movies on TMDB.
export function getTopRated(region, language = "en-US", page = 1) {
  let urlPara = "";
  if (region) urlPara = urlPara + apiParam.setRegion(region);
  const url =
    baseURL +
    "/top_rated" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page) +
    urlPara;
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get a list of upcoming movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.
export function getUpcoming(region, language = "en-US", page = 1) {
  let urlPara = "";
  if (region) urlPara = urlPara + apiParam.setRegion(region);
  const url =
    baseURL +
    "/upcoming" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(page) +
    urlPara;
  return fetch(url).then(handleResponse).catch(handleError);
}
