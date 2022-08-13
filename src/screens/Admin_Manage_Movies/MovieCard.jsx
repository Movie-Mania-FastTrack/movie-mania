import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';

function MovieCard()
{
    const [recentMovies , setRecentMovies] = useState([])

    const navigate = useNavigate();

    function releaseToken(changedToken){

        var token = ""
        var key = "qwerty"
        for(var i =0; i<changedToken.length-6; i++){
          token+=changedToken[i]
        }
      console.log(token)
      //setToken(token)
      return token
  
      }

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

        function deleteMovie(id){
            movieManiaApi.get("/deleteMovie"+id,{
                headers:{"header":releaseToken(localStorage.getItem("user"))}
            })
            .then((res) => { 
                console.log("result - ",res.data)
                alert(res.data)
            })
      
          // Catch errors if any
          .catch((err) => { 
            console.log(err)
          });
        }

        function editMovie(id){
            localStorage.setItem("movieId",id)
            //navigate to edit movie page
        }

    return(
        <>
        <div style={{height:'200px',width:'180px', borderRadius:'8px', backgroundColor:'grey'}}></div>
        </>
    );
}

export default MovieCard;