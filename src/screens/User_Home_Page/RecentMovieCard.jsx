import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";

function RecentMovieCard (movieImage)
{
    const [recentMovies , setRecentMovies] = useState([])

    useEffect(()=>{
        movieManiaApi.get("/getMovies",{

        })
        .then((res) => { 
            console.log("result - ",res.data)
            setRecentMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });
          
        },[])
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