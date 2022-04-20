import dispatcher from "../appDispatcher";
import apiConstants from "../api/apiConstants";
import * as moviesApi from "../api/movies";
import * as tvApi from "../api/tv";
import * as tvSeasonsApi from "../api/tvSeasons";
import MediaDetailPageActionTypes from "./actionTypes/mediaDetailPageActionTypes";
import { forkJoin } from "rxjs";

export const loadMediaData = (mediaType, mediaId, callbackFunction) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getDetails(mediaId));
    pArray.push(tvApi.getCredits(mediaId));
    pArray.push(tvApi.getReviews(mediaId));
    pArray.push(tvApi.getExternalIDs(mediaId));
    pArray.push(tvApi.getVideos(mediaId));
  } else {
    pArray.push(moviesApi.getDetails(mediaId));
    pArray.push(moviesApi.getCredits(mediaId));
    pArray.push(moviesApi.getReviews(mediaId));
    pArray.push(moviesApi.getExternalIDs(mediaId));
    pArray.push(moviesApi.getVideos(mediaId));
  }

  return forkJoin(pArray).subscribe((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DETAIL,
      mediaDetails: mediaData[0],
      mediaCredits: mediaData[1],
      mediaReviews: mediaData[2],
      mediaExternalIDs: mediaData[3],
      mediaVideo: mediaData[4],
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

export const loadMediaVideo = (mediaType, mediaId, callbackFunction) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getVideos(mediaId));
  } else {
    pArray.push(moviesApi.getVideos(mediaId));
  }

  return forkJoin(pArray).subscribe((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_VIDEO,
      mediaVideo: mediaData[0].results,
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

export const loadMediaExternalIds = (mediaType, mediaId, callbackFunction) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getExternalIDs(mediaId));
  } else {
    pArray.push(moviesApi.getExternalIDs(mediaId));
  }

  return forkJoin(pArray).subscribe((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_EXTERNAL_IDS,
      mediaExternalIDs: mediaData[0],
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

export const loadMediaWatchProvider = (
  mediaType,
  mediaId,
  callbackFunction
) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getWatchProviders(mediaId));
  } else {
    pArray.push(moviesApi.getWatchProviders(mediaId));
  }

  return forkJoin(pArray).subscribe((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_WATCH_PROVIDER,
      mediaWatchProviders: mediaData[0],
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

export const loadMediaCredits = (mediaType, mediaId, callbackFunction) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getCredits(mediaId));
  } else {
    pArray.push(moviesApi.getCredits(mediaId));
  }

  return forkJoin(pArray).subscribe((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_CREDITS,
      mediaCredits: mediaData[0],
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

export const loadMediaReviews = (mediaType, mediaId, callbackFunction) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getReviews(mediaId));
  } else {
    pArray.push(moviesApi.getReviews(mediaId));
  }

  return forkJoin(pArray).subscribe((mediaReviews) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_REVIEWS,
      mediaReviews: mediaReviews[0],
    });

    if (callbackFunction) {
      callbackFunction();
    }
  });
};

export const loadTVSeasonEpisodeList = (
  tv_id,
  season_number,
  callbackFunction
) => {
  return forkJoin([tvSeasonsApi.getDetails(tv_id, season_number)]).subscribe(
    (seasonDetail) => {
      dispatcher.dispatch({
        actionType: MediaDetailPageActionTypes.LOAD_TV_SEASON_EPISODE_LIST,
        seasonDetail: seasonDetail[0],
      });

      if (callbackFunction) {
        callbackFunction();
      }
    }
  );
};
