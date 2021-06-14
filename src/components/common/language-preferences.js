import React, { useState, useEffect } from "react";
import { loadLanguagesWithPrimaryTranslations } from "../../actions/configurationAction";
import configurationStores from "../../stores/configurationStores";

function LanguagePreferences() {
  const [
    languagesWithPrimaryTranslations,
    setLanguagesWithPrimaryTranslations,
  ] = useState(configurationStores.getLanguageWithTranslations());

  const [searchValue, updateSearchValue] = useState("");
  const [searchResults, updateSearchResults] = useState(
    configurationStores.getLanguageWithTranslations()
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

  function onLanguagePreferencesChange() {
    setLanguagesWithPrimaryTranslations(
      configurationStores.getLanguageWithTranslations()
    );
    updateSearchResults(configurationStores.getLanguageWithTranslations());
  }

  function getLanguageName(language) {
    return language.name && !language.name.includes("??")
      ? language.name
      : language.english_name;
  }

  function updateSearch(e) {
    updateSearchValue(e.target.value);
    updateSearchResults(
      languagesWithPrimaryTranslations.filter((result) => {
        return result.english_name.match(new RegExp(e.target.value, "gi"));
      })
    );
  }

  function searchList(searchMap) {
    return searchMap.length > 0 ? (
      <ul className="list-unstyled dropdown-list-wrappper language-list-wrapper">
        {searchMap.map((language) => {
          return (
            <li data="search" key={language.index}>
              <button type="button" className="btn d-block text-nowrap w-100">
                {getLanguageName(language)} ({language.primary_translations})
              </button>
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="text-center no-record">No record found</div>
    );
  }

  return (
    <div className="language-preferences-wrapper">
      <div className="language-preferences-header">
        <div className="h5 text-nowrap mt-3 mb-3">Language Preferences</div>
        <div className="d-flex mb-3">
          <span className="default-text ">Default Language</span>
          <span className="default-lan-name"></span>
        </div>
      </div>
      <div className="language-preferences-search-wrapper">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            value={searchValue}
            onChange={updateSearch}
            placeholder="Search your language"
          />
        </div>
        {searchList(searchResults)}
      </div>
    </div>
  );
}

export default LanguagePreferences;
