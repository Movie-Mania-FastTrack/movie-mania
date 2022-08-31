import React from 'react';
import {Row,Col} from 'antd';

import MovieCard from './MovieCard';


function ManageMovies()
{
    return(  
        <div style={{height:'100%', width:'100%', position: 'absolute', backgroundColor:'#040819'}}>
            <Row>
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