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
                    <div
                        style={{position:'fixed', height:'80px', width:'80px', 
                        borderRadius:'50%', backgroundColor:'#FBFAF6', opacity:'0.3',
                        margin:'20px 20px 0px 0px'}}>
                            <HomeFilled style={{fontSize:'45px', margin:'17px 0px 0px 17px'}}/>
                    </div>

                       {/* Single movie Options */}
                    <div style={{paddingTop:'180px', position:'fixed'}}>
                            <Space direction='vertical'>
                                <Link to='/movie_trailor_page'>
                                    <Card style={{height:'60px', width:'200px',backgroundColor:'#FBFAF6',opacity:'0.4', borderRadius:'12px'}}> 
                                        <h3 style={{textAlign:'center', color:'black', paddingTop:'10px', fontWeight:'bold'}}>Watch Trailor</h3>
                                    </Card> 
                                </Link><br/>
                                <Link to='/cast_page'>
                                    <Card style={{height:'60px', width:'200px',backgroundColor:'#FBFAF6',opacity:'0.4', borderRadius:'12px'}}> 
                                        <h3 style={{textAlign:'center',color:'black', paddingTop:'10px'}}>Story</h3>
                                    </Card> 
                                </Link><br/>
                                <Link to='/buy_page'>
                                    <Card style={{height:'60px', width:'200px',backgroundColor:'#FBFAF6',opacity:'0.4', borderRadius:'12px'}}> 
                                        <h3 style={{textAlign:'center', color:'black', paddingTop:'10px'}}>Buy</h3>
                                    </Card> 
                                </Link>
                            </Space>
                        </div>
                    
                </div>



            {/* Right Content*/}
            <div className={SingleHomeStyles.rightContent}>
    

                <h3 style={{textAlign:'center',color:'white', fontSize:'28px'}}>
                    Doctor Strange 2022
                </h3>
     
            
            </div>

   
        </div>
        </>
    );
}

export default SingleMovieHome;