import React from "react";

import JaggaJasoos from '../resources/videos/JaggaJasoos.mp4';


function MovieTrailorPage()
{
    return(
        <>
        <div style={{height:'100%', width:'100%', position: 'fixed', backgroundColor:'#040819'}}>
            <div>
                <video loop autoPlay style={{height:'800px',width:'1000px', float:'center', marginLeft:'260px'}} controls>
                    <source
                    src={JaggaJasoos}
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