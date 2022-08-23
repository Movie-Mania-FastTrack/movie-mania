import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';

function RecentMovieCard (movieImage)
{
    const [recentMovies , setRecentMovies] = useState([])

    const navigate = useNavigate();
    
    useEffect(()=>{
        localStorage.removeItem("singleMovie")
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

        
        function moveToSingle(movie){
            //console.log("movie",movie)
            localStorage.setItem("singleMovie",JSON.stringify(movie))
            navigate("/single_movie_home")

        }

    return(
        <>
       
       <div>
            {recentMovies.length!== 0 && recentMovies.map((movie)=>(
                    <div style={{height:'180px', width:'170px',backgroundColor:'white', borderRadius:'12px'}} onClick={()=>moveToSingle(movie)}> 
                    <p>name - {movie.name}</p>
                    <img src={movie.imageUrl}></img>
                    </div>
                ))}
            </div>
         
       
        </>
    );
}

export default RecentMovieCard;