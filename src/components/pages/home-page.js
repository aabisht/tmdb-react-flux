import React, { useState, useEffect } from "react";
import PageBanner from "../common/page-banner";
import CardSlider from "../common/card-slider";
import TrendingStores from "../../stores/trendingStores";
import { loadMovieTVTrendingData } from "../../actions/trendingAction";
import apiConstants from "../../api/apiConstants";
import ConfigurationStores from "../../stores/configurationStores";
import HomePageStores from "../../stores/homePageStore";
import * as configurationAction from "../../actions/configurationAction";
import { loadGenresHomeData } from "../../actions/homePageAction";

function HomePage() {
  const [trendingMedia, setTrendingMedia] = useState(
    TrendingStores.getTrendingMedia()
  );

  const [defaultLanguage, setDefaultLanguage] = useState(
    ConfigurationStores.getDefaultLanguage()
  );
  const [genres, setGenres] = useState(
    ConfigurationStores.getGenres(defaultLanguage)
  );

  const [homePageData, setHomePageData] = useState(
    HomePageStores.getHomePageData()
  );

  useEffect(() => {
    TrendingStores.addChangeListener(onTrendingMediaChange);
    if (
      trendingMedia.length === 0 ||
      trendingMedia.length > apiConstants.TOTAL_SLIDER_ITEMS
    ) {
      loadMovieTVTrendingData(apiConstants.TOTAL_SLIDER_ITEMS);
    }

    return () => TrendingStores.removeChangeListner(onTrendingMediaChange);
  }, [trendingMedia.length]);

  useEffect(() => {
    ConfigurationStores.addChangeListener(onGenresChange);
    ConfigurationStores.addChangeListener(onDefaultLanguageChange);
    HomePageStores.addChangeListener(onHomePageData);
    if (defaultLanguage && genres.length === 0)
      configurationAction.loadGenres(defaultLanguage);

    let _genres = [];
    genres.forEach((item) => {
      item.data.genres.every((value) => {
        let _genre = {
          id: value.id,
          name: value.name,
          type: item.type,
        };

        return _genres.push(_genre);
      });
    });

    if (homePageData.length === 0) loadGenresHomeData(_genres);

    return () => {
      ConfigurationStores.removeChangeListner(onGenresChange);
      ConfigurationStores.removeChangeListner(onDefaultLanguageChange);
      HomePageStores.removeChangeListner(onHomePageData);
    };
  }, [genres, defaultLanguage, homePageData]);

  const onTrendingMediaChange = () => {
    setTrendingMedia(TrendingStores.getTrendingMedia());
  };

  const onGenresChange = () => {
    setGenres(ConfigurationStores.getGenres());
  };

  const onDefaultLanguageChange = () => {
    setDefaultLanguage(ConfigurationStores.getDefaultLanguage());
  };

  const onHomePageData = () => {
    setHomePageData(HomePageStores.getHomePageData());
  };

  return (
    <>
      <PageBanner bannerData={trendingMedia[0]}></PageBanner>
      <CardSlider
        sliderData={trendingMedia}
        sliderTitle="Trending Now"
        sliderLink="/browse/all/trending/now"
      ></CardSlider>
      {homePageData?.length > 0 ? (
        homePageData.map((data, index) => {
          return (
            <CardSlider
              key={index}
              sliderData={data.sliderData}
              sliderTitle={data.name + " " + data.type}
              sliderLink={
                "/browse/" + data.type + "/" + data.name + "/" + data.id
              }
              sliderMediaType={data.type}
            ></CardSlider>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}

export default HomePage;
