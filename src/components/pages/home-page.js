import React, { useState, useEffect } from "react";
import PageBanner from "../common/page-banner";
import CardSlider from "../common/card-slider";
import TrendingStores from "../../stores/trendingStores";
import { loadMovieTVTrendingData } from "../../actions/trendingAction";
import apiConstants from "../../api/apiConstants";
import ConfigurationStores from "../../stores/configurationStores";
import HomePageStores from "../../stores/homePageStore";
import { loadGenresHomeData } from "../../actions/homePageAction";

function HomePage() {
  window.scrollTo(0, 0);

  const [trendingMedia, setTrendingMedia] = useState(
      TrendingStores.getTrendingMedia()
    ),
    [genres, setGenres] = useState(ConfigurationStores.getGenres()),
    [homePageData, setHomePageData] = useState(
      HomePageStores.getHomePageData()
    ),
    [defaultLanguage, setDefaultLanguage] = useState(
      ConfigurationStores.getDefaultLanguage()
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
    HomePageStores.addChangeListener(onHomePageData);
    ConfigurationStores.addChangeListener(onDefaultLanguageChange);

    let _genres = [];
    genres.forEach((item) => {
      if (item.data) {
        item.data.genres.every((value) => {
          let _genre = {
            id: value.id,
            name: value.name,
            type: item.type,
          };

          return _genres.push(_genre);
        });
      }
    });

    if (
      homePageData.length === 0 ||
      homePageData[0]?.defaultLanguage !== defaultLanguage
    )
      loadGenresHomeData(_genres, defaultLanguage);

    return () => {
      ConfigurationStores.removeChangeListner(onGenresChange);
      HomePageStores.removeChangeListner(onHomePageData);
      ConfigurationStores.removeChangeListner(onDefaultLanguageChange);
    };
  }, [genres, homePageData, defaultLanguage]);

  const onTrendingMediaChange = () => {
    setTrendingMedia(TrendingStores.getTrendingMedia());
  };

  const onGenresChange = () => {
    setGenres(ConfigurationStores.getGenres());
  };

  const onHomePageData = () => {
    setHomePageData(HomePageStores.getHomePageData());
  };

  const onDefaultLanguageChange = () => {
    setDefaultLanguage(ConfigurationStores.getDefaultLanguage());
  };

  const getSilderTitle = (name, type) => {
    let show = type === apiConstants.MEDIA_TV ? " Show" : "";
    return name + " " + type + " " + show;
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
              sliderTitle={getSilderTitle(data.name, data.type)}
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
