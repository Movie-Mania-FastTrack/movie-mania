import React from "react";
import Screen_Layout_Styles from "./ScreenLayout.module.css";
import { Button, Space } from "antd";
import { HomeFilled, LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Topbar({ department, home, back }) {
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const size = "large";
  return (
    <>
      <div className={Screen_Layout_Styles.topleft}>
        <Space size="large">
          <Link to={back}>
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
      </div>

      <div className={Screen_Layout_Styles.topright}>
        <h2 className={Screen_Layout_Styles.date}>
          <span style={{ fontWeight: "bold" }}>TODAY : </span>
          {date}
        </h2>
      </div>
    </>
  );
}

export default Topbar;