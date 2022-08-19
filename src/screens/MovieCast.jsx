import React from "react";

import {Row, Col} from 'antd';

import releasePartner from '../resources/images/marvel.jpg';
import { useState } from "react";
import { useEffect } from "react";


function MovieCast()
{

    const[movie , setMovie] = useState({})
    useEffect(()=>{
        const movie = JSON.parse( localStorage.getItem("singleMovie")) 
        setMovie(movie)   
        },[])

    const text ="Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.";
    const characters ="Peter Derrol";

    return(
        <>
        <div style={{height:'100%', width:'100%', position: 'fixed', backgroundColor:'#040819'}}>
        {/* Story Part */}
            <div
            style={{height:'50%', width:'100%', position:'relative'}}
            >
                <h2 style={{textAlign:'center', color:'#E2F1FF', paddingTop:'30px', fontWeight:'650',fontSize:'24px'}}>Story</h2>
                <h2 style={{textAlign:'center', color:'#E2F1FF', margin:'20px 0px 0px 150px', fontWeight:'500',fontSize:'16px',width: '1200px',
                overflowWrap: 'break-word',wordWrap: 'break-word', wordBreak: 'break-word'}}>
                    {movie.story} <br/><br/>
                    {text} <br/><br/>
                    {text}
                </h2>
            </div>
        {/* Characters */}
            <div
            style={{height:'17%', width:'100%', position:'relative'}}
            >
                <h2 style={{textAlign:'center', color:'#E2F1FF', fontWeight:'650',fontSize:'24px'}}>Characters</h2>
                <Row style={{marginTop:'20px'}}>
                    <Col span={1}></Col>
                    <Col span={4} style={{color:'white', fontSize:'16px', fontWeight:'600'}}>{characters}</Col>
                    <Col span={4} style={{color:'white', fontSize:'16px', fontWeight:'600'}}>{characters}</Col>
                    <Col span={4}style={{color:'white', fontSize:'16px', fontWeight:'600'}}>{characters}</Col>
                    <Col span={4} style={{color:'white', fontSize:'16px', fontWeight:'600'}}>{characters}</Col>
                    <Col span={4}style={{color:'white', fontSize:'16px', fontWeight:'600'}}>{characters}</Col>
                    <Col span={3} style={{color:'white', fontSize:'16px', fontWeight:'600'}}>{characters}</Col>
                </Row>
            </div>
        {/* Released partner logo */}
            <div
            style={{height:'25%', width:'100%', position:'relative'}}
            >
            <h2 style={{textAlign:'center', color:'#E2F1FF', fontWeight:'650',fontSize:'24px'}}>Exclusive Release Partner</h2>
                <img src={movie.launchingImageUrl} style={{height:'100px', width:'300px', marginLeft:'600px'}}></img>
            </div>

        </div>
        </>
    );
}

export default MovieCast;