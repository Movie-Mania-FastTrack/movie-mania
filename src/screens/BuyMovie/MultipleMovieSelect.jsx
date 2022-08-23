import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";

function MultipleMovieSelect(){


    const navigate = useNavigate();

    const[movieIds , setMovieIds] = useState([])
    const[movies , setMovies] = useState([])
    const[selectedMovies , setSelectedMovies] = useState([])

    function selectMovie(id){
        movieIds.push(id)
        movieManiaApi.post("/getMoviesWithoutSelect",
            movieIds
        )
        .then((res) => { 
            console.log("result - ",res.data)
            setMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });

      movieManiaApi.post("/getMoviesByID",
        movieIds
    )
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
        movieManiaApi.post("/getMoviesWithoutSelect",
            movieIdsAssis
        )
        .then((res) => { 
            console.log("result - ",res.data)
            setMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });

      movieManiaApi.post("/getMoviesByID",
        movieIdsAssis
    )
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
      console.log("sstore- " ,localStorage.getItem("movies"))
        const moviesOld = JSON.parse(localStorage.getItem("movies"))
        console.log(moviesOld)
        setMovieIds(moviesOld)
        movieManiaApi.post("/getMoviesWithoutSelect",
          moviesOld
        )
        .then((res) => { 
            console.log("result - without selected",res.data)
            setMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });

      movieManiaApi.post("/getMoviesByID",
        moviesOld
    )
    .then((res) => { 
        console.log("result - selected",res.data)
        setSelectedMovies(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
  //localStorage.removeItem("");
    },[])



    return (
      <>
      <div>
        <h2>Not Selected Movies</h2>
          {movies.map((movie)=>(<div>
            <p>{movie.name}</p>
            <button onClick={()=>selectMovie(movie.movieId)}>select</button>
          </div>))}
        </div>
        <div>
          <h2>Selected Movies</h2>
          {selectedMovies.map((movie)=>(<div>
            <p>{movie.name}</p>
            <button onClick={()=>removeMovie(movie.movieId)}>Remove</button>
          </div>))}
          <button onClick={submit}>Submit</button>
        </div></>
      
    )
}

export default MultipleMovieSelect