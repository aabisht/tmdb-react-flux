import dispatcher from "../appDispatcher";
import * as discoverApi from "../api/discover";
import HomePageActionTypes from "./actionTypes/homePageActionTypes";

export const loadGenresHomeData = (genresList, defaultLanguage = "en-US") => {
  const pArray = [];
  genresList.forEach((item) => {
    const filter = {
      with_genres: item.id,
    };
    pArray.push(
      discoverApi.getMediaDiscover(filter, item.type, defaultLanguage)
    );
  });

  return Promise.all(pArray).then((data) => {
    let homeGenreSliderData = [];
    data.forEach((item, index) => {
      homeGenreSliderData.push({
        id: genresList[index].id,
        name: genresList[index].name,
        type: genresList[index].type,
        sliderData: item.results,
        defaultLanguage,
      });
    });

    dispatcher.dispatch({
      actionType: HomePageActionTypes.LOAD_GENRES_DATA,
      homeGenreSliderData,
    });
  });
};
