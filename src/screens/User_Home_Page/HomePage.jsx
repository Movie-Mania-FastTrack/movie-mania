import React, {useState , useEffect} from "react";
import {Row, Col, Modal} from 'antd';
import { Button, Space } from 'antd';
import {LeftCircleOutlined,RightCircleOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

import movieManiaApi from "../../api/movieManiaApi";
import TopRatedMovieCard from './TopRatedMovieCard';
import RecentMovieCardCopy from './RecentMovieCard'
import ShopDescription from './ShopDescription'
import SearchMovies from './SearchMovie'
import HomePageStyles from "./HomePage.module.css";
import admin from '../../resources/images/admin.png';


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
    const[height , setHeight] = useState(75)
    
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
        <div style={{position:"absolute" , width:"100vw" , height:height+"vw", backgroundColor:"#00010F"}}>
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
         
             {/* Shop Description */}
             <div style={{position:"absolute",top:height+"vw"}}>
              
             
                  <Row>
                    
                      <Col span={24} ><ShopDescription/></Col>
                      
                  </Row>
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