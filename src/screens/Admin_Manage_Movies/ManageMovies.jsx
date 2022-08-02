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
                        <h2 style={{color:'white', fontWeight:'600', textAlign:'center'}}>Add Movie Category</h2>
                        <br/><br/>
                        <h3 style={{color:'white'}}>Category Name: </h3><br/>
                        <input type='text' style={{height:'50px', width:'280px', borderColor:'#FFF504', borderRadius:'10px', backgroundColor:'transparent'}}/>
                        <button style={{height:'40px',width:'90px',backgroundColor:'#FFF504', float:'right', borderRadius:'10px', margin:'10px 20px 0px 0px'}}>ADD</button>
                        <h2 style={{color:'white', fontWeight:'600', textAlign:'center', paddingTop:'100px'}}>Category List</h2>
                    </div>
                </Col>

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