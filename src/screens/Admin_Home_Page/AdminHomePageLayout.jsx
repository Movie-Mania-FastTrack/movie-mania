import React, { useState } from "react";
import MovieRequest  from "./MovieRequest";
import {useNavigate} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";
import { useEffect } from "react";


function AdminHomePageLayout()
{
    const navigate = useNavigate();

    const[username , setUsername] = useState("")
    const[password , setPassword] = useState("")
    const[oldUsername , setOldusername] = useState("")
    const[oldPassword , setOldPassword] = useState("")
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

    function changeAdmin(){

        const admin = {username,password , oldUsername,oldPassword}
        alert(username)
        alert(password)
        movieManiaApi.put("/changeAdmin",{
            username,
            password,
            oldPassword,
            oldUsername,
            headers:{"header":releaseToken()}
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

        movieManiaApi.post("/addAdmin",{
            username,
            password,
            headers:{"header":releaseToken()}
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

    function onclickRequest(){
      //navigate to add movie
      navigate("/movie_requests")
  }

  useEffect(()=>{
   // alert(releaseToken())
    checkValidity()
  })

    return(
        <>
        <div style={{height:'auto', width:'100vw', position: 'absolute', backgroundColor:'#040819'}}>
            <button onClick={onclickAdd}>Add Movie</button>
            <button onClick={onclickEdit}>Manage Movie</button>
            <button onClick={onclickRequest}>Manage Requests</button>
            <label>Add Admin</label><br></br>
            <label>username</label><br></br>
            <input onChange={(e) => setUsername(e.target.value)}></input><br></br>
            <label>password</label><br></br>
            <input onChange={(e)=>setPassword(e.target.value)}></input><button onClick={addAdmin}>Add Admin</button><br></br>
            <label>Change Admin</label><br></br>
            <label>OldUsername</label><br></br>
            <input onChange={(e)=>setOldusername(e.target.value)}></input><br></br>
            <label>OldPassword</label><br></br>
            <input onChange={(e)=>setOldPassword(e.target.value)}></input><br></br>
            <label>Username</label><br></br>
            <input onChange={(e)=>setUsername(e.target.value)}></input><br></br>
            <label>Password</label><br></br>
            <input onChange={(e)=>setPassword(e.target.value)}></input><button onClick={changeAdmin}>Change Admin</button><br></br>

        </div>

        </>
    );
}

export default AdminHomePageLayout;