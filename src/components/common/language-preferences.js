import React, { useState } from "react";
import configurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";
import ListSearchFilter from "./list-search-filter";

function LanguagePreferences() {
  const countries = configurationStores.getCountries(),
    languages = configurationStores.getLanguages(),
    [selectedDefaultLanguage, setSelectedDefaultLanguage] = useState(
      configurationStores.getDefaultLanguage()
    );

  const handeLanguageChange = (language) => {
    updateDefaultLanguage(language.iso_639_1, 0);
  };

  const handleCountryChange = (country) => {
    updateDefaultLanguage(country.iso_3166_1, 1);
  };

  const updateDefaultLanguage = (value, index) => {
    const languageArray = selectedDefaultLanguage.split("-");
    languageArray[index] = value;
    setSelectedDefaultLanguage(languageArray.join("-"));
  };

  const handleUpdateDefaultLanguage = () => {
    configurationAction.loadDefaultLanguage(selectedDefaultLanguage);
    document
      .querySelector(".header-language-selector-text")
      .classList.remove("show");
    document
      .querySelector(".header-language-selector-dropdown-wrappper")
      .classList.remove("show");
  };

  return (
    <div className="language-preferences-wrapper w-100">
      <div className="language-preferences-header ps-2 pe-2">
        <div className="h5 text-nowrap mt-3 mb-3">Language Preferences</div>
        <div className="align-items-center d-flex justify-content-between mb-3">
          <span className="default-text ">Default Language</span>
          <strong className="default-lan-name">
            {selectedDefaultLanguage}
          </strong>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <ListSearchFilter
            listData={countries}
            searchInputId="countrySearchInput"
            searchInputLabel="Search your Country"
            searchListViewParameter1="native_name"
            searchListViewParameter2="english_name"
            searchFilterParameter="english_name"
            selectList={handleCountryChange}
          />
        </div>
        <div className="col-6">
          <ListSearchFilter
            listData={languages}
            searchInputId="languageSearchInput"
            searchInputLabel="Search your Language"
            searchListViewParameter1="name"
            searchListViewParameter2="english_name"
            searchFilterParameter="iso_639_1"
            selectList={handeLanguageChange}
          />
        </div>
        <div className="col-12 ">
          <div className="pt-3 pb-3 ps-3 pe-3 text-end">
            <button
              type="button"
              className="btn primary outline"
              onClick={handleUpdateDefaultLanguage}
            >
              Update Default Language
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguagePreferences;
