import React from "react";
import {Link} from 'react-router-dom';

function RecentMovieCard (movieImage)
{
    return(
        <>
        <Link to='/single_movie_home'>
            <div style={{height:'180px', width:'170px',backgroundColor:'white', borderRadius:'12px'}}>

            </div>
        </Link>
        </>
    );
}

export default RecentMovieCard;