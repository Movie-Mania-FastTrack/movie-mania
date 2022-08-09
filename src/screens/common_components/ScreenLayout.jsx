import React from "react";
import 'antd/dist/antd.css'; 
import Screen_Layout_Styles from './ScreenLayout.module.css';
import { Layout} from 'antd';
import Topbar from "./TopBarComponent";
import { useNavigate } from "react-router-dom";
const { Header, Content } = Layout;


function Screen_Layout({
  department,
  image,
  Component,
  home,
  back,
  add,
  manageMovies,
}) {
  const current = new Date();
  const navigate = useNavigate();

  const size = "large";
  return (
    <Layout className={Screen_Layout_Styles.screen}>
      <Layout>
        <Header className={Screen_Layout_Styles.header}>
          <Topbar
            department={department}
            home={home}
            back={back}
            add={add}
            manageMovies={manageMovies}
          />
        </Header>

        <Content className={Screen_Layout_Styles.content}>
          <div className={Screen_Layout_Styles.subcontent}>
            <div>{Component}</div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Screen_Layout;