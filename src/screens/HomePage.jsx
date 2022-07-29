import React from "react";
import {Row, Col, Card, Space} from 'antd';
import {LeftCircleOutlined,RightCircleOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

import HomePageStyles from "./HomePage.module.css"


function SingleMovieHome()
{
    return(
        <>
        <div className={HomePageStyles.fullScreen}>
            {/* Nav Bar */}
            <div className={HomePageStyles.navBar}>
            </div>

            {/* Top Rated */}
            <div className={HomePageStyles.topRated}>
                <h2 style={{color:'#FFF504', textAlign:'left', paddingLeft:'20px', fontWeight:'600'}}>Top Rated</h2>
                    <LeftCircleOutlined style={{fontSize:'52px', color:'white', float:'left', padding:'40px 0px 0px 10px', opacity:'0.8'}}/>
                    <RightCircleOutlined style={{fontSize:'52px', color:'white', float:'right', padding:'40px 10px 0px 0px', opacity:'0.8'}}/>
            </div>
            {/* Recent Movies */}
            <div className={HomePageStyles.recentMovies}>
            <h2 style={{color:'#FFF504', textAlign:'left', paddingLeft:'20px', fontWeight:'600'}}>Recent</h2>

                {/* Footer */}
                <div className={HomePageStyles.footer}></div>
            </div>
        </div>
        </>
    );
}

export default SingleMovieHome;