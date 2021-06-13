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

class ConfigurationStores extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListner(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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

  searchLanguageWithTranslations(searchValue) {
    return _languages_primary_translations.filter(
      (_languages_primary_translation) => {
        return _languages_primary_translation.english_name
          .toLowerCase()
          .match(new RegExp(searchValue.toLowerCase(), "gi"));
      }
    );
  }
}

const configurationStores = new ConfigurationStores();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.LOAD_API_CONFIGURATIONS:
      _api_configurations = action.api_configurations;
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
    default:
      break;
  }
});

export default configurationStores;
