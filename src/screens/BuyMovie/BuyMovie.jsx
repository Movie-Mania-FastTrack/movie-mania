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
          {/* Buying info */}
          <Row gutter={[48, 24]}>
            <Col span={8}>
              {/* Movie name selection */}
              <p className={styles.pName}>Movie Name :</p>
            </Col>
            <Col span={8}>
              <Select
                className={styles.p}
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
                className={styles.addButton}
                type="primary"
                shape="circle"
                icon={<PlusCircleOutlined />}
              />
            </Col>
            <Col span={8}>
              {/* Movie count */}
              <p className={styles.pName}>Movie Count :</p>
            </Col>
            <Col span={8}>
              <p className={styles.p}>{movieCount}</p>
            </Col>
            <Col span={8}></Col>
            <Col span={8}>
              <p className={styles.pName}>Payable Amount :</p>
            </Col>
            <Col span={8}>
              <p className={styles.p}>Rs {payableAmount}</p>
            </Col>
            <Col span={8}></Col>

            <Col span={8}>
              <p className={styles.pName}>Collection Method :</p>
            </Col>
            <Col span={8}>
              <Radio style={{ color: "white" }} className={styles.p}>
                To the drive
              </Radio>
            </Col>
            <Col span={8}>
              <Radio style={{ color: "white" }}>Pickup from the shop</Radio>
            </Col>
            <Col span={8}>
              <p className={styles.pName}>Drive Link :</p>
            </Col>
            <Col span={8}>
              <Input
                placeholder="Paste the Drive link here"
                className={styles.p}
              />
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
      <center>
        <div className={styles.BuyingInfoContainer}>
          <Row gutter={[48, 24]}>
            <Col span={8}>
              <p className={styles.pName}>Name :</p>
            </Col>
            <Col span={16}>
              <Input
                placeholder="Enter name"
                style={{ width: "300px", float: "left" }}
              />
            </Col>

            <Col span={8}>
              <p className={styles.pName}>Contact No :</p>
            </Col>
            <Col span={16}>
              <Input
                placeholder="Enter contact no "
                style={{ width: "300px", float: "left" }}
              />
            </Col>

            <Col span={8}>
              <p className={styles.pName}>Email Address :</p>
            </Col>
            <Col span={8}>
              <Input
                placeholder="Enter email address "
                style={{ width: "300px", float: "left" }}
              />
            </Col>

            <Col span={8}>
              <Button className={styles.button}>SUBMIT REQUEST</Button>
            </Col>
          </Row>
        </div>
      </center>
    </>
  );
}

export default BuyMovie;
