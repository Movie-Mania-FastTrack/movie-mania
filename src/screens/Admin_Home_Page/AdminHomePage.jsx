import React from 'react';
import Screen_Layout from "../common_components/ScreenLayout";
import AdminHomePageLayout from "./AdminHomePageLayout";

function AdminHomePage()
{
    return(  
        <Screen_Layout 
        department={'Administration'} 
        back={0}
        home={'/'}
        Component={<AdminHomePageLayout/>}
        manageMovies={1}
        />

    );

}

export default AdminHomePage;