import React from "react";
import MovieRequest from "./MovieRequest";
import Screen_Layout from "../common_components/ScreenLayout";
import { useState } from "react";
import movieManiaApi from "../../api/movieManiaApi";
import { useEffect } from "react";
import LoginErrorPage from "../LoginErrorPage";

function MovieRequestScreen() {

  const[valid,setValid]=useState(false)

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

  useEffect(()=>{
      if(!valid){
        console.log(valid)
        movieManiaApi.get("/getvalidity",{
          headers:{"header":releaseToken()}
      })
      .then((res) => { 
          console.log("latestId - ",res.data)
          if(res.data==="successful"){
              setValid(true)
            }
      })
      
      // Catch errors if any
      .catch((err) => { 
      console.log(err)
      });
      }
    },[])
  return (
    <>
    {valid?<div>
      {<MovieRequest></MovieRequest>}
    </div>:<div>
    {<LoginErrorPage></LoginErrorPage>}
      </div>}
    </>
  );
}

export default MovieRequestScreen;