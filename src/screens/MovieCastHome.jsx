import React from 'react';
import Screen_Layout from "./common_components/ScreenLayout";
import MovieCast from "./MovieCast";

function Customer_Home()
{
    return(  
        <Screen_Layout 
        department={''} 
        searchBar={0} 
        back={'/single_movie_home'}
        home={'/single_movie_home'}
        Component={<MovieCast/>}
        />

    );

}

export default Customer_Home;