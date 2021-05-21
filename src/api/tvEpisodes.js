import apiConstants from "./apiConstants";
import { handleResponse, handleError, ApiParameters } from "./apiUtils";

const baseURL = apiConstants.API_URL + "/tv";
const apiParam = new ApiParameters();

// Get the TV episode details by id.
export function getDetails(
  tv_id,
  season_number,
  episode_number,
  language = "en-US"
) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get your rating for a episode.
export function getAccountStates(
  tv_id,
  season_number,
  episode_number,
  session_id,
  language = "en-US"
) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
    "/account_states" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the credits (cast, crew and guest stars) for a TV episode.
export function getCredits(
  tv_id,
  season_number,
  episode_number,
  language = "en-US"
) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
    "/credits" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the external ids for a TV episode. We currently support the following external sources.
export function getExternalIDs(tv_id, season_number, episode_number) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
    "/external_ids" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the images that belong to a TV episode.
export function getImages(tv_id, season_number, episode_number) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
    "/images" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the translation data for an episode.
export function getTranslations(tv_id, season_number, episode_number) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
    "/translations" +
    apiParam.setApiKey(apiConstants.API_KEY);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Get the videos that have been added to a TV episode.
export function getVideos(
  tv_id,
  season_number,
  episode_number,
  language = "en-US"
) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
    "/videos" +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setLanguage(language);
  return fetch(url).then(handleResponse).catch(handleError);
}

// Rate a TV Episodes.
//  The rating value is expected to be between 0.5 and 10.0.
export function rateTVEpisodes(
  tv_id,
  season_number,
  episode_number,
  session_id,
  rating
) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
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

// Remove your rating for a TV Episodes.
export function deleteEpisodes(
  tv_id,
  season_number,
  episode_number,
  session_id,
  rating
) {
  const url =
    baseURL +
    "/" +
    tv_id +
    "/season/" +
    season_number +
    "/episode/" +
    episode_number +
    apiParam.setApiKey(apiConstants.API_KEY) +
    apiParam.setSessionID(session_id);

  return fetch(url, {
    method: "DELETE",
    headers: { "content-type": "application/json;charset=utf-8" },
  })
    .then(handleResponse)
    .catch(handleError);
}
