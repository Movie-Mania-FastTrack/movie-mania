import React from "react";
import {Row, Col, Card, Space} from 'antd';
import {HomeFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom';


import { useEffect } from "react";
import { useState } from "react";
import image from "../resources/images/doctorStrange.jpeg"
import {useNavigate} from 'react-router-dom';
import "./SinglePag.css";
import { hover } from "@testing-library/user-event/dist/hover";





function SingleMovieHome()
{

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

        function showMovie(){
            navigate("/cast_page")
        }
    return(
        <>
        <div style={{height:"47.5vw", width:"100vw", position: 'absolute', backgroundColor:'#00010B'}}>
        <div style={{height:"100%", width:"20%", position: 'absolute',left:"0", backgroundColor:'black'}}>
            
            <button style={{height:"5vw", width:"12vw", background:"yellow", opacity:'0.7',fontSize:'1.4vw', fontWeight:'780', position: 'absolute',left:"3vw",top:"20%", boxShadow:'0.1vw 0.1vw grey',  borderRadius:'0.4vw'}} className="trailerButton" onMouseEnter={triler}>Movie Trailer</button>
            <button style={{height:"5vw", width:"12vw", background:"yellow", opacity:'0.7',fontSize:'1.4vw', fontWeight:'780',  position: 'absolute',left:"3vw",top:"35%", boxShadow:'0.1vw 0.1vw grey',  borderRadius:'0.4vw'}} onClick={showMovie}>Movie</button>
            
            {!adminLogic&&<div>
                <button style={{height:"5vw", width:"12vw", background:"yellow", opacity:'0.7',fontSize:'1.4vw', fontWeight:'780',  position: 'absolute',left:"3vw",top:"50%", boxShadow:'0.1vw 0.1vw grey',  borderRadius:'0.4vw'}} onClick={slipUpload}>Slip Upload</button>
                <button style={{height:"5vw", width:"12vw",  background:"yellow", opacity:'0.7',fontSize:'1.4vw', fontWeight:'780', position: 'absolute',left:"3vw",top:"65%", boxShadow:'0.1vw 0.1vw grey',  borderRadius:'0.4vw'}} onClick={buy}>Buy</button>
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

</div>
        </div>
        </>
    );
}

export default SingleMovieHome;