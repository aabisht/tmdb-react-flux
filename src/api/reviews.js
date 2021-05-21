import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/review";
const apiParam = new ApiParameters();

// Get the primary person details by id.
export function getDetails(review_id) {
  const url =
    baseURL + "/" + review_id + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}
