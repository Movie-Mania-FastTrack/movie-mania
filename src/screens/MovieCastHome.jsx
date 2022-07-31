import React from 'react';
import Screen_Layout from "./common_components/ScreenLayout";
import MovieCast from "./MovieCast";

function MovieCastHome()
{
    return(  
        <Screen_Layout 
        department={'Cast'} 
        back={'/single_movie_home'}
        home={'/single_movie_home'}
        Component={<MovieCast/>}
        />

    );

}

export default MovieCastHome;