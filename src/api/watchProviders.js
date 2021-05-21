import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/watch/providers";
const apiParam = new ApiParameters();

// Provider can be [regions, movie, tv]
export function getWatchProviders(provider, language = "en-US") {
  const url =
    baseURL +
    "/" +
    provider +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}
