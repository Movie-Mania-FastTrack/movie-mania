import React from "react";
import styles from "./BuyMovie.module.css";
import {Row, Col, Input, Select} from 'antd';

const { Option } = Select;
function BuyMovie()
{
    return(
        <>
        <div style={{height:'100%', width:'100%', position: 'fixed', backgroundColor:'#040819'}}>
            {/* Buying Information */}
            <div style={{height:'55%', width:'100%',position:'relative'}}>
                <h2 style={{textAlign:'left', color:'#E2F1FF', padding:'30px 0px 0px 20px', fontWeight:'650',fontSize:'22px'}}>Buying Information</h2>
                <hr />
                <br/>

        <Row className={styles.row}>
        {/* Movie Name */}
        <Col span={2}>
          <p className={styles.required} style={{color:'white'}}>Movie Name </p>
          </Col>
          <Col span={8}>
          <Select
            showSearch
            placeholder="Select movie"
            optionFilterProp="children"
            onChange={null}
            onSearch={null}
            style={{height:'120px', width:'300px', strokeColor:'#FFF504', opacity: '32%' , border:'2px'}}
          >
            <Option value="Doctor">Doctor Strange</Option>
            
          </Select>
        </Col>
        </Row>
        <Row>
        {/* Movie Count */}
        <Col span={8}>
          <p style={{color:'white'}}>Movie Count:</p>
    
        </Col>
  
        {/* Payable Amount */}
        <Col span={8}>
          <p  style={{color:'white'}}>Payable Amount:</p>
         
        </Col>

    

        </Row>

      

            </div>
            {/* Contact Information */}
            <div style={{height:'40%', width:'100%',position:'relative'}}>
                <h2 style={{textAlign:'left', color:'#E2F1FF', padding:'30px 0px 0px 20px', fontWeight:'650',fontSize:'22px'}}>Contact Information</h2>
                <hr />
            </div>
        </div>
        </>
    );
}

export default BuyMovie;