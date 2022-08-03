import React from "react";
import styles from "./BuyMovie.module.css";
import { Row, Col, Radio, Select,Button, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
function BuyMovie() {
  const movieCount=12;
    const payableAmount = 300.00;
  return (
    <>
      <p className={styles.h1}>Buying information</p>
      <hr />
      <center>
        <div className={styles.BuyingInfoContainer}>
          <Row gutter={[48, 48]}>
            <Col span={8}>
              <p>Movie Name :</p>
            </Col>
            <Col span={8}>
              <Select
                defaultValue="Doctor Strange 2020"
                style={{
                  width: "200px",
                }}
                onChange={null}
              >
                <Option value="Doctor Strange 2020">Doctor Strange 2020</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col span={8}>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusCircleOutlined />}
              />
            </Col>
            <Col span={8}>
              <p>Movie Count :</p>
            </Col>
            <Col span={8}>
              <p>{movieCount}</p>
            </Col>
            <Col span={8}></Col>
            <Col span={8}>
              <p>Payable Amount :</p>
            </Col>
            <Col span={8}>
              <p>Rs {payableAmount}</p>
            </Col>
            <Col span={8}></Col>

            <Col span={8}>
              <p>Collection Method :</p>
            </Col>
            <Col span={8}>
              <Radio style={{ color: "white" }}>To the drive</Radio>
            </Col>
            <Col span={8}>
              <Radio style={{ color: "white" }}>Pickup from the shop</Radio>
            </Col>
            <Col span={8}>
              <p>Drive Link :</p>
            </Col>
            <Col span={8}>
              <Input placeholder="Paste the Drive link here" />
            </Col>
            <Col span={8}>
              <p className={styles.ignoreDriveLink}>
                Ignore, if you chose pickup option
              </p>
            </Col>
          </Row>
        </div>
      </center>
      <p className={styles.h1}>Contact information</p>
      <hr />
    </>
  );
}

export default BuyMovie;
