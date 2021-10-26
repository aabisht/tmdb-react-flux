import dispatcher from "../appDispatcher";
import * as discoverApi from "../api/discover";
import { forkJoin } from "rxjs";
import HomePageActionTypes from "./actionTypes/homePageActionTypes";

export const loadGenresHomeData = (genresList) => {
  const pArray = [];
  genresList.forEach((item) => {
    const filter = {
      with_genres: item.id,
    };
    pArray.push(discoverApi.getMediaDiscover(filter, item.type));
  });

  if (pArray.length > 0) {
    return forkJoin(pArray).subscribe((data) => {
      let homeGenreSliderData = [];
      data.forEach((item, index) => {
        homeGenreSliderData.push({
          id: genresList[index].id,
          name: genresList[index].name,
          type: genresList[index].type,
          sliderData: item.results,
        });
      });

      dispatcher.dispatch({
        actionType: HomePageActionTypes.LOAD_GENRES_DATA,
        homeGenreSliderData,
      });
    });
  } else {
    return dispatcher.dispatch({
      actionType: HomePageActionTypes.LOAD_GENRES_DATA,
      homeGenreSliderData: [],
    });
  }
};
