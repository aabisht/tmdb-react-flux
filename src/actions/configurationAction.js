import dispatcher from "../appDispatcher";
import ConfigurationActionTypes from "./actionTypes/configurationActionTypes";
import * as configurationApi from "../api/configuration";
import * as genresApi from "../api/genres";

export const loadDefaultConfigurationData = () => {
  const pArray = [
    configurationApi.getAPIConfiguration(),
    configurationApi.getLanguages(),
    configurationApi.getCountries(),
  ];

  return Promise.all(pArray).then((defaultConfigurationData) => {
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_DEFAULT_CONFIGURATIONS,
      api_configurations: defaultConfigurationData[0],
      languages: defaultConfigurationData[1],
      countries: defaultConfigurationData[2],
    });
  });
};

export const loadAPIConfiguration = () => {
  return configurationApi.getAPIConfiguration().then((api_configurations) => {
    dispatcher.dispatch({
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

export const fullPageLoaderFlag = (isFullPageLoaderFlag) => {
  if (!dispatcher._isDispatching) {
    return dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_FULL_PAGE_LOADER,
      isFullPageLoaderFlag,
    });
  }
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
  const pArray = [
    genresApi.getGenres("movie", defaultLang),
    genresApi.getGenres("tv", defaultLang),
  ];
  let _genres = [];

  return Promise.all(pArray).then((genres) => {
    _genres.push({
      type: "movie",
      data: genres[0],
    });
    _genres.push({
      type: "tv",
      data: genres[1],
    });
    _genres.push({
      defaultLang,
    });
    dispatcher.dispatch({
      actionType: ConfigurationActionTypes.LOAD_GENRES,
      genres: _genres,
    });
  });
};
