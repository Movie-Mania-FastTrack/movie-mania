import React from 'react';
import {Row,Col} from 'antd';

import MovieCard from './MovieCard';


function ManageMovies()
{
    return(  
        <div style={{height:'100%', width:'100%', position: 'absolute', backgroundColor:'#040819'}}>
            <Row>
                {/* Category Manage */}
                <Col style={{height:'800px', width:'23%',backgroundColor:'#5C5101',position:'relative', borderRadius:'10px'}}>
                    <div style={{margin:'20px 0px 0px 20px'}}>
                        <h2 style={{color:'white', textAlign:'center'}}>Categories </h2><br/>
                       <br/>
                        <h4 style={{color:'white', fontWeight:'600', textAlign:'center', paddingTop:'30px'}}>Category1</h4>
                    </div>
                </Col>

                {/* Space  */}
                <Col style={{height:'800px', width:'5%',position:'relative'}}></Col>

                 {/* Movies Manage */}
                <Col style={{height:'800px', width:'70%',position:'relative',backgroundColor:'#00081C', borderRadius:'10px'}}>
                    <div style={{margin:'20px 0px 0px 20px'}}>
                        <MovieCard/>
                    </div>
                </Col>
            </Row>
        </div>
    );

}

export default ManageMovies;