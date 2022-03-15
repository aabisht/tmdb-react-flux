import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionType from "../actions/actionTypes/mediaDetailPageActionTypes";

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
    case actionType.LOAD_MEDIA_DETAIL:
      _mediaDetails = action.mediaDetails;
      mediaDetailPageStore.emitChange();
      break;
    case actionType.LOAD_MEDIA_VIDEO:
      _mediaVideos = action.mediaVideo;
      mediaDetailPageStore.emitChange();
      break;
    case actionType.LOAD_MEDIA_EXTERNAL_IDS:
      _mediaExternalIDs = action.mediaExternalIDs;
      mediaDetailPageStore.emitChange();
      break;
    case actionType.LOAD_MEDIA_WATCH_PROVIDER:
      _mediaWatchProviders = action.mediaWatchProviders;
      mediaDetailPageStore.emitChange();
      break;
    case actionType.LOAD_MEDIA_CREDITS:
      _mediaCredits = action.mediaCredits;
      mediaDetailPageStore.emitChange();
      break;
    default:
      break;
  }
});

export default mediaDetailPageStore;
