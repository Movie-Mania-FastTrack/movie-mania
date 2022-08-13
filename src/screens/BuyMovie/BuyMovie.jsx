import React, { useEffect, useState } from "react";
import styles from "./BuyMovie.module.css";
import { Row, Col, Radio, Select,Button, Input } from "antd";
import {Link} from 'react-router-dom';
import { PlusCircleOutlined } from "@ant-design/icons";
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';

const { Option } = Select;
function BuyMovie() {

  const navigate = useNavigate();
  
  const movieCount=12;
    const payableAmount = 300.00;
    const[code , setCode] = useState("")
    const[requst , setRequest] = useState({})
    const[customerName , setCustomerName] = useState("")
    const[customerEmail , setCustomerEmail] = useState("")
    const[contact , setContact] = useState("")
    const[driverLink , setDriverLink] = useState("")
    const[logicPay , setLogicPay] = useState(false)
    const[movie , setMovie] = useState({})
    const[movieId , setMovieId] = useState(0)

    function getRequestByCode(){
      if(code!=""){
        movieManiaApi.get("/getRequest"+code)
      .then((res) => { 
        setRequest(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
      }
      else{
        alert("enter code first please")
      }
    }

    function addPayableRequest(){
      
      const reques = {customerName,customerEmail,contact,driverLink,payableStatus:"payable"}
      movieManiaApi.post("/addRequest"+movieId)
      .then((res) => { 
        alert(res.data)
        if(res.data=="added"){
          navigate("/slip_upload_page");
        }
        else{
          navigate("/movie_trailor_page")
        }
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
    }

    function addNotPayableRequest(){
      const reques = {customerName,customerEmail,contact,driverLink}
      movieManiaApi.post("/addRequest"+movieId)
      .then((res) => { 
        alert(res.data)
        if(res.data=="added"){
          navigate("/slip_upload_page");
        }
        else{
          navigate("/movie_trailor_page")
        }
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
    }

    function cancleRequest(){

      if(code!=""){
        movieManiaApi.get("/cancelRequest"+code)
      .then((res) => { 
        alert(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
      }
      else{
        alert("enter code first please")
      }

    }

    useEffect(()=>{
      if(localStorage.getItem("pay")==="true"){
        setLogicPay(true)
      }
      else{
        var movieId = localStorage.getItem("movie")
        var movieIId = parseInt(movieId)
        setMovieId(movieIId)
        movieManiaApi.get("/getRequest"+movieIId)
        .then((res) => { 
          setMovie(res.data)
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
      }
      },[])
  return (
    <>
      <p className={styles.h1}>Buying information</p>
      <hr />
      <Link to='/slip_upload_page'><h3>Already Requested ?</h3></Link>
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
