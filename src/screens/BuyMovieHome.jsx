import React from 'react';
import BuyMovie from './BuyMovie';
import Screen_Layout from "./common_components/ScreenLayout";

function BuyMovieHome()
{
    return(  
        <Screen_Layout 
        department={'Buy'} 
        back={'/single_movie_home'}
        home={'/single_movie_home'}
        Component={<BuyMovie/>}
        />

    );

}

export default BuyMovieHome;