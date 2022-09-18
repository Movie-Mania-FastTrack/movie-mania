import React from "react";

import {Row, Col} from 'antd';

import releasePartner from '../resources/images/marvel.jpg';
import { useState } from "react";
import { useEffect } from "react";


function MovieCast()
{

    const[movie , setMovie] = useState({})
    const[characters , setCharacters] = useState([])
    const[wHeight , setWHeight] = useState(47)
    useEffect(()=>{
        const movie = JSON.parse( localStorage.getItem("singleMovie")) 
        setMovie(movie)
        setCharacters(movie.characters)
        if(movie.characters.length>3){
            var height = wHeight+(movie.characters.length-3)*7
            setWHeight(height)
        }   
        },[])

    const text ="Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.";
   // const characters ="Peter Derrol";

    return(
        <>
        <div style={{height:wHeight+"vw", width:'100vw', position:"absolute", backgroundColor:'#01020C'}}>
   
            
            <div >
            <div>
            <center><h2 style={{fontSize:"2.6vw",color:"yellow",opacity:'0.5', marginTop:'3vw'}}>Characters</h2></center> 
            </div>
            <div  >{characters.map((character,index)=>(
                <div >
                    <center><h3 style={{fontSize:"1.3vw",color:"#CDC8A1"}}>{character.character}</h3></center>
                </div>
            ))}</div>
                </div>

                <div >
               <center><h2 style={{fontSize:"2.6vw",color:"yellow",opacity:'0.5',marginTop:'2vw'}}>Story</h2></center> 
             <center><p style={{fontSize:"1.3vw",color:"#CDC8A1", maxWidth:'60vw', fontWeight:'600'}}>{movie.story}</p></center>   
                </div>
            
                <center><h2 style={{fontSize:"2vw",color:"yellow",opacity:'0.5',marginTop:'2vw'}}>Release Partner</h2></center>
                <img style={{position:"absolute",height:'12vw', width:'30vw',backgroundColor:'white', borderRadius:'0.3vw', marginLeft:'35vw'}} src={movie.launchingImageUrl}></img>
                <div >
                
                </div>
            
        </div>
        </>
    );
}

export default MovieCast;