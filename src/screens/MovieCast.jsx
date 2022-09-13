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
        <div style={{height:wHeight+"vw", width:'100vw', position:"absolute", backgroundColor:'#040819'}}>
            
            
            <div >
            <div ><h2 style={{fontSize:"3vw",color:"purple"}}>Characters :</h2></div>
            <div  >{characters.map((character,index)=>(
                <div >
                    <p style={{fontSize:"1.5vw",color:"yellow"}}>{character.character}</p>
                </div>
            ))}</div>
                </div>
                <div >
                <h2 style={{fontSize:"3vw",color:"purple"}}>Story : <p style={{fontSize:"2vw",color:"yellow"}}>{movie.story}</p></h2>
                </div>
                <h2 style={{fontSize:"3vw",color:"purple"}}>Release Partner</h2>
                <img style={{position:"absolute",height:'10vw', width:'10vw',backgroundColor:'white', borderRadius:'0.9vw',left:"0vw"}} src={movie.launchingImageUrl}></img>
                <div >
                
                </div>
            
        </div>
        </>
    );
}

export default MovieCast;