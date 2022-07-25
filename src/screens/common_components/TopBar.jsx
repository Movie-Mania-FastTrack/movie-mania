import React from "react";

import Screen_Layout_Styles from "./ScreenLayout.module.css";
import { Avatar, Badge, Button, Space } from "antd";
import {
  HomeFilled,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";


function Topbar_Management({
  department,
  add,
  home,
  back,
  addLink,
}) {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
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
        <Link to={back} state={{ department: department }}>
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
            style={{fontSize:'45px', margin:'17px 0px 0px 17px'}}
          />
        </Link>

        <h1 className={Screen_Layout_Styles.h1}>{department}</h1>
        <br />
       
      </Space>

      <Space
        size={"large"}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {add === 1 ? (
          <Link to={addLink} state={{ department: department }}>
            <Badge>
              <Avatar shape="circle" size={50} icon={<PlusOutlined />} />
            </Badge>
          </Link>
        ) : null}


        <h2 className={Screen_Layout_Styles.date}>
          <span style={{ fontWeight: "bold" }}>TODAY : </span>
          {date}
        </h2>

      </Space>
    </div>
  );
}

export default Topbar_Management;