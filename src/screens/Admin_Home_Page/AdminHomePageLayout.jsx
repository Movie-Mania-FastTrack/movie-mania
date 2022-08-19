import React, { useState } from "react";
import MovieRequest  from "./MovieRequest";
import {useNavigate} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";


function AdminHomePageLayout()
{
    const navigate = useNavigate();

    const[username , setUsername] = useState("")
    const[password , setPassword] = useState("")
    const[oldUsername , setOldusername] = useState("")
    const[oldPassword , setOldPassword] = useState("")

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

    function changeAdmin(){

        const admin = {username,password , oldUsername,oldPassword}
        movieManiaApi.post("/deleteMovie",{
            username,
            password,
            oldPassword,
            oldUsername,
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

    function addAdmin(){

        const admin = {username , password}

        movieManiaApi.post("/deleteMovie",{
            username,
            password,
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

    function onclickEdit(){
        //navigate to manage movie
        navigate("/manage_movie_home")
    }

    function onclickAdd(){
        //navigate to add movie
        navigate("/add_new_movie")
    }

    return(
        <>
        <div style={{height:'auto', width:'100vw', position: 'absolute', backgroundColor:'#040819'}}>
            <MovieRequest/>
        </div>

        </>
    );
}

export default AdminHomePageLayout;