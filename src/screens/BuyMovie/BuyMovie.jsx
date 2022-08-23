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
    const[movies , setMovies] = useState([])
    const[selectedMovies , setSelectedMovies] = useState([])
    const[requestCount , setRequestCount] = useState(0)
    const[selectPrice , SetSelectedPrice] = useState(0)
    const[movieName , setMovieName] = useState("")

    function addMultipleMovies(){
      const request = {customerName,customerEmail,contact,driverLink,payableStatus:"payable"}
      localStorage.setItem("request",JSON.stringify(request))
      localStorage.setItem("movies",JSON.stringify(movies))
      console.log(localStorage.getItem("movies"))
      navigate("/multiple_movie_select")
    }

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
      
      if(customerEmail!="" && customerName !="" && driverLink != "" && contact!=""){
        const request = {customerName,customerEmail,contact,driverLink,payableStatus:"payable"}
        const requestDto = {request:request,movies}
        console.log("movies",requestDto)
        movieManiaApi.post("/addRequest",{
          customerName,
          customerEmail,
          contact,
          driverLink,
          payableStatus:"payable",
          movies
        })
        .then((res) => { 
          alert(res.data)
          if(res.data=="error"){
            navigate("/movie_trailor_page")
          }
          else{
            navigate("/slip_upload_page");
          }
      })
      // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
      }
      else{
        alert("please Fill The form")
      }
        
    }

    function addNotPayableRequest(){
      if(customerEmail!="" && customerName !="" && contact!=""){
        const request = {customerName,customerEmail,contact,driverLink,payableStatus:"payable"}
        const requestDto = {request:request,movies}
        console.log("movies",requestDto)
        movieManiaApi.post("/addRequest",{
          customerName,
          customerEmail,
          contact,
          payableStatus:"notPayable",
          driverLink,
          movies
        })
        .then((res) => { 
          alert("your codes are")
          alert(res.data)
          for(let i=0;i<res.data.length; i++){
            alert(res.data[i])
          }
          if(res.data==[]){
            navigate("/movie_trailor_page")
          }
          else{
            navigate("/slip_upload_page");
          }
      })
      // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
      }
      else{
        alert("please Fill The form")
      }

  
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

    function veiwMovie(id){
      alert(id)
      for(let i=0; i<selectedMovies.length ; i++){
        if(selectedMovies[i].movieId==id){
          setRequestCount(selectedMovies[i].rate)
            SetSelectedPrice(selectedMovies[i].price)
        }
      }
    }

    function onclickCheck(){
      alert("hee")
    }

    useEffect(()=>{
        if(localStorage.getItem("request")!=null){
          const reques = JSON.parse(localStorage.getItem("request"))
          console.log(reques)
          setContact(reques.contact)
          setCustomerEmail(reques.customerEmail)
          setCustomerName(reques.customerName)
          setDriverLink(reques.driverLink)
          alert("hello")
          const moviesOld = JSON.parse(localStorage.getItem("movies"))
          console.log("moviesOld",moviesOld)
        movieManiaApi.post("/getMoviesByID",
          moviesOld
        )
          .then((res) => { 
            console.log(res.data)
            setSelectedMovies(res.data)
            setRequestCount(res.data[0].rate)
            SetSelectedPrice(res.data[0].price)
        })
    
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });
          setMovies(moviesOld)

        }
        else{
          const movie = JSON.parse( localStorage.getItem("singleMovie"))  
          setMovieId(movie.movieId)
          console.log("movies : ",movies)
          console.log("id : ",movie.movieId)
          movies.push(movie.movieId)
          console.log("movies : ",movies)
          selectedMovies.push(movie)
          setRequestCount(movie.rate)
          SetSelectedPrice(movie.price)
          setMovieName(movie.name)
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
                value={movieName}
onChange={(e)=>veiwMovie(e.target.value)}
                style={{
                  width: "200px",
                }}
               
              >
                {
                  selectedMovies.map((movie)=>(
                      <option value={movie.name}>{movie.name}</option>
                  ))
                }
                
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
              <p className={styles.p}>{requestCount}</p>
            </Col>
            <Col span={8}></Col>
            <Col span={8}>
              <p className={styles.pName}>Payable Amount :</p>
            </Col>
            <Col span={8}>
              <p className={styles.p}>Rs {selectPrice}</p>
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
                onChange={(e) => setDriverLink(e.target.value)}
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
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Col>

            <Col span={8}>
              <p className={styles.pName}>Contact No :</p>
            </Col>
            <Col span={16}>
              <Input
                placeholder="Enter contact no "
                style={{ width: "300px", float: "left" }}
                onChange={(e) => setContact(e.target.value)}
              />
            </Col>

            <Col span={8}>
              <p className={styles.pName}>Email Address :</p>
            </Col>
            <Col span={8}>
              <Input
                placeholder="Enter email address "
                style={{ width: "300px", float: "left" }}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </Col>


            <Col span={8}>
              <Button className={styles.button} onClick={addPayableRequest}>SUBMIT PAYABLE REQUEST</Button>
              <Button className={styles.button} onClick={addNotPayableRequest}>SUBMIT NOT PAYABLE REQUEST</Button> 
              <Button className={styles.button} onClick={addMultipleMovies}>Add More Movies</Button>
            </Col>
          </Row>
        </div>
      </center>
    </>
  );
}

export default BuyMovie;
