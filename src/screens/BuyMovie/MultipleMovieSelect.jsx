import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";

function MultipleMovieSelect(){


    const navigate = useNavigate();

    const[movieIds , setMovieIds] = useState([])
    const[movies , setMovies] = useState([])
    const[selectedMovies , setSelectedMovies] = useState([])
    const[slideIndex , setSlideIndex] = useState(0)
    const[slideMovies , setSlideMovies] = useState([])
    const testMovies = [{name:"m1"},{name:"m2"},{name:"m3"},{name:"m4"},{name:"m5"},{name:"m6"},{name:"m7"},{name:"m8"},{name:"m9"}]
    const[slideIndexSelected , setSlideIndexSelected] = useState(0)
    const[slideMoviesSelected , setSlideMoviesSelected] = useState([])
    const testMoviesSelected = [{name:"m1"},{name:"m2"},{name:"m3"},{name:"m4"},{name:"m5"},{name:"m6"},{name:"m7"},{name:"m8"},{name:"m9"}]
    
    const width= 15;

    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

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
  setMoviesSlide(testMovies)
  setMoviesSlideSelected(testMoviesSelected)
  //moveNextSlideSelected()
    },[])

    function setMoviesSlide(movies){
      if(slideIndex+6<movies.length){
          const slideMoviesCopy = []
          for(let i = slideIndex; i<slideIndex+6; i++){
              
              slideMoviesCopy.push(movies[i])
              console.log(movies[i])

          }
          setSlideMovies(slideMoviesCopy)
          setSlideIndex(slideIndex+6)
      }
      else{
         if(slideIndex<movies.length){
          const slideMoviesCopy = []
          for(let i = slideIndex; i<movies.length; i++){
              
              slideMoviesCopy.push(movies[i])

          }
          setSlideMovies(slideMoviesCopy)
          setSlideIndex(movies.length)
         }
      }
  }

  function setMoviesSlide2(movies){

      let index = slideIndex%6
    //  alert(index)
      if(index==0){
          if(slideIndex-6>0){
              const slideMoviesCopy = []
              for(let i = slideIndex-12; i<slideIndex-6; i++){
                  
                  slideMoviesCopy.push(movies[i])
                  console.log(movies[i])

              }
              setSlideMovies(slideMoviesCopy)
              setSlideIndex(slideIndex-6)
          }
          // else{
          //    if(slideIndex>0){
          //     const slideMoviesCopy = []
          //     for(let i = 0; i<slideIndex; i++){
                  
          //         slideMoviesCopy.push(movies[i])
                  

          //     }
          //     console.log(slideMoviesCopy)
          //     setSlideMovies(slideMoviesCopy)
          //     setSlideIndex(0)
          //    }
          // } 
      }
      else{
          if(movies.length>6){
          let start = index+6
          const slideMoviesCopy = []
              for(let i = slideIndex-start; i<slideIndex-index; i++){
                  
                  slideMoviesCopy.push(movies[i])
                  console.log(movies[i])

              }
              setSlideMovies(slideMoviesCopy)
              setSlideIndex(slideIndex-index)

          }
          
      }
  }

  function moveNextSlide(){
      setMoviesSlide(testMovies)
  }

  function movePreviosSlide(){
      setMoviesSlide2(testMovies)
  }


  ///slected///

  function setMoviesSlideSelected(movies){
    if(slideIndexSelected+6<movies.length){
        const slideMoviesCopy = []
        for(let i = slideIndexSelected; i<slideIndexSelected+6; i++){
            
            slideMoviesCopy.push(movies[i])
            console.log(movies[i])

        }
        setSlideMoviesSelected(slideMoviesCopy)
        setSlideIndexSelected(slideIndex+6)
    }
    else{
       if(slideIndexSelected<movies.length){
        const slideMoviesCopy = []
        for(let i = slideIndexSelected; i<movies.length; i++){
            
            slideMoviesCopy.push(movies[i])

        }
        setSlideMoviesSelected(slideMoviesCopy)
        setSlideIndexSelected(movies.length)
       }
    }
}

