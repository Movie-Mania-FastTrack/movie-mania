import React, { useState } from "react";
import MovieRequest  from "./MovieRequest";
import {useNavigate} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";
import { useEffect } from "react";
import "./Admin.css"


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
    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

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
        <div className="header">
          <h1 className="h1">ADMINISTRATION</h1>
          <h2 className="date">
          <span style={{ fontWeight: "bold" , fontSize:"1vw"}}>TODAY : </span>
          {date}
        </h2>
        </div>
        <div style={{height:'40vw', width:"100vw", position: 'absolute', backgroundColor:'#040819'}}>
            <button style={{height:'5%', width:"10%", position: 'absolute',left:"0",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={onclickAdd}>Add Movie</button>
            <button style={{height:'5%', width:"10%", position: 'absolute',left:"10%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={onclickEdit}>Manage Movie</button>
            <button style={{height:'5%', width:"10%", position: 'absolute',left:"20%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={onclickRequest}>Manage Requests</button>
            <label style={{ color:"white",position: 'absolute',left:"0",top:"7%",fontSize:"1vw"}}>Add Admin</label><br></br>
            <label style={{ color:"white",position: 'absolute',left:"0",top:"10%",fontSize:"1vw"}}>username</label><br></br>
            <input onChange={(e) => setUsername(e.target.value)}  placeholder="username" style={{height:'5%',background:"white", width:"15%", color:"white",position: 'absolute',left:"0",top:"15%",fontSize:"1vw"}}></input><br></br>
            <label style={{ color:"white",position: 'absolute',left:"0",top:"20%",fontSize:"1vw"}}>password</label><br></br>
            <input  style={{height:'5%',background:"white", width:"15%", color:"black",position: 'absolute',left:"0",top:"25%",fontSize:"1vw"}} onChange={(e)=>setPassword(e.target.value)} placeholder="password"></input><button style={{height:'5%', cursor:"pointer", width:"10%", position: 'absolute',left:"18%",top:"25%",fontSize:"1vw"}} onClick={addAdmin}>Add Admin</button><br></br>
            <label style={{ color:"white",position: 'absolute',left:"0",top:"32%",fontSize:"1vw"}} >Change Admin</label><br></br>
            <label style={{ color:"white",position: 'absolute',left:"0",top:"35%",fontSize:"1vw"}}>OldUsername</label><br></br>
            <input placeholder="Oldusername" style={{height:'5%',background:"white", width:"15%", color:"black",position: 'absolute',left:"0",top:"40%",fontSize:"1vw"}} onChange={(e)=>setOldusername(e.target.value)}></input><br></br>
            <label style={{ color:"white",position: 'absolute',left:"0",top:"45%",fontSize:"1vw"}}>OldPassword</label><br></br>
            <input placeholder="Oldpassword" style={{height:'5%',background:"white", width:"15%", color:"black",position: 'absolute',left:"0",top:"50%",fontSize:"1vw"}} onChange={(e)=>setOldPassword(e.target.value)}></input><br></br>
            <label style={{ color:"white",position: 'absolute',left:"0",top:"55%",fontSize:"1vw"}}>NewUsername</label><br></br>
            <input placeholder="Newusername" style={{height:'5%',background:"white", width:"15%", color:"black",position: 'absolute',left:"0",top:"60%",fontSize:"1vw"}} onChange={(e)=>setUsername(e.target.value)}></input><br></br>
            <label style={{ color:"white",position: 'absolute',left:"0",top:"65%",fontSize:"1vw"}}>NewPassword</label><br></br>
            <input placeholder="Newpassword" style={{height:'5%',background:"white", width:"15%", color:"black",position: 'absolute',left:"0",top:"70%",fontSize:"1vw"}}s onChange={(e)=>setPassword(e.target.value)}></input><button style={{height:'5%', width:"10%", cursor:"pointer" ,position: 'absolute',left:"18%",top:"70%",fontSize:"1vw"}} onClick={changeAdmin}>Change Admin</button><br></br>

        </div>

        </>
    );
}

export default AdminHomePageLayout;