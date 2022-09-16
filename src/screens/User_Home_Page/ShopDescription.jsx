import React from "react";

import {Row, Col} from 'antd';
import logo from '../../resources/images/logo.jpg';


function ShopDescription()
{
    return(
        <>
          
                {/* Company Detail Content */}
                <div>
                <Row>

                  <div style={{height:'60vw', width:'100vw',backgroundColor:'#00010F'}}>
                    <hr style={{color:'white'}}/>
                   <center><img src={logo} style={{height:'15vw', width:'18vw', marginTop:'2vw'}}></img></center>   
                   <center><h4 style={{color:'white', fontSize:'1.5vw', paddingTop:'2vw'}}>Fast Track Computers</h4></center>
                   <center> <p style={{maxWidth:'85vw', color:'#E8E6E6', fontSize:'1.2vw'}}>
                    Most people today use computers either at work or at home. It is important that people have a quality resource for buying and servicing those computers. Eagle Computers will provide the West Hawaii community with just such a quality resource – a one-stop shop for IBM-compatible computers. Eagle Computers will offer the following products and services with excellent customer service in a friendly, professional, and pleasant environment
                    </p></center>

                    
                   <center><h4 style={{color:'white', fontSize:'1.4vw', paddingTop:'4vw'}}>Our Services</h4>
 
                    <ul style={{listStyle:'none', marginTop:'2.5vw', lineHeight:'3vw'}}>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> CCTV </li>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> Software Solutions </li>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> Hardware Solutions </li>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> Laptop Repair </li>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> CD/DVD Retailer </li>
                    </ul></center>
                  </div>

                </Row>
                </div>
        </>
    );
}

export default ShopDescription;