function setMoviesSlideSelected2(movies){

    let index = slideIndexSelected%6
  //  alert(index)
    if(index==0){
        if(slideIndexSelected-6>0){
            const slideMoviesCopy = []
            for(let i = slideIndexSelected-12; i<slideIndexSelected-6; i++){
                
                slideMoviesCopy.push(movies[i])
                console.log(movies[i])

            }
            setSlideMoviesSelected(slideMoviesCopy)
            setSlideIndexSelected(slideIndex-6)
        }
        // else{
        //    if(slideIndex>0){
        //     const slideMoviesCopy = []
        //     for(let i = 0; i<slideIndex; i++){
                
        //         slideMoviesCopy.push(movies[i])
                

        //     }
        //     console.log(slideMoviesCopy)
        //     setSlideMovies(slideMoviesCopy)
        //     setSlideIndex(0)
        //    }
        // } 
    }
    else{
        if(movies.length>6){
        let start = index+6
        const slideMoviesCopy = []
            for(let i = slideIndexSelected-start; i<slideIndexSelected-index; i++){
                
                slideMoviesCopy.push(movies[i])
                console.log(movies[i])

            }
            setSlideMoviesSelected(slideMoviesCopy)
            setSlideIndexSelected(slideIndex-index)

        }
        
    }
}

function moveNextSlideSelected(){
    setMoviesSlideSelected(testMoviesSelected)
}

function movePreviosSlideSelected(){
    setMoviesSlideSelected2(testMoviesSelected)
}

    return (
      <>
      <div className="header">
          <h1 className="h1">SELECT MORE MOVIES</h1>
          <h2 className="date">
          <span style={{ fontWeight: "bold" , fontSize:"1vw"}}>TODAY : </span>
          {date}
        </h2>
        </div>
        <div style={{height:"39.72vw", width:"100vw", position: 'absolute', backgroundColor:'#040819'}}>
        <div style={{height:"15vw", width:"100vw", position: 'absolute', backgroundColor:'#040819',top:"1vw"}}>
        <h2 style={{color:"white" , fontSize:"1vw"}}>Not Selected Movies</h2>
        {testMovies.length!== 0 && slideMovies.map((movie,index)=>(
                    <div style={{position:"absolute",height:'15vw', width:'10vw', borderRadius:'0.9vw',top:"0",left:width*index+2+"vw"}}>
                      <div style={{position:"absolute",height:'12vw', width:'10vw',backgroundColor:'white', borderRadius:'0.9vw',top:"10%",left:"0"}} > 
                    <p>name - {movie.name}</p>
                    <img src={movie.imageUrl}></img>
                    </div>
                    <button style={{position:"absolute",height:'2vw', width:'8vw',backgroundColor:'green', borderRadius:'0.9vw',top:"90%",left:"0"}}  onClick={()=>selectMovie(movie.movieId)}>select</button>
                    </div>
                    
                ))}
        </div>
        <div style={{height:"15vw", width:"100vw", position: 'absolute', backgroundColor:'#040819',top:"18vw"}}>
          <h2 style={{color:"white" , fontSize:"1vw"}}>Selected Movies</h2>
          {testMoviesSelected.length!== 0 && slideMoviesSelected.map((movie,index)=>(
                    <div style={{position:"absolute",height:'15vw', width:'10vw', borderRadius:'0.9vw',top:"0",left:width*index+2+"vw"}}>
                      <div style={{position:"absolute",height:'12vw', width:'10vw',backgroundColor:'white', borderRadius:'0.9vw',top:"10%",left:"0"}} > 
                    <p>name - {movie.name}</p>
                    <img src={movie.imageUrl}></img>
                    </div>
                    <button style={{position:"absolute",height:'2vw', width:'8vw',backgroundColor:'red', borderRadius:'0.9vw',top:"90%",left:"0"}} onClick={()=>removeMovie(movie.movieId)}>Remove</button>
                    </div>
                    
                ))}
          
        </div>
        <button style={{position:"absolute",height:'2vw', width:'8vw',backgroundColor:'yellow', borderRadius:'0.9vw',bottom:"0",left:"0"}}  onClick={submit}>Submit</button>
        </div>
      </>
      
    )
}

export default MultipleMovieSelect