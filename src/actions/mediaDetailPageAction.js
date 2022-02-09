import dispatcher from "../appDispatcher";
import apiConstants from "../api/apiConstants";
import * as moviesApi from "../api/movies";
import * as tvApi from "../api/tv";
import MediaDetailPageActionTypes from "./actionTypes/mediaDetailPageActionTypes";
import { forkJoin } from "rxjs";

export const loadMediaDataAndVideo = (mediaType, mediaId, callbackFunction) => {
  const pArray = [];
  if (mediaType === apiConstants.MEDIA_TV) {
    pArray.push(tvApi.getDetails(mediaId));
    pArray.push(tvApi.getVideos(mediaId));
  } else {
    pArray.push(moviesApi.getDetails(mediaId));
    pArray.push(moviesApi.getVideos(mediaId));
  }

  return forkJoin(pArray).subscribe((mediaData) => {
    dispatcher.dispatch({
      actionType: MediaDetailPageActionTypes.LOAD_MEDIA_DETAIL_AND_VIDEO_VIDEO,
      mediaDetails: mediaData[0],
      mediaVideo: mediaData[1].results,
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
