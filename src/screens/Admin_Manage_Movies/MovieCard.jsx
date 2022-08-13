import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';

function MovieCard()
{
    const [recentMovies , setRecentMovies] = useState([])

    const navigate = useNavigate();

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

        function editMovie(id){
            localStorage.setItem("selectMovie",id)
            navigate("/manage_movie_home")
        }

    return(
        <>
        <div style={{height:'200px',width:'180px', borderRadius:'8px', backgroundColor:'grey'}}></div>
        </>
    );
}

export default MovieCard;