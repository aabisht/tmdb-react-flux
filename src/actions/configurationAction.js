import dispatcher from "../appDispatcher";
import ConfigurationActionTypes from "./actionTypes/configurationActionTypes";
import * as configurationApi from "../api/configuration";
import * as genresApi from "../api/genres";
import { forkJoin } from "rxjs";

export const loadAPIConfiguration = async () => {
  await configurationApi
    .getAPIConfiguration()
    .then(async (api_configurations) => {
      await dispatcher.dispatch({
        actionType: ConfigurationActionTypes.LOAD_API_CONFIGURATIONS,
        api_configurations: api_configurations,
      });
    });
};

export const loadCountries = () => {
  return configurationApi.getCountries().then((countries) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_COUNTRIES,
      countries,
    });
  });
};

export const loadJobs = () => {
  return configurationApi.getJobs().then((jobs) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_JOBS,
      jobs,
    });
  });
};

export const loadLanguages = () => {
  return configurationApi.getLanguages().then((languages) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_LANGUAGES,
      languages,
    });
  });
};

export const loadPrimaryTranslations = () => {
  return configurationApi.getPrimaryTranslations().then((translations) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_PRIMARY_TRANSLATIONS,
      translations,
    });
  });
};

export const loadTimezones = () => {
  return configurationApi.getTimezones().then((timezones) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_TIME_ZONE,
      timezones,
    });
  });
};

export const loadLanguagesWithPrimaryTranslations = () => {
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
};

export const fullPageLoaderFlag = (isFullPageLoaderFlag) => {
  return dispatcher.dispatch({
    actionType: ConfigurationActionTypes.LOAD_FULL_PAGE_LOADER,
    isFullPageLoaderFlag,
  });
};

export const mediaCardPopupToggle = (
  mediaCardPopupToggleFlag,
  mediaCardData
) => {
  return dispatcher.dispatch({
    actionType: ConfigurationActionTypes.MEDIA_CARD_POPUP_TOGGLE,
    mediaCardPopupData: {
      show: mediaCardPopupToggleFlag,
      mediaCardData,
    },
  });
};

export const loadDefaultLanguage = (defaultLanguage) => {
  return dispatcher.dispatch({
    actionType: ConfigurationActionTypes.LOAD_DEFAULT_LANGUAGE,
    defaultLanguage,
  });
};

export const loadGenres = (defaultLang) => {
  const movieGenres = genresApi.getGenres("movie", defaultLang);
  const tvGenres = genresApi.getGenres("tv", defaultLang);
  const pArray = [movieGenres, tvGenres];
  let _genres = [];

  return forkJoin(pArray).subscribe((genres) => {
    _genres.push({
      type: "movie",
      data: genres[0],
    });
    _genres.push({
      type: "tv",
      data: genres[1],
    });

    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_GENRES,
      genres: _genres,
    });
  });
};
