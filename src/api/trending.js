import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/trending";
const apiParam = new ApiParameters();

// Get the primary information about a movie.
export function getDetails(media_type, time_window) {
  let urlPara = "";
  if (media_type) urlPara = urlPara + "/" + media_type;
  if (time_window) urlPara = urlPara + "/" + time_window;

  const url = baseURL + urlPara + apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}
