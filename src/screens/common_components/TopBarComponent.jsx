import React from "react";
import Screen_Layout_Styles from "./ScreenLayout.module.css";
import { Button, Space } from "antd";
import { HomeFilled, LeftOutlined,PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Topbar({ department, home, back ,add}) {
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
              icon={<LeftOutlined />}
              size={size}
              style={{ background: "#FFF504", borderColor: "black" }}
            />
          </Link>

          {/* Home Icon */}
          <Link to={home}>
            <Button
              icon={<HomeFilled />}
              size={size}
              style={{
                fontSize: "45px",
                margin: "12px 0px 0px 17px",
                backgroundColor: "#FFF504",
                borderColor: "black",
              }}
            />
          </Link>

          <h1 className={Screen_Layout_Styles.h1}>{department}</h1>
          <br />
        </Space>
      </div>

      <div className={Screen_Layout_Styles.topright}>
        
        {/* Add Icon */}
        {add === 1 ? (
          <Link to="/add_new_movie">
            <Button
              icon={<PlusCircleOutlined />}
              size={size}
              style={{
                fontSize: "45px",
                margin: "17px 20px 0px 0px",
                backgroundColor: "#FFF504",
                borderColor: "black",
              }}
            />
          </Link>
        ) : null}
        <h2 className={Screen_Layout_Styles.date}>
          <span style={{ fontWeight: "bold" }}>TODAY : </span>
          {date}
        </h2>
      </div>
    </>
  );
}

export default Topbar;