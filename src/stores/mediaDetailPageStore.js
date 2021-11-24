import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/mediaDetailPageActionTypes";
import apiConstants from "../api/apiConstants";

const CHANGE_EVENT = "change";
let _mediaDetails = {};
let _mediaCredits = [];
let _mediaExternalIDs = [];
let _mediaImages = [];
let _mediaVideos = [];
let _mediaReleaseDates = [];
let _mediaWatchProviders = [];
let _mediaReviews = [];
let _mediaAlternativeTitles = [];
let _mediaRecommendations = [];
let _mediaSimilar = [];
let _mediaAggregateCredits = [];
let _mediaType = "";

class MediaDetailPageStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
    this.setMaxListeners(0);
  }

  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
    this.setMaxListeners(0);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getMediaType() {
    return _mediaType;
  }

  getMediaDetails() {
    return _mediaDetails;
  }

  getMediaCredits() {
    return _mediaCredits;
  }

  getMediaExternalIDs() {
    return _mediaExternalIDs;
  }

  getMediaImages() {
    return _mediaImages;
  }

  getMediaVideos() {
    return _mediaVideos;
  }

  getMediaReleaseDates() {
    return _mediaReleaseDates;
  }

  getMediaWatchProviders() {
    return _mediaWatchProviders;
  }

  getMediaReviews() {
    return _mediaReviews;
  }

  getMediaAlternativeTitles() {
    return _mediaAlternativeTitles;
  }

  getMediaRecommendations() {
    return _mediaRecommendations;
  }

  getMediaSimilar() {
    return _mediaSimilar;
  }

  getMediaAggregateCredits() {
    return _mediaAggregateCredits;
  }
}

const mediaDetailPageStore = new MediaDetailPageStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionType.LOAD_MEDIA_DATA:
      _mediaType = action.mediaType;
      _mediaDetails = action.mediaData[0];
      _mediaCredits = action.mediaData[1];
      _mediaExternalIDs = action.mediaData[2];
      _mediaImages = action.mediaData[3];
      _mediaVideos = action.mediaData[4];
      _mediaWatchProviders = action.mediaData[5];
      _mediaReviews = action.mediaData[6];
      _mediaAlternativeTitles = action.mediaData[7];
      _mediaRecommendations = action.mediaData[8];
      _mediaSimilar = action.mediaData[9];
      _mediaType === apiConstants.MEDIA_TV
        ? (_mediaAggregateCredits = action.mediaData[10])
        : (_mediaReleaseDates = action.mediaData[10]);
      mediaDetailPageStore.emitChange();
      break;
    case actionType.LOAD_MEDIA_DETAIL_AND_VIDEO_VIDEO:
      _mediaVideos = action.mediaVideo;
      _mediaDetails = action.mediaDetails;
      mediaDetailPageStore.emitChange();
      break;
    case actionType.LOAD_MEDIA_DETAILS:
      _mediaDetails = action.mediaDetails;
      mediaDetailPageStore.emitChange();
      break;
    case actionType.LOAD_MEDIA_VIDEO:
      _mediaVideos = action.mediaVideo;
      mediaDetailPageStore.emitChange();
      break;
    default:
      break;
  }
});

export default mediaDetailPageStore;
