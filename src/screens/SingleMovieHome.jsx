import React from "react";
import {Row, Col, Card, Space} from 'antd';
import {HomeFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import SingleHomeStyles from "./SingleMovieHome.module.css"


function SingleMovieHome()
{
    return(
        <>
    <div className={SingleHomeStyles.screenImg}>

            <Row>
                <Col>
                    {/* Home Button */}
                    <div 
                        style={{position:'absolute', height:'80px', width:'80px', 
                        borderRadius:'50%', backgroundColor:'#FBFAF6', opacity:'0.3', float:'left',
                        marginLeft:'20px'}}>
                            <HomeFilled style={{fontSize:'45px', margin:'17px 0px 0px 17px'}}/>
                    </div>
                </Col>
               
               <Col>
                    <Row>
                        {/* Movie Name display position */}
                        <h2 style={{textAlign:'right',color:'white',fontWeight:'bold', margin:'20px 50px 0px 0px'}}>Doctor Strange 2022</h2>     
                    </Row>
                          
                    
                         {/* Right Side Options */}
                    
                        <div style={{marginTop: '200px', height:'600px', width:'300px', float:'right'}}>
                            <Space direction='vertical'>
                        <Link to='movie_trailor_page'>
                            <Card style={{height:'60px', width:'200px',backgroundColor:'#FBFAF6',opacity:'0.4', borderRadius:'12px'}}> 
                                <h3 style={{textAlign:'center', color:'black', paddingTop:'10px', fontWeight:'bold'}}>Watch Trailor</h3>
                            </Card> 
                        </Link><br/>
                        <Link to='cast_page'>
                            <Card style={{height:'60px', width:'200px',backgroundColor:'#FBFAF6',opacity:'0.4', borderRadius:'12px'}}> 
                                <h3 style={{textAlign:'center',color:'black', paddingTop:'10px'}}>Story</h3>
                            </Card> 
                        </Link><br/>
                        <Link to='buy_page'>
                            <Card style={{height:'60px', width:'200px',backgroundColor:'#FBFAF6',opacity:'0.4', borderRadius:'12px'}}> 
                                <h3 style={{textAlign:'center', color:'black', paddingTop:'10px'}}>Buy</h3>
                            </Card> 
                        </Link>
                        </Space>
                    
                        </div>
               
                    

                </Col>

        
                  
            </Row>

            <Row style={{float:'bottom', position:'relative', marginTop:'550px'}}>
                <h3 style={{textAlign:'center', paddingLeft:'200px', color:'white'}}>
                    Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, 
                    to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse.
                    They seek help from Wanda the Scarlet Witch, Wong and others.
                </h3>
            </Row>

          

        </div>
        </>
    );
}

export default SingleMovieHome;