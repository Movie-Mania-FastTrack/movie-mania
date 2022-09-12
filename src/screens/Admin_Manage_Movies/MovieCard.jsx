import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';
import "../Admin_Home_Page/Admin.css"

function MovieCard()
{
    const [recentMovies , setRecentMovies] = useState([])
    const [deleteLogic , setDeleteLogic] = useState(false)
    const[valid,setValid]=useState(false)
    const[slideIndex , setSlideIndex] = useState(0)
    const[slideMovies , setSlideMovies] = useState([])
    const testMovies = [{name:"m1"},{name:"m2"},{name:"m3"},{name:"m4"},{name:"m5"},{name:"m6"},{name:"m7"},{name:"m8"},{name:"m9"}]
    const width= 15;

    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

    const navigate = useNavigate();

    function releaseToken(){

      if(localStorage.getItem("user")!=null){
        const changedToken = localStorage.getItem("user")
      var token = ""
      var key = "qwerty"
      for(var i =0; i<changedToken.length-6; i++){
        token+=changedToken[i]
      }
    console.log(token)
    //setToken(token)
    return token
      }
    
      return ""
      
    
    }

    function checkValidity(){
      if(!valid){
        console.log(valid)
        movieManiaApi.get("/getvalidity",{
          headers:{"header":releaseToken()}
      })
      .then((res) => { 
          console.log("result - ",res.data)
          //console.log(res)
          if(res.data==="successful"){
            setValid(true)
          }
      })

    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
      }
    }
    
    useEffect(()=>{
        movieManiaApi.get("/getMovies",{

        })
        .then((res) => { 
            console.log("result - ",res.data)
            setRecentMovies(res.data)
            setMoviesSlide(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });

      localStorage.removeItem("movieId")
      
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
          setMoviesSlide(recentMovies)
      }

      function movePreviosSlide(){
          setMoviesSlide2(recentMovies)
      }

        function deleteMovie(id){
            if(deleteLogic){
              movieManiaApi.delete("/deleteMovie/"+id,{
                headers:{"header":releaseToken()}
            })
            .then((res) => { 
                console.log("result - ",res.data)
                alert(res.data)
                window.location.reload()
            })
      
          // Catch errors if any
          .catch((err) => { 
            console.log(err)
          });
            }
            else{
              setDeleteLogic(true)
            }
        }

        function editMovie(id){
            localStorage.setItem("movieId",id)
            //navigate to edit movie page
            navigate("/edit_movie")
        }

        function cancleDelete(){
          setDeleteLogic(false)
        }

    return(
        <>
        <div className="header">
          <h1 className="h1">ADMINISTRATION</h1>
          <h2 className="date">
          <span style={{ fontWeight: "bold" , fontSize:"1vw"}}>TODAY : </span>
          {date}
        </h2>
        </div>
        <div style={{height:"40vw", width:"100vw", position: 'absolute', backgroundColor:'#040819'}}>
            {recentMovies.length!== 0 && slideMovies.map((movie,index)=>(
                    <div>
                      <div style={{position:"absolute",height:'12vw', width:'10vw',backgroundColor:'white', borderRadius:'0.9vw',top:"0",left:width*index+2+"vw"}}> 
                      <p style={{fontSize:"1vw",color:"red"}}><span style={{color:"blue"}}>name</span> - <b>{movie.name}</b></p>
                    <img style={{position:"absolute",height:'70%', width:'100%',backgroundColor:'white', borderRadius:'0.9vw',top:"30%",left:"0vw"}} src={movie.imageUrl}></img>
                   
                    <div>
                       <button style={{position:'absolute',width:"5vw",top:"100%"}} onClick={()=>editMovie(movie.movieId)}>Edit</button>
                    <button style={{position:'absolute',width:"5vw",top:"100%",right:"0"}} onClick={()=>deleteMovie(movie.movieId)}>Delete</button>
                      {deleteLogic&&<div style={{top:"20vw"}}>
                        <button style={{position:'absolute',width:"5vw",top:"120%",left:"0",background:"red"}} onClick={()=>deleteMovie(movie.movieId)}>Confirm Delete</button>
                      <button style={{position:'absolute',width:"5vw",top:"120%",right:"0",background:"green"}} onClick={cancleDelete}>Cancle</button>
                        </div>}
                    </div>
                    </div>
                    
                    </div>
                    
                ))}
                <button style={{position:"absolute",right:"0",top:"-4vw"}} onClick={moveNextSlide}>Next</button>
                <button style={{position:"absolute",right:"6vw",top:"-4vw"}} onClick={movePreviosSlide}>Previos</button>
            </div>
        
        </>
    );
}

export default MovieCard;