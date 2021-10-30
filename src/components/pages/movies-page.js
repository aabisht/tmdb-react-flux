import React, { useState, useEffect } from "react";
import {
  loadMoviesPageTrendingData,
  loadMoviesPageData,
} from "../../actions/moviesAction";
import MoviesPageStores from "../../stores/moviesStores";
import PageBanner from "../common/page-banner";
import CardSlider from "../common/card-slider";
import ConfigurationStores from "../../stores/configurationStores";

function MoviesPage() {
  const [genres, setGenres] = useState(ConfigurationStores.getGenres());
  const [moviesPageData, setMoviesPageData] = useState(
    MoviesPageStores.getMoviesData()
  );

  const [moviesPageTrendingData, setMoviesPageTrendingData] = useState(
    MoviesPageStores.getMoviesTrendingData()
  );

  const onMoviesPageDataChange = () => {
    setMoviesPageData(MoviesPageStores.getMoviesData());
  };

  const onMoviesPageTrendingDataChange = () => {
    setMoviesPageTrendingData(MoviesPageStores.getMoviesTrendingData());
  };

  const onGenresChange = () => {
    setGenres(ConfigurationStores.getGenres());
  };

  useEffect(() => {
    MoviesPageStores.addChangeListener(onMoviesPageTrendingDataChange);
    if (moviesPageTrendingData.length === 0) loadMoviesPageTrendingData();
    return () =>
      MoviesPageStores.removeChangeListner(onMoviesPageTrendingDataChange);
  }, [moviesPageTrendingData.length]);

  useEffect(() => {
    ConfigurationStores.addChangeListener(onGenresChange);
    MoviesPageStores.addChangeListener(onMoviesPageDataChange);

    if (genres.length > 0 && moviesPageData.length === 0) {
      let _genres = [];
      genres[0].data.genres.every((value) => {
        let _genre = {
          id: value.id,
          name: value.name,
          type: genres[0].type,
        };

        return _genres.push(_genre);
      });
      loadMoviesPageData(_genres);
    }

    return () => {
      ConfigurationStores.removeChangeListner(onGenresChange);
      MoviesPageStores.removeChangeListner(onMoviesPageDataChange);
    };
  }, [genres, moviesPageData.length]);

  console.log(moviesPageData);
  return (
    <>
      <PageBanner bannerData={moviesPageTrendingData[0]}></PageBanner>
      <CardSlider
        sliderData={moviesPageTrendingData}
        sliderTitle="Trending Now Movies"
        sliderLink="/browse/movie/trending/now"
      ></CardSlider>
      {moviesPageData?.length > 0 ? (
        moviesPageData.map((data, index) => {
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

export default MoviesPage;
