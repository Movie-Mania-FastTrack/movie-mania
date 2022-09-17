import React, { useState } from "react";
import {Row, Col, Space} from 'antd';
import movieManiaApi from "../../api/movieManiaApi";
import "../Admin_Home_Page/Admin.css"


function MovieRequest(requestID)
{

    const[code , setCode] = useState("")
    const[logicPayed , setLogicPayed] = useState(false)
    const[logicNPayed , setLogicNPayed] = useState(false)
    const[logicNPayable , setLogicNPayable] = useState(false)
    const[logicMail , setLogicMail] = useState(false)
    const[requests , setRequests] = useState([])
    const[rejectLogic , setRejectLogic] = useState(false)
    const[reasonLogic , setReasonLogic] = useState(false)
    const[reason , setReason] = useState("")
    const[reqId , setId] = useState(0)
    const[valid,setValid]=useState(false)
    const[height , setHeight] = useState(40)

    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    function releaseToken(){

      if(localStorage.getItem("user")!=null){
        const changedToken = localStorage.getItem("user")
      var token = ""
      var key = "qwerty"
      for(var i =0; i<changedToken.length-6; i++){
        token+=changedToken[i]
      }
    console.log(token)
    //setToken(token)
    return token
      }
    
      return ""
      
    
    }
    

    function checkValidity(){
      if(!valid){
        console.log(valid)
        movieManiaApi.get("/getvalidity",{
          headers:{"header":releaseToken()}
      })
      .then((res) => { 
          console.log("result - ",res.data)
          //console.log(res)
          if(res.data==="successful"){
            setValid(true)
          }
      })

    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
      }
    }

    function showPayedRequests(){
        movieManiaApi.get("/getPayedRequests",{
          headers:{"header":releaseToken()}
        })
        .then((res) => { 
          setRequests(res.data)
          var length = res.data.length*40
          if(length>40){
            setHeight(length)
          }
          setLogicNPayable(false)
          setLogicNPayed(false)
          setLogicPayed(true)
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

    function showNotPayedRequests(){
        movieManiaApi.get("/getPayableRequests",{
          headers:{"header":releaseToken()}
        })
        .then((res) => { 
          setRequests(res.data)
          var length = res.data.length*40
          if(length>40){
            setHeight(length)
          }
          console.log(res.data)
          setLogicNPayable(false)
          setLogicNPayed(true)
          setLogicPayed(false)
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

    function showNotPayableRequests(){
        movieManiaApi.get("/getNotPayableRequests",{
          headers:{"header":releaseToken()}
        })
        .then((res) => { 
          setRequests(res.data)
          var length = res.data.length*40
          if(length>40){
            setHeight(length)
          }
          console.log(res.data)
          setLogicNPayable(true)
          setLogicNPayed(false)
          setLogicPayed(false)
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

    function showConfirm(id){
        movieManiaApi.put("/setShow/"+id,{
          headers:{"header":releaseToken()}
        })
        .then((res) => { 
          alert(res.data)
          window.location.reload()
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

    function sendCustomerUploadMail(code){
        movieManiaApi.get("/sendUploadMail/"+code,{
          headers:{"header":releaseToken()}
        })
        .then((res) => { 
          alert(res.data)
          window.location.reload()
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

    function sendUploadMail(){
      movieManiaApi.get("/sendUploadMail/"+code,{
        headers:{"header":releaseToken()}
      })
      .then((res) => { 
        alert(res.data)
        window.location.reload()
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
  }

    function confirmReq(id){
        movieManiaApi.put("/confirmRequest/"+id,{
          headers:{"header":releaseToken()}
        })
        .then((res) => { 
          alert(res.data)
          window.location.reload()
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

    function rejectReq(id){
       if(reasonLogic){
        if(reason!=""){
          setReasonLogic(false)
        const rejectDto = {id : reqId , reason : reason}
        movieManiaApi.put("/rejectRequest",{
            id : reqId,
            reason : reason,
            headers:{"header":releaseToken()}

        })
        .then((res) => { 
          alert(res.data)
          window.location.reload()
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
        }
        else{
          alert("Enter Reason")
        }
       }
       else{
        setReasonLogic(true)
        setId(id)
       }
    }

    function cancleReject(){
      setReasonLogic(false)
    }

    function cancleMail(){
      setLogicMail(false)
    }

    function sendMail(){
      setLogicMail(true)
    }

    return(
        <>
        <div className="header">
          <h1 className="h1">ADMINISTRATION</h1>
          <h2 className="date">
          <span style={{ fontWeight: "bold" , fontSize:"1vw"}}>TODAY : </span>
          {date}
        </h2>
        </div>
        <div style={{height:height+"vw", width:"100vw", position: 'absolute', backgroundColor:'#040819'}}>
        {logicNPayed?<div >
          <button style={{height:'2vw', width:"10%", position: 'absolute',left:"0",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showPayedRequests}>Payed Request</button>
      <button style={{height:'2vw', width:"15%", position: 'absolute',left:"10%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showNotPayableRequests}>Not Payable Request</button>
      <button style={{height:'2vw', width:"15%", position: 'absolute',left:"25%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={sendMail}>Send Uploaded Mail</button>

          {requests.map((request , index)=>(
            <div style={{height:'auto', width:'100%', backgroundColor:'#171723'}}>
           <Row>
                <div style={{height:"0.5vw",width:"70vw",position:"absolute",left:"15vw",background:"white"}}></div>
                
            </Row><br/><br/>
           <Row>
                <Col span={16}>
                    <h3 style={{paddingLeft:'20px',color:'#FFF504'}}>payable Not Payed Request Number: {index+1}</h3>
                </Col>
                
            </Row><br/><br/>
                  
            <Row>
                <Col span={16}>
                    <h3 style={{paddingLeft:'20px',color:'#FFF504'}}>Request Code: {request.request.code}</h3>
                </Col>
                <Col span={4}>
                    <h3 style={{color:'white'}}>Request Completion </h3>
                </Col>
                <Col span={4}><button style={{backgroundColor:'#FFF504', borderRadius:'2vw'}}> {request.request.adminStatus} </button></Col>
            </Row><br/><br/>
            <Row>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Customer Name : {request.request.customerName}</h3>
                </Col>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Contact : {request.request.contact}</h3>
                </Col>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Email : {request.request.customerEmail}</h3>
                </Col>
            </Row><br/>
            <hr/>
            <br/>
            <Row>
                <Col span={6} ><h3 style={{paddingLeft:'20px',color:'white'}}>Category : {request.movie.category}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie ID : {request.movie.movieId}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie Name : {request.movie.name}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie Price : {request.movie.price}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Method : {request.request.payableStatus}</h3></Col>
            </Row><br/><br/>
            <Row><h3 style={{paddingLeft:'20px',color:'white'}}>Drive Link : {request.request.driverLink}</h3></Row>
 
            <button style={{fontSize:"1vw",height:"2vw",width:"8vw"}} onClick={()=>rejectReq(request.request.requestId)}>Reject</button>   

            {reasonLogic&&<div style={{height:"7vw",width:"30vw",position:"absolute",right:"0",background:"blue" , top:"0"}}>
  <label>Reason</label>
  <input value={reason} onChange={(e) => setReason(e.target.value)}></input>
  <button onClick={()=>rejectReq(request.request.requestId)}>Reject</button>
  <button onClick={cancleReject}>Cancel</button>
  </div>}
 </div>
          ))}
       
        </div>:<div>
  {logicPayed?<div>
      <button style={{height:'2vw', width:"10%", position: 'absolute',left:"0",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showNotPayedRequests}>Not Payed Payable Request</button>
      <button style={{height:'2vw', width:"10%", position: 'absolute',left:"10%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showNotPayableRequests}>Not Payable Request</button>
      <button style={{height:'2vw', width:"10%", position: 'absolute',left:"20%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={sendMail}>Send Uploaded Mail</button>

    {requests.map((request , index)=>(
            <div style={{height:'auto', width:'100%', backgroundColor:'#171723'}}>
           <Row>
                <div style={{height:"0.5vw",width:"70vw",position:"absolute",left:"15vw",background:"white"}}></div>
                
            </Row><br/><br/>
           <Row>
                <Col span={16}>
                    <h3 style={{paddingLeft:'20px',color:'#FFF504'}}>Payed Request Number: {index+1}</h3>
                </Col>
                
            </Row><br/><br/>
                  
            <Row>
                <Col span={16}>
                    <h3 style={{paddingLeft:'20px',color:'#FFF504'}}>Request Code: {request.request.code}</h3>
                </Col>
                <Col span={4}>
                    <h3 style={{color:'white'}}>Request Completion </h3>
                </Col>
                <Col span={4}><button style={{backgroundColor:'#FFF504', borderRadius:'20px'}}> {request.request.adminStatus} </button></Col>
            </Row><br/><br/>
            <Row>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Customer Name : {request.request.customerName}</h3>
                </Col>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Contact : {request.request.contact}</h3>
                </Col>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Email : {request.request.customerEmail}</h3>
                </Col>
            </Row><br/>
            <hr/>
            <br/>
            <Row>
                <Col span={6} ><h3 style={{paddingLeft:'20px',color:'white'}}>Category : {request.movie.category}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie ID : {request.movie.movieId}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie Name : {request.movie.name}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie Price : {request.movie.price}</h3></Col>

                <Col span={6} ><h3 style={{color:'white'}}>Method : {request.request.payableStatus}</h3></Col>
            </Row><br/><br/>
            <Row><h3 style={{paddingLeft:'20px',color:'white'}}>Drive Link : {request.request.driverLink}</h3></Row>

            <Row><img src={request.request.slipUrl}></img></Row>
 
            <button onClick={()=>confirmReq(request.request.requestId)}>Confirm</button>
            <button style={{fontSize:"1vw",height:"2vw",width:"12vw"}} onClick={()=>sendCustomerUploadMail(request.request.code)}>Send Upload Email</button>
      
 </div>
          ))}
  </div>:<div>
    {logicNPayable?<div>
      <button style={{height:'2vw', width:"10%", position: 'absolute',left:"0",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showPayedRequests}>Payed Request</button>
      <button style={{height:'2vw', width:"15%", position: 'absolute',left:"10%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showNotPayedRequests}>Not Payed Payable Request</button>
      <button style={{height:'2vw', width:"15%", position: 'absolute',left:"25%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={sendMail}>Send Uploaded Mail</button>

      {requests.map((request , index)=>(
            <div style={{height:'auto', width:'100%', backgroundColor:'#171723'}}>
           <Row>
                <div style={{height:"0.5vw",width:"70vw",position:"absolute",left:"15vw",background:"white"}}></div>
                
            </Row><br/><br/>
           <Row>
                <Col span={16}>
                    <h3 style={{paddingLeft:'20px',color:'#FFF504'}}>Not Payable Request Number: {index+1}</h3>
                </Col>
                
            </Row><br/><br/>
                  
            <Row>
                <Col span={16}>
                    <h3 style={{paddingLeft:'20px',color:'#FFF504'}}>Request Code: {request.request.code}</h3>
                </Col>
                <Col span={4}>
                    <h3 style={{color:'white'}}>Request Completion </h3>
                </Col>
                <Col span={4}><button style={{backgroundColor:'#FFF504', borderRadius:'20px'}}> {request.request.adminStatus} </button></Col>
            </Row><br/><br/>
            <Row>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Customer Name : {request.request.customerName}</h3>
                </Col>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Contact : {request.request.contact}</h3>
                </Col>
                <Col span={8}>
                    <h3 style={{paddingLeft:'20px',color:'white'}}>Email : {request.request.customerEmail}</h3>
                </Col>
            </Row><br/>
            <hr/>
            <br/>
            <Row>
                <Col span={6} ><h3 style={{paddingLeft:'20px',color:'white'}}>Category : {request.movie.category}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie ID : {request.movie.movieId}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie Name : {request.movie.name}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Movie Price : {request.movie.price}</h3></Col>
                <Col span={6} ><h3 style={{color:'white'}}>Method : {request.request.payableStatus}</h3></Col>
            </Row><br/><br/>
            <Row><h3 style={{paddingLeft:'20px',color:'white'}}>Drive Link : {request.request.driverLink}</h3></Row>
 
            <button style={{fontSize:"1vw",height:"2vw",width:"8vw"}} onClick={()=>rejectReq(request.request.requestId)}>Reject</button>
            <button style={{fontSize:"1vw",height:"2vw",width:"8vw"}} onClick={()=>showConfirm(request.request.requestId)}>Confirm</button>
      

            {reasonLogic&&<div style={{height:"7vw",width:"30vw",position:"absolute",right:"0",background:"blue" , top:"0"}}>
  <label>Reason</label>
  <input style={{fontSize:"1vw",height:"2vw",width:"16vw",position:"absolute"}} value={reason} onChange={(e) => setReason(e.target.value)}></input>
  <button style={{fontSize:"1vw",height:"2vw",width:"8vw",position:"absolute",top:"2vw",left:"0"}} onClick={()=>rejectReq(request.request.requestId)}>Reject</button>
  <button style={{fontSize:"1vw",height:"2vw",width:"8vw",position:"absolute",top:"2vw",left:"8vw"}} onClick={cancleReject}>Cancel</button>
  </div>}
 </div>
          ))}


    </div>:<div>
      <button style={{height:'2vw', width:"10%", position: 'absolute',left:"0",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showPayedRequests}>Payed Request</button>
      <button style={{height:'2vw', width:"15%", position: 'absolute',left:"10%",stop:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showNotPayedRequests}>Not Payed Payable Request</button>
      <button style={{height:'2vw', width:"15%", position: 'absolute',left:"25%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={showNotPayableRequests}>Not Payable Request</button>
      <button style={{height:'2vw', width:"15%", position: 'absolute',left:"40%",top:"0",fontSize:"1vw" , cursor:"pointer"}} onClick={sendMail}>Send Uploaded Mail</button>
      </div>}
    </div>}
  </div>}
  {logicMail&&<div style={{height:"7vw",width:"30vw",position:"absolute",right:"0",background:"blue" , top:"0"}}>
  <label style={{fontSize:"1vw"}}>Code</label>
  <input style={{fontSize:"1vw",width :"40%",position:"absolute" , height:"25%",left:"10%",top:"3%"}} value={code} onChange={(e) => setCode(e.target.value)}></input>
  <button style={{fontSize:"1vw",width :"10%",position:"absolute" , height:"25%",left:"53%",top:"3%"}} onClick={()=>sendUploadMail}>Send</button>
  <button style={{fontSize:"1vw",width :"12%",position:"absolute" , height:"25%",left:"65%",top:"3%"}} onClick={cancleMail}>Cancel</button>
  </div>}
        </div>
        </>
    );
}

export default MovieRequest;