import React, { useState, useEffect } from "react";
import PageBanner from "../common/page-banner";
import CardSlider from "../common/card-slider";
import TrendingStores from "../../stores/trendingStores";
import { loadMovieTVTrendingData } from "../../actions/trendingAction";

function HomePage() {
  const [trendingMedia, setTrendingMedia] = useState(
    TrendingStores.getTrendingMedia()
  );

  useEffect(() => {
    TrendingStores.addChangeListener(onTrendingMediaChange);
    if (trendingMedia.length === 0) {
      loadMovieTVTrendingData();
    }
    return () => TrendingStores.removeChangeListner(onTrendingMediaChange);
  }, [trendingMedia.length]);

  const onTrendingMediaChange = () => {
    setTrendingMedia(TrendingStores.getTrendingMedia());
  };

  return (
    <>
      <PageBanner bannerData={trendingMedia[0]}></PageBanner>
      <CardSlider
        sliderData={trendingMedia}
        sliderTitle="Trending Now"
      ></CardSlider>
      {/* <MediaCard></MediaCard> */}
    </>
  );
}

export default HomePage;
