import React, { useState } from "react";
import {Row, Col, Space} from 'antd';
import movieManiaApi from "../../api/movieManiaApi";


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

    function releaseToken(changedToken){

      var token = ""
      var key = "qwerty"
      for(var i =0; i<changedToken.length-6; i++){
        token+=changedToken[i]
      }
    console.log(token)
    //setToken(token)
    return token

    }

    function showPayedRequests(){
        movieManiaApi.get("/getPayedRequests",{
          //headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then((res) => { 
          setRequests(res.data)
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
         // headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then((res) => { 
          setRequests(res.data)
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
         // headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then((res) => { 
          setRequests(res.data)
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
        movieManiaApi.put("/setShow"+id,{
          //headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then((res) => { 
          alert(res.data)
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

    function sendCustomerUploadMail(code){
        movieManiaApi.get("/sendUploadMail"+code,{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then((res) => { 
          alert(res.data)
      })
  
    // Catch errors if any
    .catch((err) => { 
      console.log(err)
    });
    }

    function sendUploadMail(){
      movieManiaApi.get("/sendUploadMail"+code,{
        headers:{"header":releaseToken(localStorage.getItem("user"))}
      })
      .then((res) => { 
        alert(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
  }

    function confirmReq(id){
        movieManiaApi.put("/confirmRequest/"+id,{
         // headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then((res) => { 
          alert(res.data)
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
            //headers:{"header":releaseToken(localStorage.getItem("user"))}

        })
        .then((res) => { 
          alert(res.data)
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
        {logicNPayed?<div>
          <button onClick={showPayedRequests}>Payed Request</button>
      <button onClick={showNotPayableRequests}>Not Payable Request</button>
      <button onClick={sendMail}>Send Uploaded Mail</button>

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
 
            <button onClick={()=>rejectReq(request.request.requestId)}>Reject</button>   

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
      <button onClick={showNotPayedRequests}>Not Payed Payable Request</button>
      <button onClick={showNotPayableRequests}>Not Payable Request</button>
      <button onClick={sendMail}>Send Uploaded Mail</button>

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
            <button onClick={()=>sendCustomerUploadMail(request.request.code)}>Send Upload Email</button>
      
 </div>
          ))}
  </div>:<div>
    {logicNPayable?<div>
      <button onClick={showPayedRequests}>Payed Request</button>
      <button onClick={showNotPayedRequests}>Not Payed Payable Request</button>
      <button onClick={sendMail}>Send Uploaded Mail</button>

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
 
            <button onClick={()=>rejectReq(request.request.requestId)}>Reject</button>
            <button onClick={()=>showConfirm(request.request.requestId)}>Confirm</button>
      

            {reasonLogic&&<div style={{height:"7vw",width:"30vw",position:"absolute",right:"0",background:"blue" , top:"0"}}>
  <label>Reason</label>
  <input value={reason} onChange={(e) => setReason(e.target.value)}></input>
  <button onClick={()=>rejectReq(request.request.requestId)}>Reject</button>
  <button onClick={cancleReject}>Cancel</button>
  </div>}
 </div>
          ))}


    </div>:<div>
      <button onClick={showPayedRequests}>Payed Request</button>
      <button onClick={showNotPayedRequests}>Not Payed Payable Request</button>
      <button onClick={showNotPayableRequests}>Not Payable Request</button>
      <button onClick={sendMail}>Send Uploaded Mail</button>
      </div>}
    </div>}
  </div>}
  {logicMail&&<div style={{height:"7vw",width:"30vw",position:"absolute",right:"0",background:"blue" , top:"0"}}>
  <label>Code</label>
  <input value={code} onChange={(e) => setCode(e.target.value)}></input>
  <button onClick={()=>sendUploadMail}>Send</button>
  <button onClick={cancleMail}>Cancel</button>
  </div>}
        </>
    );
}

export default MovieRequest;