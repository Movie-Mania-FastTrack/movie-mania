import React, {useState , useEffect} from "react";
import {Row, Col, Modal} from 'antd';
import {LeftCircleOutlined,RightCircleOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';


import TopRatedMovieCard from './TopRatedMovieCard';
import RecentMovieCard from './RecentMovieCard';

import HomePageStyles from "./HomePage.module.css";
import admin from '../../resources/images/admin.png';

function HomePage()
{
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const navigate = useNavigate();

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      navigate("/admin_home_page");
    };
  
   

    return(
        <>
        <div className={HomePageStyles.fullScreen}>
            {/* Nav Bar */}
            <div className={HomePageStyles.navBar}>
            </div>

            {/* Top Rated */}
            <div className={HomePageStyles.topRated}>
                <h2 style={{color:'#FFF504', textAlign:'left', paddingLeft:'20px', fontWeight:'600'}}>Top Rated</h2>
                <Row>
                    <Col span={2}>
                        <LeftCircleOutlined style={{fontSize:'52px', color:'white', float:'left', padding:'40px 0px 0px 10px', opacity:'0.8'}}/>
                    </Col>
                    <Col span={20}><TopRatedMovieCard/></Col>
                    <Col span={2}>
                        <RightCircleOutlined style={{fontSize:'52px', color:'white', float:'right', padding:'40px 10px 0px 0px', opacity:'0.8'}}/>
                    </Col>
                </Row>
            </div>
            {/* Recent Movies */}
            <div className={HomePageStyles.recentMovies}>
            <h2 style={{color:'#FFF504', textAlign:'left', paddingLeft:'20px', fontWeight:'600'}}>Recent</h2>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22} style={{width:'6'}}><RecentMovieCard/></Col>
                    <Col span={1}></Col>
                </Row>
                {/* Footer */}
                <div className={HomePageStyles.footer}>
                    <Row>
                        <Col span={10}><h4 style={{color:'white', opacity:'0.7', paddingLeft:'20px'}}>Website <br/> www.fasttrack.com</h4></Col>
                        <Col span={8}><h4 style={{color:'white', opacity:'0.7'}}>Fast Track Computers <br/> Negombo Rd, Narammala.</h4></Col>
                        <Col span={4}><h4 style={{color:'white', opacity:'0.7'}}>Contact   <br/> +94 77 158 1542 <br/> +94 77 158 1542</h4></Col>
                        <Col span={2}>
                         <button style={{height:'50px', width:'70px', opacity:'0.2', marginTop:'5px'}} onClick={showModal}><img src={admin} style={{height:'50px', width:'70px'}}></img></button>  
                         <Modal 
                         style={{height:'300px', width:'600px', borderRadius:'15px', backgroundColor:'wheat'}}
                         title="Basic Modal" visible={isModalVisible} onOk={handleOk} >
                            <div>
                                <p>Admin UserName: <input type='text'/></p>
                                <p>Admin Password: <input type='password'/></p>
                            </div>
                        </Modal>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        </>
    );
}

export default HomePage;