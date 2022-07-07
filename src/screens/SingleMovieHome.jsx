import React from "react";
import {Row, Col, Card} from 'antd';
import {HomeFilled} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import screenImg from "../resources/images/doctorStrange.jpeg";

function SingleMovieHome()
{
    return(
        <>
        <div style={{height:'100%', width:'100%', position:'fixed'}}>
            <img style={{height:'100%', width:'100%', position:'fixed'}} src={screenImg}></img>

            <Row>
                <Col>
                {/* Home Button */}
                <div 
                    style={{position:'fixed', height:'80px', width:'80px', 
                    borderRadius:'50%', backgroundColor:'#FBFAF6', opacity:'0.3', float:'left',
                    margin:'20px 0px 0px 20px'}}>
                        <HomeFilled style={{fontSize:'45px', margin:'17px 0px 0px 17px'}}/>
                </div>
                </Col>
               
               <Col>
                {/* Movie Name display position */}
                {/* <div 
                    style={{ height:'120px', width:'380px', 
                    backgroundColor:'#FBFAF6', opacity:'0.3', float:'right'}}>
                        <h2 style={{}}>Doctor Strange 2022</h2> 
                </div> */}
                  {/* Right Side Options */}
                <div>
                        <Row>
                            <Col>
                                <Link to='home'>
                                    <Card style={{height:'100px', width:'250px',backgroundColor:'white'}}>
                                        <h3>Watch Trailor</h3>
                                    </Card>
                                </Link> 
                            </Col>
                        </Row>
                        
                </div>

                </Col>
                  
            </Row>

          

        </div>
        </>
    );
}

export default SingleMovieHome;