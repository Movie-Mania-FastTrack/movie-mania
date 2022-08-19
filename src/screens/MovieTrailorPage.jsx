import React, { useState } from "react";
import { useEffect } from "react";

import JaggaJasoos from '../resources/videos/JaggaJasoos.mp4';


function MovieTrailorPage()
{

    const[movie , setMovie] = useState({})
    useEffect(()=>{
        const movie = JSON.parse( localStorage.getItem("singleMovie")) 
        setMovie(movie) 
        alert(movie.trailerLink)  
        },[])

    return(
        <>
        <div style={{height:'100%', width:'100%', position: 'fixed', backgroundColor:'#040819'}}>
            <div>
                <video loop autoPlay style={{height:'800px',width:'1000px', float:'center', marginLeft:'260px'}} controls>
                    <source
                    src={movie.trailerLink}
                    type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
          
    

        </div>
        </>
    );
}

export default MovieTrailorPage;