import React from 'react';
import Screen_Layout from "../common_components/ScreenLayout";
import ManageMovies from "./ManageMovies";

function ManageMoviesHome()
{
    return(  
        <Screen_Layout 
        department={'Administration'} 
        add={1}
        back={'/admin_home_page'}
        home={'/'}
        Component={<ManageMovies/>}
       
        />

    );

}

export default ManageMoviesHome;