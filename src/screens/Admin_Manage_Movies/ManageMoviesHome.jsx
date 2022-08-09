import React from 'react';
import Screen_Layout from "../common_components/ScreenLayout";
import ManageMovies from "./ManageMovies";

function ManageMoviesHome()
{
    return(  
        <Screen_Layout 
        department={'Administration'} 
        back={'/admin_home_page'}
        home={'/'}
        Component={<ManageMovies/>}
       
        />

    );

}

export default ManageMoviesHome;