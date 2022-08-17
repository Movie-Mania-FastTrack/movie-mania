import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

function MultipleMovieSelect(){


    const navigate = useNavigate();

    const[movieIds , setMovieIds] = useState([])
    const[movies , setMovies] = useState([])
    const[selectedMovies , setSelectedMovies] = useState([])

    function selectMovie(id){
        movieIds.push(id)
        movieManiaApi.get("/getMoviesWithoutSelect",{
            movieIds
        })
        .then((res) => { 
            console.log("result - ",res.data)
            setMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });

      movieManiaApi.get("/getMoviesByID",{
        movieIds
    })
    .then((res) => { 
        console.log("result - ",res.data)
        setSelectedMovies(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
    }

    function removeMovie(id){
        const movieIdsAssis = []
        for(let i=0; movieIds[i]!=null; i++){
            if(movieIds[i]!=id){
                movieIdsAssis.push(movieIds)
            }
        }
        setMovieIds(movieIdsAssis)
        movieManiaApi.get("/getMoviesWithoutSelect",{
            movieIdsAssis
        })
        .then((res) => { 
            console.log("result - ",res.data)
            setMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });

      movieManiaApi.get("/getMoviesByID",{
        movieIdsAssis
    })
    .then((res) => { 
        console.log("result - ",res.data)
        setSelectedMovies(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
    }

    function submit(){
        localStorage.setItem("movies",JSON.stringify(movieIds))
        navigate("/buy_page")
    }

    useEffect(()=>{
        const moviesOld = (JSON.parse(localStorage.getItem("movies")))
        setMovieIds(moviesOld)
        movieManiaApi.get("/getMoviesWithoutSelect",{

        })
        .then((res) => { 
            console.log("result - ",res.data)
            setMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });

      movieManiaApi.get("/getMoviesByID",{
        movieIds
    })
    .then((res) => { 
        console.log("result - ",res.data)
        setSelectedMovies(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
    },[])

    return (
        <div></div>
    )
}

export default MultipleMovieSelect