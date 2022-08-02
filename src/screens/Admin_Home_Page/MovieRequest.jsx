import React from "react";
import {Row, Col, Space} from 'antd';


function MovieRequest(requestID)
{
    return(
        <>
        <div style={{height:'auto', width:'100%', position:'absolute', backgroundColor:'#171723', marginTop:'30px'}}>
           
                
                  
                        <Row>
                            <Col span={16}>
                                <h3 style={{paddingLeft:'20px',color:'#FFF504'}}>Request Number: </h3>
                            </Col>
                            <Col span={4}>
                                <h3 style={{color:'white'}}>Request Completion </h3>
                            </Col>
                            <Col span={4}><button style={{backgroundColor:'#FFF504', borderRadius:'20px'}}> Complete </button></Col>
                        </Row><br/><br/>
                        <Row>
                            <Col span={8}>
                                <h3 style={{paddingLeft:'20px',color:'white'}}>Customer Name </h3>
                            </Col>
                            <Col span={8}>
                                <h3 style={{paddingLeft:'20px',color:'white'}}>Contact </h3>
                            </Col>
                            <Col span={8}>
                                <h3 style={{paddingLeft:'20px',color:'white'}}>Email </h3>
                            </Col>
                        </Row><br/>
                        <hr/>
                        <br/>
                        <Row>
                            <Col span={6} ><h3 style={{paddingLeft:'20px',color:'white'}}>Category </h3></Col>
                            <Col span={6} ><h3 style={{color:'white'}}>Movie ID </h3></Col>
                            <Col span={6} ><h3 style={{color:'white'}}>Movie Name </h3></Col>
                            <Col span={6} ><h3 style={{color:'white'}}>Method </h3></Col>
                        </Row><br/><br/>
                        <Row><h3 style={{paddingLeft:'20px',color:'white'}}>Drive Link</h3></Row>
                  
            
          
        </div>
        </>
    );
}

export default MovieRequest;