import React from "react";
import {Row, Col, Card, Space} from 'antd';
import {HomeFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import SingleHomeStyles from "./SingleMovieHome.module.css"


function SingleMovieHome()
{
    return(
        <>
    <div className={SingleHomeStyles.fullScreen}>

           {/* Left Content*/}

           
              <div className={SingleHomeStyles.leftContent} >

                {/* Home button */}
                  <Link to="/"> 
                    <div
                        style={{height:'80px', width:'80px', 
                        borderRadius:'50%', backgroundColor:'#38370e',
                        margin:'20px 20px 0px 0px'}}>
                            <HomeFilled style={{fontSize:'45px', margin:'17px 0px 0px 17px', color:'#c5bf1d'}}/>
                    </div>
                 </Link> 
                 
                <h3 style={{color:'#c5bf1d', fontSize:'18px', paddingTop:'3vw'}}>
                    Doctor Strange 2022
                </h3>
                       {/* Single movie Options */}
                    <div style={{paddingTop:'8vw'}}>
                            <Space direction='vertical'>
                                <Link to='/movie_trailor_page'>
                                    <Card className={SingleHomeStyles.cardHover} style={{height:'60px', width:'200px',backgroundColor:'#38370e', border:'none', borderRadius:'8px'}}> 
                                        <h3 style={{textAlign:'center', color:'#c5bf1d', fontWeight:'bold'}}>Watch Trailor</h3>
                                    </Card> 
                                </Link><br/>
                                <Link to='/cast_page'>
                                    <Card style={{height:'60px', width:'200px',backgroundColor:'#38370e', border:'none', borderRadius:'8px' }}> 
                                        <h3 style={{textAlign:'center', color:'#c5bf1d', fontWeight:'bold'}}>Story</h3>
                                    </Card> 
                                </Link><br/>
                                <Link to='/buy_page'>
                                    <Card style={{height:'60px', width:'200px',backgroundColor:'#38370e', border:'none', borderRadius:'8px' }}> 
                                        <h3 style={{textAlign:'center', color:'#c5bf1d', fontWeight:'bold'}}>Buy</h3>
                                    </Card> 
                                </Link>
                            </Space>
                        </div>
                    
                </div>



            {/* Right Content*/}
            <div className={SingleHomeStyles.rightContent}>

     
            
            </div>

   
        </div>
        </>
    );
}

export default SingleMovieHome;