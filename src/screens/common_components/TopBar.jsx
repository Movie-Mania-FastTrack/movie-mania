import React from "react";

import Screen_Layout_Styles from "./ScreenLayout.module.css";
import { Avatar, Badge, Button, Space } from "antd";
import {
  HomeFilled,
  LeftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";


function Topbar_Management({
  department,
  home,
  back,
}) {
  
  const size = "large";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Space
        size="large"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {/* <Link to={back} state={{ department: department }}>
          <Button
            type="primary"
            icon={<LeftOutlined />}
            size={size}
            style={{ background: "#ff7875", borderColor: "#ff7875" }}
          />
        </Link>

        <Link to={home}>
          <Button
            type="primary"
            icon={<HomeFilled />}
            size={size}
            style={{fontSize:'1vw', margin:'17px 0px 0px 17px'}}
          />
        </Link> */}

        <h1 className={Screen_Layout_Styles.h1}>{department}</h1>
        <br />
       
      </Space>

      
        


       
     
    </div>
  );
}

export default Topbar_Management;