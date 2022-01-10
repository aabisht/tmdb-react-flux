import React, { useState, useEffect } from "react";
import SearchPageStores from "../../stores/searchPageStore";
import * as searchPageAction from "../../actions/searchPageAction";
import MediaCard from "../common/media-card";
import ConfigurationStores from "../../stores/configurationStores";

function SearchPage(props) {
  let pageNumber = 1;
  const [searchQuery, setSearchQuery] = useState(
    SearchPageStores.getSearchQuery()
  );
  const [searchQueryOld, setSearchQueryOld] = useState(
    SearchPageStores.getOldSearchQuery()
  );
  const defaultSearchQuery = props.match.params.slug;

  const [searchPageData, setSerchPageData] = useState([]);
  const [defaultLanguage, setDefaultLanguage] = useState(
    ConfigurationStores.getDefaultLanguage()
  );

  const onSearchPageDataChange = () => {
    setSerchPageData(SearchPageStores.getSearchPageData());
  };

  const onDefaultLanguageChange = () => {
    setDefaultLanguage(ConfigurationStores.getDefaultLanguage());
  };

  const onSearchQueryChange = () => {
    setSearchQuery(SearchPageStores.getSearchQuery());
  };

  const onOldSearchQueryChange = () => {
    setSearchQueryOld(SearchPageStores.getOldSearchQuery());
  };

  useEffect(() => {
    SearchPageStores.addChangeListener(onSearchPageDataChange);
    SearchPageStores.addChangeListener(onSearchQueryChange);
    SearchPageStores.addChangeListener(onOldSearchQueryChange);
    ConfigurationStores.addChangeListener(onDefaultLanguageChange);

    if (searchQuery?.length === 0) {
      searchPageAction.setSearchQuery(defaultSearchQuery);
    }
    if (searchQueryOld?.length === 0) {
      searchPageAction.setOldSearchQuery(defaultSearchQuery);
    }
    if (
      (searchPageData.length === 0 || searchQuery !== searchQueryOld) &&
      defaultLanguage.length !== 0
    )
      searchPageAction.loadSearchPageData(
        searchQuery,
        defaultLanguage,
        pageNumber
      );

    return () => {
      SearchPageStores.removeChangeListner(onSearchPageDataChange);
      SearchPageStores.removeChangeListner(onSearchQueryChange);
      SearchPageStores.removeChangeListner(onOldSearchQueryChange);
      ConfigurationStores.addChangeListener(onDefaultLanguageChange);
    };
  }, [
    searchPageData.length,
    defaultLanguage,
    pageNumber,
    searchQuery,
    searchQueryOld,
    defaultSearchQuery,
  ]);

  return (
    <div className="page-no-banner">
      <div className="container listing-page">
        <div className="mb-4">
          <h1>
            Explore Title related to: <strong>{searchQuery}</strong>
          </h1>
        </div>
        {searchPageData.length > 0 ? (
          <>
            <div className="row">
              {searchPageData?.map((cardData, index) => {
                return (
                  <div className="col-xl-2 col-md-3 col-6" key={index}>
                    <MediaCard mediaCardData={cardData}></MediaCard>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="h3 d-flex align-items-center">
              <span className="material-icons-outlined me-3 mb-0 h2">
                new_releases
              </span>
              <span>
                No record found for <em>{searchQuery}</em>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
