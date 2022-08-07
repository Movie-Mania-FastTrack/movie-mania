import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";

function TopRatedMovieCard ()
{
    const [topMovies , setTopMovies] = useState([])

    useEffect(()=>{
        movieManiaApi.get("/getMovieTop",{

        })
        .then((res) => { 
            console.log("result - ",res.data)
            setTopMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });
          
        },[])
    return(
        <>
         <Link to='/single_movie_home'>
            <div>
            {topMovies.length!== 0 && topMovies.map((movie)=>(
                    <div style={{height:'160px', width:'140px',backgroundColor:'white', borderRadius:'15px'}}> 
                    <p>name - {movie.name}</p>
                    </div>
                ))}
            </div>
        </Link>
        </>
    );
}

export default TopRatedMovieCard;