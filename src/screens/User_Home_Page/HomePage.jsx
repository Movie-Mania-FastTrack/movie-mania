import React, {useState , useEffect} from "react";
import {Row, Col, Modal} from 'antd';
import {LeftCircleOutlined,RightCircleOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

import movieManiaApi from "../../api/movieManiaApi";
import TopRatedMovieCard from './TopRatedMovieCard';
import RecentMovieCard from './RecentMovieCard';

import HomePageStyles from "./HomePage.module.css";
import admin from '../../resources/images/admin.png';

function HomePage()
{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const[username , setUsername] = useState("")
    const[password , setPassword] = useState("")
    const[login , setLogin] = useState(false)
    const[ip , setIp] = useState("")
    const[categories ,setCategories] = useState([])
    const[movies , setMovies] = useState([])
    
    const navigate = useNavigate();

    const showModal = () => {
      setIsModalVisible(true);
    };

    function tokenChange(token){

        var key = "qwerty"
        return token+key
       }
  
    function Login(){

        const admin ={username,password}
        var position = document.getElementById("id1")
       // console.log(student)
       movieManiaApi.post("/getKey?ip="+ip,{
        
    })
    .then((res) => { 
        console.log("result - ",res.data)
        console.log(res.data)
          var error = "Error username or password"
          if(error==res.data){
            position.innerHTML = res.data
            alert(res.data)
            if(localStorage.getItem("count")==null){
              localStorage.setItem("count",1)
    
            }
            else{    
                  var count = parseInt(localStorage.getItem("count"))
                  count++
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
          }
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });

    }

    function getCategories(){

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
  
     useEffect(()=>{

      movieManiaApi.get("/getCategories")
      .then((res) => { 
        setCategories(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });

    fetch("https://api.ipify.org?format=json?callback=?",{
      method:"GET",
      headers:{},
    })
    .then(res=>res.text())
    .then((result1)=>{
      setIp(JSON.stringify(result1))
      //alert("ip "+JSON.stringify(result1))
      fetch("https://into-uncommon.herokuapp.com/intouncommon/getLogin/status?ip="+JSON.stringify(result1),{
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
        <div className={HomePageStyles.fullScreen}>
            {/* Nav Bar */}
            <div className={HomePageStyles.navBar}>
                <Row style={{height:'17vw'}}></Row>
                <Row style={{height:'3vw', width:'100%', backgroundColor: ' rgb(4, 4, 31)'}}>
                  <Col span={2}></Col> 
                  <Col span={3}><button onClick={null} className={HomePageStyles.categoryBtn}>English</button></Col> 
                  <Col span={3}><button onClick={null} className={HomePageStyles.categoryBtn}>Sinhala</button></Col> 
                  <Col span={3}><button onClick={null} className={HomePageStyles.categoryBtn}>Malayalam</button></Col> 
                  <Col span={3}><button onClick={null} className={HomePageStyles.categoryBtn}>Tamil</button></Col> 
                  <Col span={3}><button onClick={null} className={HomePageStyles.categoryBtn}>Hindi</button></Col>  
                  <Col span={2}></Col> 
                  <Col span={2}><button onClick={null} className={HomePageStyles.categoryBtn}>More ...</button></Col>  
                </Row>


            </div>

            {/* Top Rated */}
            <div className={HomePageStyles.topRated}>
                <h2 style={{color:'#FFF504', textAlign:'left', paddingLeft:'20px', fontWeight:'600'}}>Top Rated</h2>
                <Row>
                    <Col span={2}>
                        <LeftCircleOutlined style={{fontSize:'52px', color:'#676523', float:'left', padding:'40px 0px 0px 10px', opacity:'0.8'}}/>
                    </Col>
                    <Col span={20}><TopRatedMovieCard/></Col>
                    <Col span={2}>
                        <RightCircleOutlined style={{fontSize:'52px', color:'#676523', float:'right', padding:'40px 10px 0px 0px', opacity:'0.8'}}/>
                    </Col>
                </Row>
            </div>
            {/* Recent Movies */}
            <div className={HomePageStyles.recentMovies}>
            <h2 style={{color:'#FFF504', textAlign:'left', paddingLeft:'20px', fontWeight:'600'}}>Recent</h2>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22} style={{width:'6'}}><RecentMovieCard/></Col>
                    <Col span={1}></Col>
                </Row>
                {/* Footer */}
                <div className={HomePageStyles.footer}>
                    <Row>
                        <Col span={10}><h4 style={{color:'white', opacity:'0.7', paddingLeft:'20px'}}>Website <br/> www.fasttrack.com</h4></Col>
                        <Col span={8}><h4 style={{color:'white', opacity:'0.7'}}>Fast Track Computers <br/> Negombo Rd, Narammala.</h4></Col>
                        <Col span={4}><h4 style={{color:'white', opacity:'0.7'}}>Contact   <br/> +94 77 158 1542 <br/> +94 77 158 1542</h4></Col>
                        <Col span={2}>
                         <button style={{height:'50px', width:'70px', opacity:'0.2', marginTop:'5px'}} onClick={showModal}><img src={admin} style={{height:'50px', width:'70px'}}></img></button>  
                         <Modal 
                         style={{height:'300px', width:'600px', borderRadius:'15px', backgroundColor:'wheat'}}
                         title="Basic Modal" visible={isModalVisible} onOk={handleOk} >
                            <div>
                                <p>Admin UserName: <input type='text'/></p>
                                <p>Admin Password: <input type='password'/></p>
                            </div>
                        </Modal>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        </>
    );
}

export default HomePage;