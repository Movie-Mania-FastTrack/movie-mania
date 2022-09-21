import React from "react";
import {Row, Col, Card, Space} from 'antd';
import {HomeFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import styles from "./BuyMovie/BuyMovie.module.css";
import { useEffect } from "react";
import { useState } from "react";
import image from "../resources/images/doctorStrange.jpeg"
import {useNavigate} from 'react-router-dom';
import "./SinglePag.css";
import { hover } from "@testing-library/user-event/dist/hover";





function SingleMovieHome()
{


    const[film , setFilm] = useState({})
    const[characters , setCharacters] = useState([])
    const[wHeight , setWHeight] = useState(47)
    useEffect(()=>{
        const movie = JSON.parse( localStorage.getItem("singleMovie")) 
        setFilm(movie)
        setCharacters(movie.characters)
        if(movie.characters.length>3){
            var height = wHeight+(movie.characters.length-3)*7
            setWHeight(height)
        }   
        },[]) 
    const navigate = useNavigate();

    const[movie , setMovie] = useState({})
    const[TrailerLogic , setTrailerLogic] = useState(false)
    const[adminLogic , setAdminLogic] = useState(false)

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
        const movie = JSON.parse( localStorage.getItem("singleMovie")) 
        if(localStorage.getItem("admin")=="yes"){
            //should validate token
            setAdminLogic(true)
        }
        setMovie(movie)
          
        },[])

        function triler(){
            if(TrailerLogic){
                setTrailerLogic(false)
            }
            else{
                setTrailerLogic(true)
            }
        }

        function slipUpload(){
            navigate("/slip_upload_page")
        }

        function buy(){
            navigate("/buy_page")
        }

    return(
        <>
        <div style={{backgroundColor:'#01020C'}}>
        <div style={{height:"48vw", width:"100vw", position: 'absolute', backgroundColor:'#01020C'}}>
        <div style={{height:"100%", width:"20%", position: 'absolute',left:"0", backgroundColor:'black'}}>
            
            <button className={styles.optionBtn}  style={{height:"5vw", width:"12vw", background:"yellow",fontSize:'1.4vw', fontWeight:'780', position: 'absolute',left:"3vw",top:"20%", boxShadow:'0.1vw 0.1vw grey',  borderRadius:'0.4vw', cursor:'pointer'}} onMouseEnter={triler}>Movie Trailer</button>
            <a href="#movieCast"><button className={styles.optionBtn}  style={{height:"5vw", width:"12vw", background:"yellow",color:'black', fontSize:'1.4vw', fontWeight:'780',  position: 'absolute',left:"3vw",top:"35%", boxShadow:'0.1vw 0.1vw grey',  borderRadius:'0.4vw', cursor:'pointer'}} >Movie Cast</button></a>
            
            {!adminLogic&&<div>
                <button className={styles.optionBtn}  style={{height:"5vw", width:"12vw", background:"yellow", fontSize:'1.4vw', fontWeight:'780',  position: 'absolute',left:"3vw",top:"50%", boxShadow:'0.1vw 0.1vw grey',  borderRadius:'0.4vw', cursor:'pointer'}} onClick={slipUpload}>Slip Upload</button>
                <button className={styles.optionBtn}  style={{height:"5vw", width:"12vw",  background:"yellow", fontSize:'1.4vw', fontWeight:'780', position: 'absolute',left:"3vw",top:"65%", boxShadow:'0.1vw 0.1vw grey',  borderRadius:'0.4vw', cursor:'pointer'}} onClick={buy}>Buy</button>
                </div>}
</div>
<div style={{height:"100%", width:"75%", position: 'absolute', backgroundColor:"#00010B",left:"20%"}}>
    {!TrailerLogic?<div style={{height:"100%", width:"100%", position: 'absolute', backgroundColor:"#00010B"}}><img src={movie.imageUrl} style={{height:"100%", width:"100%", position: 'absolute', left:"0"}}></img></div>:<div>
    <div>
                <video loop autoPlay style={{position:"absolute",top:"13%",left:"10%",height:'80%',width:'90%', float:'center', marginRight:'15vw'}} controls>
                    <source
                    src={movie.trailerLink}
                    type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>}
        <div style={{height:'5vw', width:'100vw', backgroundColor:'#01020C'}}></div>

</div>

{/* Movie Cast */}
<div id='movieCast' style={{top:'48vw', width:'100vw', position:'absolute', backgroundColor:'#01020C'}}>
          {/* Header Part */}
          <div style={{boxShadow:'2px 5px white', height:'7vw', width:'100vw', backgroundColor:'#01020C'}}>
          <h1 className="h1" >Movie Cast</h1>
        
       
        </div>
        <div style={{height:wHeight+"vw", width:'100vw', position:"absolute", backgroundColor:'#01020C'}}>
   
            
            <div >
            <div>
            <center><h2 style={{fontSize:"2.6vw",color:"yellow",opacity:'0.8', marginTop:'3vw'}}>Characters</h2></center> 
            </div>
            <div  >{characters.map((character,index)=>(
                <div >
                    <center><h3 style={{fontSize:"1.3vw",color:"#CDC8A1"}}>{character.character}</h3></center>
                </div>
            ))}</div>
                </div>

                <div >
               <center><h2 style={{fontSize:"2.6vw",color:"yellow",opacity:'0.8',marginTop:'2vw'}}>Story</h2></center> 
             <center><p style={{fontSize:"1.3vw",color:"#CDC8A1", maxWidth:'60vw', fontWeight:'600'}}>{movie.story}</p></center>   
                </div>
            
                <center><h2 style={{fontSize:"2vw",color:"yellow",opacity:'0.8',marginTop:'2vw'}}>Release Partner</h2></center>
                <img style={{position:"absolute",height:'12vw', width:'30vw',backgroundColor:'white', borderRadius:'0.3vw', marginLeft:'35vw'}} src={movie.launchingImageUrl}></img>
                <div >
                
                </div>
            
        </div>
</div>


        </div>
        </div>
        </>
    );
}

export default SingleMovieHome;

// className="trailerButton" 