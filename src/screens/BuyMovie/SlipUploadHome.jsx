import React from 'react';
import SlipUpload from './SlipUpload';
import Screen_Layout from "../common_components/ScreenLayout";

function BuyMovieHome()
{
    return(  
        <Screen_Layout 
        department={'Upload Payement Slip'} 
        back={'/buy_page'}
        home={'/'}
        Component={<SlipUpload/>}
        />

    );

}

export default BuyMovieHome;