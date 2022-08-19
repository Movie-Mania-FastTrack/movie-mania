import React from 'react';
import MultipleMoviesSelect from './MultipleMovieSelect';
import Screen_Layout from "../common_components/ScreenLayout";

function BuyMovieHome()
{
    return (
      <Screen_Layout
        department={"Select Multiple Movies"}
        back={"/buy_page"}
        home={"/single_movie_home"}
        Component={<MultipleMoviesSelect />}
     
      />
    );

}

export default BuyMovieHome;