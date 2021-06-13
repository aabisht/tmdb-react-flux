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
    languagesWithPrimaryTranslations
  );

  useEffect(() => {
    configurationStores.addChangeListener(onLanguagePreferencesChange);
    if (languagesWithPrimaryTranslations.length === 0)
      loadLanguagesWithPrimaryTranslations();
    return () =>
      configurationStores.removeChangeListner(onLanguagePreferencesChange);
  }, [languagesWithPrimaryTranslations.length]);

  function onLanguagePreferencesChange() {
    setLanguagesWithPrimaryTranslations(
      configurationStores.getLanguageWithTranslations()
    );
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
    return (
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
    );
  }

  return (
    <div className="language-preferences-wrapper">
      <div className="language-preferences-header">
        <div className="h5 text-nowrap mt-2">Language Preferences</div>
        <div className="d-flex">
          <span className="default-text mb-2">Default Language</span>
          <span className="default-lan-name"></span>
        </div>
      </div>
      <div className="language-preferences-search-wrapper">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={searchValue}
            onChange={updateSearch}
          />
        </div>
        {searchResults.length === 0
          ? searchList(languagesWithPrimaryTranslations)
          : searchList(searchResults)}
      </div>
    </div>
  );
}

export default LanguagePreferences;
