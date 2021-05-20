import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/discover";
const apiParam = new ApiParameters();

// Discover movies by different types of data like average rating, number of votes, genres and certifications. You can get a valid list of certifications from the  method.
export function getMovieDiscover(
  filterParameter,
  language = "en-US",
  pageNumber = 1
) {
  let parURL = "";

  if (filterParameter && filterParameter.sort_by)
    parURL = parURL + apiParam.setSortBy(filterParameter.sort_by);
  if (filterParameter && filterParameter.with_watch_monetization_types)
    parURL =
      parURL +
      apiParam.setWithWatchMonetizationTypes(
        filterParameter.with_watch_monetization_types
      );
  if (filterParameter && filterParameter.include_adult)
    parURL = parURL + apiParam.setIncludeAdult(filterParameter.include_adult);
  if (filterParameter && filterParameter.watch_region)
    parURL = parURL + apiParam.setWatchRegion(filterParameter.watch_region);
  if (filterParameter && filterParameter.watch_providers)
    parURL =
      parURL + apiParam.setWatchProviders(filterParameter.watch_providers);
  if (filterParameter && filterParameter.with_genres)
    parURL = parURL + apiParam.setWithGenres(filterParameter.with_genres);

  const url =
    baseURL +
    "/movie" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language) +
    apiParam.setPageNumber(pageNumber) +
    parURL;
  return fetch(url).then(handleResponse).catch(handleError);
}
