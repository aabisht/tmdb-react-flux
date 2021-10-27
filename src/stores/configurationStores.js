import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes/configurationActionTypes";

const CHANGE_EVENT = "change";
let _languages = [];
let _api_configurations = [];
let _countries = [];
let _jobs = [];
let _primary_translations = [];
let _timezones = [];
let _languages_primary_translations = [];
let _defaultLanguage = "";
let _base_url = "";
let _backdrop_sizes = [];
let _logo_sizes = [];
let _poster_sizes = [];
let _profile_sizes = [];
let _still_sizes = [];
let _change_keys = [];
let _fullPageLoaderFlag = false;
let _mediaCardPopupData = {
  show: false,
  mediaCardData: {},
};
let _genres = [];

class ConfigurationStores extends EventEmitter {
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

  getAPIConfiguration() {
    return _api_configurations;
  }

  getCountries() {
    return _countries;
  }

  getJobs() {
    return _jobs;
  }

  getLanguages() {
    return _languages;
  }

  getPrimaryTranslations() {
    return _primary_translations;
  }

  getTimezones() {
    return _timezones;
  }

  getLanguageWithTranslations() {
    return _languages_primary_translations;
  }

  getDefaultLanguage() {
    return _defaultLanguage;
  }

  getBaseURL() {
    return _base_url;
  }

  getBackdropSizes() {
    return _backdrop_sizes;
  }

  getLogoSizes() {
    return _logo_sizes;
  }

  getPosterSizes() {
    return _poster_sizes;
  }

  getProfileSizes() {
    return _profile_sizes;
  }

  getStillSizes() {
    return _still_sizes;
  }

  getChangeKeys() {
    return _change_keys;
  }

  getFullPageLoaderValue() {
    return _fullPageLoaderFlag;
  }

  getMediaCardPopupData() {
    return _mediaCardPopupData;
  }

  getGenres() {
    return _genres;
  }
}

const configurationStores = new ConfigurationStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.LOAD_API_CONFIGURATIONS:
      _api_configurations.push(action.api_configurations);
      _base_url = action.api_configurations.images.secure_base_url;
      _backdrop_sizes = action.api_configurations.images.backdrop_sizes;
      _logo_sizes = action.api_configurations.images.logo_sizes;
      _poster_sizes = action.api_configurations.images.poster_sizes;
      _profile_sizes = action.api_configurations.images.profile_sizes;
      _still_sizes = action.api_configurations.images.still_sizes;
      _change_keys = action.api_configurations.change_keys;
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_COUNTRIES:
      _countries = action.countries;
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_JOBS:
      _jobs = action.jobs;
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_LANGUAGES:
      _languages = action.languages;
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_PRIMARY_TRANSLATIONS:
      _primary_translations = action.translations;
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_TIME_ZONE:
      _timezones = action.timezones;
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_LANGUAGES_WITH_PRIMARY_TRANSLATIONS:
      _languages_primary_translations = action.languagesWithPrimaryTranslations;
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_DEFAULT_LANGUAGE:
      _defaultLanguage = action.defaultLanguage;
      sessionStorage.setItem("defaultLanguage", action.defaultLanguage);
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_FULL_PAGE_LOADER:
      _fullPageLoaderFlag = action.isFullPageLoaderFlag;
      configurationStores.emitChange();
      break;
    case actionTypes.MEDIA_CARD_POPUP_TOGGLE:
      _mediaCardPopupData = action.mediaCardPopupData;
      configurationStores.emitChange();
      break;
    case actionTypes.LOAD_GENRES:
      _genres = action.genres;
      configurationStores.emitChange();
      break;
    default:
      break;
  }
});

export default configurationStores;
