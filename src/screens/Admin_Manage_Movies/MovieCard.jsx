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
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });

      localStorage.removeItem("movieId")
          
        },[])

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
        {recentMovies.length!=0&&recentMovies.map((movie)=>(
                    <div>
                      <div style={{height:'15vw',width:'12vw', borderRadius:'8px', backgroundColor:'grey'}}> 
                    <p>name - {movie.name}</p>
                    
                    </div>
                   
                    <div>
                       <button style={{width:"6vw"}} onClick={()=>editMovie(movie.movieId)}>Edit</button>
                    <button style={{width:"6vw"}} onClick={()=>deleteMovie(movie.movieId)}>Delete</button>
                      {deleteLogic&&<div>
                        <button style={{width:"6vw"}} onClick={()=>deleteMovie(movie.movieId)}>Confirm Delete</button>
                      <button style={{width:"6vw"}} onClick={cancleDelete}>Cancle</button>
                        </div>}
                    </div>
                    </div>
                ))}
        
        </>
    );
}

export default MovieCard;