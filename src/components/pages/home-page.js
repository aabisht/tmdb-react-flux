import React, { useState, useEffect } from "react";
import PageBanner from "../common/page-banner";
import CardSlider from "../common/card-slider";
import TrendingStores from "../../stores/trendingStores";
import { loadMovieTVTrendingData } from "../../actions/trendingAction";
import apiConstants from "../../api/apiConstants";
import ConfigurationStores from "../../stores/configurationStores";
import * as configurationAction from "../../actions/configurationAction";

function HomePage() {
  const [trendingMedia, setTrendingMedia] = useState(
    TrendingStores.getTrendingMedia()
  );

  const [genres, setGenres] = useState(ConfigurationStores.getGenres());
  const [defaultLanguage, setDefaultLanguage] = useState(
    ConfigurationStores.getDefaultLanguage()
  );

  const [randomGenres, setRandomGenres] = useState();

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

    const _randomGenres = _genres.sort(() => Math.random() - 0.5);
    setRandomGenres(_randomGenres);

    return () => {
      ConfigurationStores.removeChangeListner(onGenresChange);
      ConfigurationStores.removeChangeListner(onDefaultLanguageChange);
    };
  }, [genres, defaultLanguage]);

  const onTrendingMediaChange = () => {
    setTrendingMedia(TrendingStores.getTrendingMedia());
  };

  const onGenresChange = () => {
    setGenres(ConfigurationStores.getGenres());
  };

  const onDefaultLanguageChange = () => {
    setDefaultLanguage(ConfigurationStores.getDefaultLanguage());
  };

  return (
    <>
      <PageBanner bannerData={trendingMedia[0]}></PageBanner>
      <CardSlider
        sliderData={trendingMedia}
        sliderTitle="Trending Now"
        sliderLink="/browse/all/trending/now"
      ></CardSlider>

      {randomGenres?.length > 0 ? (
        randomGenres.map((genre, index) => {
          return (
            <CardSlider
              key={index}
              sliderData={trendingMedia}
              sliderTitle={genre.name + " " + genre.type}
              sliderLink={
                "/browse/" + genre.type + "/" + genre.name + "/" + genre.id
              }
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
