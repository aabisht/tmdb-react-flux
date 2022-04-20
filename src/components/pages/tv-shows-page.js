import React, { useState, useEffect } from "react";
import {
  loadTVShowPageData,
  loadTVShowPageTrendingData,
} from "../../actions/tvShowAction";
import TvShowPageStores from "../../stores/tvShowStores";
import PageBanner from "../common/page-banner";
import CardSlider from "../common/card-slider";
import ConfigurationStores from "../../stores/configurationStores";

function TVShowsPage() {
  const [genres, setGenres] = useState(ConfigurationStores.getGenres());
  const [tvShowPageData, setTvShowPageData] = useState(
    TvShowPageStores.getTvShowData()
  );

  const [tvShowPageTrendingData, setTvShowPageTrendingData] = useState(
    TvShowPageStores.getTvShowTrendingData()
  );

  const onTvShowPageDataChange = () => {
    setTvShowPageData(TvShowPageStores.getTvShowData());
  };

  const onTvShowPageTrendingDataChange = () => {
    setTvShowPageTrendingData(TvShowPageStores.getTvShowTrendingData());
  };

  const onGenresChange = () => {
    setGenres(ConfigurationStores.getGenres());
  };

  useEffect(() => {
    TvShowPageStores.addChangeListener(onTvShowPageTrendingDataChange);
    if (tvShowPageTrendingData.length === 0) {
      loadTVShowPageTrendingData();
    }
    return () =>
      TvShowPageStores.removeChangeListner(onTvShowPageTrendingDataChange);
  }, [tvShowPageTrendingData.length]);

  useEffect(() => {
    ConfigurationStores.addChangeListener(onGenresChange);
    TvShowPageStores.addChangeListener(onTvShowPageDataChange);

    if (genres.length > 0 && tvShowPageData.length === 0) {
      let _genres = [];
      genres[1].data.genres.every((value) => {
        let _genre = {
          id: value.id,
          name: value.name,
          type: genres[1].type,
        };

        return _genres.push(_genre);
      });
      loadTVShowPageData(_genres);
    }

    return () => {
      ConfigurationStores.removeChangeListner(onGenresChange);
      TvShowPageStores.removeChangeListner(onTvShowPageDataChange);
    };
  }, [genres, tvShowPageData.length]);

  return (
    <>
      <PageBanner bannerData={tvShowPageTrendingData[0]}></PageBanner>
      <CardSlider
        sliderData={tvShowPageTrendingData}
        sliderTitle="Trending Now TV Shows"
        sliderLink="/browse/tv/trending/now"
      ></CardSlider>
      {tvShowPageData?.length > 0 ? (
        tvShowPageData.map((data, index) => {
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

export default TVShowsPage;
