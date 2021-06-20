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

  const [defaultLanguage, setDefaultLanguage] = useState("");

  useEffect(() => {
    configurationStores.addChangeListener(onLanguagePreferencesChange);
    if (languagesWithPrimaryTranslations.length === 0) {
      loadLanguagesWithPrimaryTranslations();
      updateSearchResults(configurationStores.getLanguageWithTranslations());
      setDefaultLanguage(configurationStores.getDefaultLanguage());
    }

    return () =>
      configurationStores.removeChangeListner(onLanguagePreferencesChange);
  }, [languagesWithPrimaryTranslations.length]);

  function onLanguagePreferencesChange() {
    setLanguagesWithPrimaryTranslations(
      configurationStores.getLanguageWithTranslations()
    );
    updateSearchResults(configurationStores.getLanguageWithTranslations());
    setDefaultLanguage(configurationStores.getDefaultLanguage());
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
  function handeChangeDefaultLanguage(event) {
    setDefaultLanguage(event.target.getAttribute("data-lang"));
  }

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
          <div className="form-group mb-3 has-icons icon-right">
            <input
              type="text"
              className="form-control"
              value={searchValue}
              onChange={updateSearch}
              placeholder="Search your language"
            />
            <span className="icon-wrapper">
              <span className="material-icons-outlined">search</span>
            </span>
          </div>
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
