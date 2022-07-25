import React from "react";
import 'antd/dist/antd.css'; 
import Screen_Layout_Styles from './ScreenLayout.module.css';
import { Layout} from 'antd';
import Topbar from "./TopBarComponent";
import Topbar_Management from "./TopBar";
import Title from './Title'
import { useNavigate } from "react-router-dom";
const { Header, Content } = Layout;


function Screen_Layout({department,searchText,searchBar,image,Component,bell,add,topSearchBar,home,back,addLink}){
    const current = new Date();
    const navigate = useNavigate();


    const size="large";
    return(
            <Layout className={Screen_Layout_Styles.screen}>
                
                <Layout>
                    <Header className={Screen_Layout_Styles.header}>
                        {department==='Management' || department==='Administration'?<Topbar_Management department={department} img={image} bell={bell} add={add} topSearchBar={topSearchBar} home={home} back={back} addLink={addLink}/>
                        :<Topbar department={department} home={home} back={back}/>}
                      
                    </Header>
                    <Content className={Screen_Layout_Styles.content}>
                            <div className={Screen_Layout_Styles.subcontent}>
                                {searchBar===1 ?<Title Text={searchText}/>:null }
                                <div>
                                    {Component}
                                </div>
                            
                            </div>
                    </Content>
                    
                 </Layout>
            </Layout>
    );
}

export default Screen_Layout;