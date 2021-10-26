import React, { useState, useEffect } from "react";
import PageBanner from "../common/page-banner";
import BrowsePageStores from "../../stores/browsePageStores";
import { loadBrowsePageData } from "../../actions/browsePageAction";
import MediaCard from "../common/media-card";

function BrowsePage(props) {
  let pageNumber = 1;
  const mediaType = props.match.params.type,
    genreID = props.match.params.genreId;

  const [browsePageData, setBrowsePageData] = useState(
    BrowsePageStores.getBrowsePageData()
  );

  const onBrowsePageData = () => {
    setBrowsePageData(BrowsePageStores.getBrowsePageData());
  };

  useEffect(() => {
    BrowsePageStores.addChangeListener(onBrowsePageData);
    const filterParameter = {
      with_genres: genreID,
    };
    if (browsePageData.length === 0)
      loadBrowsePageData(filterParameter, mediaType, "en-US", pageNumber);
    return () => BrowsePageStores.removeChangeListner(onBrowsePageData);
  }, [browsePageData.length, mediaType, genreID, pageNumber]);

  return browsePageData?.length > 0 ? (
    <>
      <PageBanner
        bannerData={browsePageData[0]}
        bannerType={mediaType}
      ></PageBanner>
      <div className="cards-row-wrapper">
        <div className="row">
          {browsePageData?.map((cardData, index) => {
            return (
              <div className="col-xl-2" key={index}>
                <MediaCard
                  mediaCardData={cardData}
                  mediaCardDataType={props.sliderMediaType}
                ></MediaCard>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}

export default BrowsePage;
