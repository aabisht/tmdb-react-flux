import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/discover";

// Discover movies by different types of data like average rating, number of votes, genres and certifications. You can get a valid list of certifications from the  method.
export function getMovieDiscover(
  language = "en-US",
  pageNumber = 1,
  sort_by = apiConstants.SORT_BY_POPULARITY_ASC
) {
  const url =
    baseURL +
    "/movie" +
    ApiParameters.setApiKey(apiConstants.API_KEY) +
    ApiParameters.setLanguage(language) +
    ApiParameters.setPageNumber(pageNumber) +
    ApiParameters.setSortBy(sort_by);
  return fetch(url).then(handleResponse).catch(handleError);
}
