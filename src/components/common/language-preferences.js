import React, { useState, useEffect } from "react";
import { loadLanguagesWithPrimaryTranslations } from "../../actions/configurationAction";
import configurationStores from "../../stores/configurationStores";

function LanguagePreferences() {
  const [
    languagesWithPrimaryTranslations,
    setLanguagesWithPrimaryTranslations,
  ] = useState(configurationStores.getLanguageWithTranslations());

  useEffect(() => {
    configurationStores.addChangeListener(onChange);
    if (languagesWithPrimaryTranslations.length === 0)
      loadLanguagesWithPrimaryTranslations();
    return () => configurationStores.removeChangeListner(onChange);
  }, [languagesWithPrimaryTranslations.length]);

  function onChange() {
    setLanguagesWithPrimaryTranslations(
      configurationStores.getLanguageWithTranslations()
    );
  }

  function getLanguageName(language) {
    return language.name && !language.name.includes("??")
      ? language.name
      : language.english_name;
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
          <input type="text" className="form-control" />
        </div>
        <ul className="list-unstyled language-list-wrapper">
          {languagesWithPrimaryTranslations.map((language) => {
            return (
              <li key={language.index}>
                <button type="button" className="btn">
                  {getLanguageName(language)} ({language.primary_translations})
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LanguagePreferences;
