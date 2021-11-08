import React, { useState, useEffect } from "react";
import PageBanner from "../common/page-banner";
import BrowsePageStores from "../../stores/browsePageStores";
import {
  loadBrowsePageData,
  loadBrowsePageTrendingData,
} from "../../actions/browsePageAction";
import MediaCard from "../common/media-card";
import ConfigurationStores from "../../stores/configurationStores";

function BrowsePage(props) {
  let [pageNumber, setPageNumber] = useState(1);
  const [btnClass, updateBtnClass] = useState("btn outline primary mb-4 lg");
  const mediaType = props.match.params.type,
    genreID = props.match.params.genreId;

  const pageType =
    props.match.params.genre === "trending" ? "trending" : "genre";

  const [browsePageData, setBrowsePageData] = useState([]);
  const [defaultLanguage, setDefaultLanguage] = useState(
    ConfigurationStores.getDefaultLanguage()
  );

  const onBrowsePageData = () => {
    setBrowsePageData(BrowsePageStores.getBrowsePageData());
  };

  const onDefaultLanguageChange = () => {
    setDefaultLanguage(ConfigurationStores.getDefaultLanguage());
  };

  useEffect(() => {
    BrowsePageStores.addChangeListener(onBrowsePageData);
    ConfigurationStores.addChangeListener(onDefaultLanguageChange);

    const filterParameter = {
      with_genres: genreID,
    };

    if (browsePageData.length === 0 && defaultLanguage.length !== 0)
      pageType === "trending"
        ? loadBrowsePageTrendingData(pageNumber, mediaType)
        : loadBrowsePageData(
            filterParameter,
            mediaType,
            defaultLanguage,
            pageNumber
          );

    return () => {
      BrowsePageStores.removeChangeListner(onBrowsePageData);
      ConfigurationStores.addChangeListener(onDefaultLanguageChange);
    };
  }, [
    browsePageData,
    genreID,
    mediaType,
    defaultLanguage,
    pageNumber,
    pageType,
  ]);

  const loadMoreCallback = () => {
    let _browsePageData = browsePageData;

    BrowsePageStores.getBrowsePageData().every((item) => {
      return _browsePageData.push(item);
    });
    setBrowsePageData(_browsePageData);
    updateBtnClass("btn outline primary mb-4 lg");
  };

  const handleLoadMore = () => {
    const _pageNumber = pageNumber + 1;
    setPageNumber(_pageNumber);
    updateBtnClass("btn outline primary mb-4 lg disabled");
    const filterParameter = {
      with_genres: genreID,
    };

    if (_pageNumber !== 1 && _pageNumber <= BrowsePageStores.getTotalPages()) {
      pageType === "trending"
        ? loadBrowsePageTrendingData(_pageNumber, mediaType, loadMoreCallback)
        : loadBrowsePageData(
            filterParameter,
            mediaType,
            defaultLanguage,
            _pageNumber
          ).then(() => {
            loadMoreCallback();
          });
    }
  };

  return browsePageData?.length > 0 ? (
    <>
      <div className="mb-4">
        <PageBanner
          bannerData={browsePageData[0]}
          bannerType={mediaType}
        ></PageBanner>
      </div>
      <div className="container listing-page">
        <div className="row">
          {browsePageData?.map((cardData, index) => {
            return (
              <div className="col-xl-2 col-md-3 col-6" key={index}>
                <MediaCard
                  mediaCardData={cardData}
                  mediaCardDataType={mediaType}
                ></MediaCard>
              </div>
            );
          })}
        </div>
        <div className="text-center mb-4">
          <button type="button" onClick={handleLoadMore} className={btnClass}>
            Load More
          </button>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default BrowsePage;
