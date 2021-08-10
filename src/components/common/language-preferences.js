import React, { useState, useEffect } from "react";
import {
  loadLanguagesWithPrimaryTranslations,
  loadDefaultLanguage,
} from "../../actions/configurationAction";
import configurationStores from "../../stores/configurationStores";
import InputText from "./inputText";

function LanguagePreferences() {
  const [
    languagesWithPrimaryTranslations,
    setLanguagesWithPrimaryTranslations,
  ] = useState(configurationStores.getLanguageWithTranslations());

  const [searchValue, updateSearchValue] = useState("");
  const [searchResults, updateSearchResults] = useState(
    configurationStores.getLanguageWithTranslations()
  );

  const [defaultLanguage, setDefaultLanguage] = useState(
    configurationStores.getDefaultLanguage()
  );

  useEffect(() => {
    configurationStores.addChangeListener(onLanguagePreferencesChange);
    if (languagesWithPrimaryTranslations.length === 0) {
      loadLanguagesWithPrimaryTranslations();
      updateSearchResults(configurationStores.getLanguageWithTranslations());
    }
    return () =>
      configurationStores.removeChangeListner(onLanguagePreferencesChange);
  }, [languagesWithPrimaryTranslations.length]);

  useEffect(() => {
    configurationStores.addChangeListener(onDefaultLanguageChange);
    if (!defaultLanguage) {
      loadDefaultLanguage(
        sessionStorage.defaultLanguage
          ? sessionStorage.defaultLanguage
          : navigator.language || navigator.userLanguage
      );
    }
    return () =>
      configurationStores.removeChangeListner(onDefaultLanguageChange);
  }, [defaultLanguage]);

  const onLanguagePreferencesChange = () => {
    setLanguagesWithPrimaryTranslations(
      configurationStores.getLanguageWithTranslations()
    );
    updateSearchResults(configurationStores.getLanguageWithTranslations());
  };

  const onDefaultLanguageChange = () => {
    setDefaultLanguage(configurationStores.getDefaultLanguage());
  };

  const getLanguageName = (language) => {
    return language.name && !language.name.includes("??")
      ? language.name
      : language.english_name;
  };

  const updateSearch = (event) => {
    updateSearchValue(event.target.value);
    updateSearchResults(
      languagesWithPrimaryTranslations.filter((result) => {
        return result.english_name.match(new RegExp(event.target.value, "gi"));
      })
    );
  };
  const handeChangeDefaultLanguage = (event) => {
    loadDefaultLanguage(event.target.getAttribute("data-lang"));
  };

  return (
    <div className="language-preferences-wrapper">
      <div className="language-preferences-header ps-2 pe-2">
        <div className="h5 text-nowrap mt-3 mb-3">Language Preferences</div>
        <div className="align-items-center d-flex justify-content-between mb-3">
          <span className="default-text ">Default Language</span>
          <strong className="default-lan-name">{defaultLanguage}</strong>
        </div>
      </div>
      <div className="language-preferences-search-wrapper">
        <div className="ps-2 pe-2">
          <InputText
            label="Search your language"
            id="languageSearchInput"
            name="userName"
            type="text"
            placeholder="Search your language"
            formGroupClassName="mb-3"
            labelClassName="d-none"
            onChange={updateSearch}
            value={searchValue}
            hasIcon="true"
            iconPosition="right"
            iconText={[
              <span
                className="material-icons-outlined"
                key="languageSearchInput"
              >
                search
              </span>,
            ]}
          />
        </div>
        {searchResults.length > 0 ? (
          <ul className="list-unstyled dropdown-list-wrappper language-list-wrapper">
            {searchResults.map((language) => {
              return (
                <li data="search" key={language.index}>
                  <button
                    type="button"
                    className="btn d-block text-nowrap w-100"
                    onClick={handeChangeDefaultLanguage}
                    data-lang={language.primary_translations}
                  >
                    {getLanguageName(language)} ({language.primary_translations}
                    )
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center no-record">No record found</div>
        )}
      </div>
    </div>
  );
}

export default LanguagePreferences;
