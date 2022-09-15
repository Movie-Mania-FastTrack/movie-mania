import React, {useState , useEffect} from "react";
import {Row, Col, Modal} from 'antd';
import { Button, Space } from 'antd';
import {LeftCircleOutlined,RightCircleOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

import movieManiaApi from "../../api/movieManiaApi";
import TopRatedMovieCard from './TopRatedMovieCard';
import RecentMovieCardCopy from './RecentMovieCard'
import SearchMovies from './SearchMovie'
import HomePageStyles from "./HomePage.module.css";
import admin from '../../resources/images/admin.png';
import logo from '../../resources/images/logo.jpg';

function HomePage()
{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModal2Visible, setIsModal2Visible] = useState(false);
    const[username , setUsername] = useState("")
    const[password , setPassword] = useState("")
    const[login , setLogin] = useState(false)
    const[ip , setIp] = useState("")
    const[categories ,setCategories] = useState([])
    const[movies , setMovies] = useState([])
    const[adminMails , setAdminMails] = useState([])
    const[email,setEmail] = useState("")
    const[height , setHeight] = useState(55)
    
    const navigate = useNavigate();

    const showModal = () => {
      if(login){
        setIsModalVisible(true)
      }
      else{
        info()
      }
      
    };

    function tokenChange(token){

        var key = "qwerty"
        return token+key
       }

       const info = () => {
        Modal.info({
          title: 'This is a notification message',
          content: (
            <div>
              <p>Your ip has blocked please try again late</p>
            </div>
          ),
      
          onOk() {},
        });
      };
  
    function Login(){

        const admin ={username,password}
        alert(admin.password+" "+admin.username)
        alert(ip)
        var position = document.getElementById("id1")
       // console.log(student)
       movieManiaApi.post("/getKey/"+ip,{
        username,
        password
    })
    .then((res) => { 
        console.log("result - ",res.data)
        console.log(res.data)
          var error = "Error username or password"
          if(error==res.data){
            //position.innerHTML = res.data
            alert(res.data)
            if(localStorage.getItem("count")==null){
              localStorage.setItem("count",1)
    
            }
            else{    
                  var count = parseInt(localStorage.getItem("count"))
                  count++
                  alert(count)
                  localStorage.setItem("count",count)
                  if(count>=3){
                    localStorage.removeItem("count")
                    movieManiaApi.put("/setLogin/status?ip="+ip,{

                    })
                    .then((res) => { 
                        console.log("result - ",res.data)
          alert("your pc is blocked for 20 minuts , pc_ip : "+ip)
          setLogin(false)
                    })
              
                  // Catch errors if any
                  .catch((err) => { 
                    console.log(err)
                  });
                  }
          }
          }
          else{
            console.log(res.data)
            console.log(tokenChange(res.data))
            localStorage.setItem("user",tokenChange(res.data))
            localStorage.removeItem("count")
           // window.location="/category"
           navigate("/admin_home_page");
          }
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });

    }

    function getAdminMails(){
      movieManiaApi.get("/getMails")
      .then((res) => { 
        setAdminMails(res.data)
        setEmail(res.data[0])
        console.log(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
    }

    function sendMailUsername(){
      alert(email)
      if(email!=""){
        movieManiaApi.post("/sendMail/"+email)
        .then((res) => { 
          alert(res.data)
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
      }
      else{
        alert("please select email")
      }
     
    }

    function  search(name){
      movieManiaApi.get("/getMovieByName"+name)
      .then((res) => { 
        setMovies(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
    }

    function getByCategory(catId){
      movieManiaApi.get("/getMovieByCategory"+catId)
      .then((res) => { 
        setMovies(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
    }
    const handleOk = () => {
      setIsModalVisible(false);
      navigate("/admin_home_page");
    };

    const handleCancle = () => {
      setIsModalVisible(false);
      //navigate("/admin_home_page");
    };

    function getRecentMoviesCount(){
      movieManiaApi.get("/getMovies",{

      })
      .then((res) => { 
          console.log("result - ",res.data)
          let rows = Math.floor(res.data.length/6)
          if(res.data.length%6>0){
            rows++
          }
          console.log("rows " , rows)
          rows-=1
          setHeight(height+5+rows*15)

      })

    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }
  
     useEffect(()=>{

      localStorage.clear()

  getAdminMails()
  getRecentMoviesCount()

    fetch("https://api.ipify.org?format=json?callback=?",{
      method:"GET",
      headers:{},
    })
    .then(res=>res.text())
    .then((result1)=>{
      setIp(JSON.stringify(result1))
      //alert("ip "+JSON.stringify(result1))
      fetch("https://movieania.herokuapp.com/movie/getLogin/status?ip="+JSON.stringify(result1),{
        headers:{"header":"subhath"}
      })
      .then(res=>res.text())
      .then((result)=>{
        console.log("status",result)
        if(result==="true"){
          setLogin(true)
        }
      })
    })
   
  },[])

    return(
        <>
        <div style={{position:"absolute" , width:"100vw" , height:'auto', backgroundColor:"#00010F"}}>
        {/* changed this - height+"vw" */}

            {/* Nav Bar */}
            <div className={HomePageStyles.navBar}>
                <Row style={{height:'17vw'}}>
                  <Col span={1}></Col>
                  <Col span={22}><SearchMovies/></Col>
                </Row>
            </div>

            {/* Top Rated */}
            <div className={HomePageStyles.topRated}>
                <h2 style={{color:'#FFF504', textAlign:'left', paddingLeft:'5vw', fontSize:"1.6vw", opacity:'0.9'}}>Top Rated Movies</h2>
                <Row>
                <Col span={1}></Col>
                    <Col span={22}><TopRatedMovieCard/></Col>
                    <Col span={1}></Col>
                </Row>
            </div>
            <div style={{height:'2vw'}}></div>
            {/* Recent Movies */}       
            <div className={HomePageStyles.recentMovies}>
              
            <h2 style={{color:'#FFF504', textAlign:'left', padding:'3vw 0vw 0vw 5vw', fontSize:"1.6vw", opacity:'0.9'}}>Recent Movies</h2>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22} style={{width:'6'}}><RecentMovieCardCopy/></Col>
                    <Col span={1}></Col>
                </Row>
                </div>
           
                {/* Company Detail Content */}
                <div className={HomePageStyles.detailContent}>
                <hr style={{color:'white'}}/>
                  <div style={{height:'60vw'}}>
                   <center><img src={logo} style={{height:'15vw', width:'18vw', marginTop:'2vw'}}></img></center>   
                   <center><h4 style={{color:'white', fontSize:'1.5vw', paddingTop:'2vw'}}>Fast Track Computers</h4></center>
                   <center> <p style={{maxWidth:'85vw', color:'#E8E6E6', fontSize:'1.2vw'}}>
                    Most people today use computers either at work or at home. It is important that people have a quality resource for buying and servicing those computers. Eagle Computers will provide the West Hawaii community with just such a quality resource – a one-stop shop for IBM-compatible computers. Eagle Computers will offer the following products and services with excellent customer service in a friendly, professional, and pleasant environment
                    </p></center>

                    
                   <center><h4 style={{color:'white', fontSize:'1.4vw', paddingTop:'4vw'}}>Our Services</h4>
 
                    <ul style={{listStyle:'none', marginTop:'2.5vw', lineHeight:'3vw'}}>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> CCTV </li>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> Software Solutions </li>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> Hardware Solutions </li>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> Laptop Repair </li>
                      <li style={{color:'#E8E6E6', fontSize:'1.2vw'}}> CD/DVD Retailer </li>
                    </ul></center>
                  </div>

                </div>





                {/* Footer */}
                <div className={HomePageStyles.footer}>
                    <Row>
                        <Col span={10}><h4 style={{color:'white', opacity:'0.7', paddingLeft:'1vw', fontSize:"1vw"}}>Facebook </h4>
                      <a href="https://www.facebook.com/pages/category/Computer-Repair-Service/Fast-Track-Computer-Solution-102307735059838/"> <h4 style={{color:'white', opacity:'0.7', paddingLeft:'1vw', fontSize:"1.1vw"}}> Fast Track Computer Solution</h4></a> </Col>
                        <Col span={8}><h4 style={{color:'white', opacity:'0.7', fontSize:"1vw"}}>Fast Track Computers <br/> Negombo Rd, Narammala.</h4></Col>
                        <Col span={4}><h4 style={{color:'white', opacity:'0.7', fontSize:"1vw"}}>Contact   <br/> +94 77 158 1542 <br/> +94 77 158 1542</h4></Col>
                        <Col span={2}>
                        <img src={admin} style={{height:'2vw', width:'2vw', opacity:'0.4', marginTop:'1.6vw'}} onClick={showModal}></img>
                         <Modal 
                         style={{height:'30vw', width:'60vw', borderRadius:'1vw', backgroundColor:'wheat',fontSize:"1vw"}}
                         title="Login" visible={isModalVisible} onOk={Login}  onCancel={handleCancle}>
                            <div>
                                <p style={{fontSize:"1vw"}}>Admin UserName: <input type='text' onChange={(e) => setUsername(e.target.value)} /></p>
                                <p style={{fontSize:"1vw"}}>Admin Password: <input type='password' onChange={(e) => setPassword(e.target.value)}/></p>
                                <select name="Email" id="email" style={{fontSize:"1vw" , width:"17vw"}}
                
                onChange={(e)=>setEmail(e.target.value)}
                >
                  {adminMails.map((mail)=>(<option  value={mail}>{mail}</option>))}  
  
 
</select>
<button style={{fontSize:"1vw" , width:"8vw" , height:"4vw"}} onClick={sendMailUsername}>Send Username</button>
                            </div>
                        </Modal>
                        </Col>
                    </Row>
                </div>
           
        </div>
        </>
    );
}

export default HomePage;