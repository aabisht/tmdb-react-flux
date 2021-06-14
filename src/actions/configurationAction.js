import dispatcher from "../appDispatcher";
import ConfigurationActionTypes from "./actionTypes/configurationActionTypes";
import * as configurationApi from "../api/configuration";
import { forkJoin } from "rxjs";

export function loadAPIConfiguration() {
  return configurationApi.getAPIConfiguration().then((api_configurations) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_API_CONFIGURATIONS,
      api_configurations,
    });
  });
}

export function loadCountries() {
  return configurationApi.getCountries().then((countries) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_COUNTRIES,
      countries,
    });
  });
}

export function loadJobs() {
  return configurationApi.getJobs().then((jobs) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_JOBS,
      jobs,
    });
  });
}

export function loadLanguages() {
  return configurationApi.getLanguages().then((languages) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_LANGUAGES,
      languages,
    });
  });
}

export function loadPrimaryTranslations() {
  return configurationApi.getPrimaryTranslations().then((translations) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_PRIMARY_TRANSLATIONS,
      translations,
    });
  });
}

export function loadTimezones() {
  return configurationApi.getTimezones().then((timezones) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_TIME_ZONE,
      timezones,
    });
  });
}

export function loadLanguagesWithPrimaryTranslations() {
  const languages = configurationApi.getLanguages();
  const primaryTranslations = configurationApi.getPrimaryTranslations();
  const pArray = [languages, primaryTranslations];
  let _languagesWithPrimaryTranslations = [];
  let _lang = [];

  return forkJoin(pArray).subscribe((languagesWithPrimaryTranslations) => {
    _lang = languagesWithPrimaryTranslations[0];

    _languagesWithPrimaryTranslations.push(
      languagesWithPrimaryTranslations[1].map((item, index) => {
        let lang = _lang.find(
          ({ iso_639_1 }) => iso_639_1 === item.split("-")[0]
        );

        return {
          english_name: lang.english_name,
          iso_639_1: lang.iso_639_1,
          name: lang.name,
          primary_translations: item,
          country_code: item.split("-")[1],
          index: index,
        };
      })
    );

    dispatcher.dispatch({
      actionType:
        ConfigurationActionTypes.LOAD_LANGUAGES_WITH_PRIMARY_TRANSLATIONS,
      languagesWithPrimaryTranslations: _languagesWithPrimaryTranslations[0],
    });
  });
}