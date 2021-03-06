import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/credit";
const apiParam = new ApiParameters();

// Get a movie or TV credit details by id.
export function getAPIConfiguration(credit_id) {
  const url =
    baseURL + "/" + credit_id + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}
