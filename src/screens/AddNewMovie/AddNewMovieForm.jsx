import React from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Switch,
  Upload,
  Col
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import formStyles from "./AddNewMovie.module.css";
import "./AddNewMovie.css";
const { Dragger } = Upload;
const { TextArea } = Input;
function AddNewMovieForm() {
  const tailLayout = {
  wrapperCol: { offset: 13, span: 16 },
};
  return (
    <div>
      <h2 className={formStyles.heading}>Add New Movie</h2>
      <center>
        <Row gutter={[16, 16]}>
          <Form
            labelCol={{
              span: 0,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            className={formStyles.form}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Category">
                  {/* <p className={formStyles.p}>Category</p> */}
                  <Input className={formStyles.category} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Movie Name" className={formStyles.movieName}>
                  <Input className={formStyles.category} />
                </Form.Item>
              </Col>
            </Row>
            <Col span={24}>
              <Form.Item label="Story">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Form.Item label="Characters">
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Partner Image">
                  <Dragger style={{ width: "300px" }}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">Choose File</p>
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item label="Movie Image">
                  <Dragger style={{ width: "300px" }}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">Choose File</p>
                  </Dragger>
                </Form.Item>
              </Col>

              {/* <Col span={8}>
           
              </Col>
              <Col span={8}>
                <p>Movie Partner Image</p>
              </Col> */}

              <Form.Item label="Trailer Clip">
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">Choose File</p>
                </Dragger>
              </Form.Item>
            </Row>
            <Form.Item {...tailLayout}>
              <Space>
                <Button className={formStyles.button}>Add Movie</Button>
                <Button className={formStyles.button}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Row>
      </center>
    </div>
  );
}

export default AddNewMovieForm;
