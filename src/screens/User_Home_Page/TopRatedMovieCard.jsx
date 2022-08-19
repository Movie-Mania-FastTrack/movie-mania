import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';

function TopRatedMovieCard ()
{
    const navigate = useNavigate();
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

        function moveToSingle(movie){
            //console.log("movie",movie)
            localStorage.setItem("singleMovie",JSON.stringify(movie))
            navigate("/single_movie_home")

        }
            
    return(
        <>
         
            <div>
            {topMovies.length!== 0 && topMovies.map((movie)=>(
                    <div style={{height:'160px', width:'140px',backgroundColor:'white', borderRadius:'15px'}} onClick={()=>moveToSingle(movie)}> 
                    <p>name - {movie.name}</p>
                    </div>
                ))}
            </div>
       
        </>
    );
}

export default TopRatedMovieCard