import React from "react";
import {Link} from 'react-router-dom';

function TopRatedMovieCard ()
{
    return(
        <>
         <Link to='/single_movie_home'>
            <div style={{height:'160px', width:'140px',backgroundColor:'white', borderRadius:'15px'}}>

            </div>
        </Link>
        </>
    );
}

export default TopRatedMovieCard;