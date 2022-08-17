import React, { useState } from "react";
import {Row, Col, Space} from 'antd';
import movieManiaApi from "../../api/movieManiaApi";


function MovieRequest(requestID)
{

    const[code , setCode] = useState("")
    const[logicPayed , setLogicPayed] = useState(false)
    const[logicNPayed , setLogicNPayed] = useState(false)
    const[logicNPayable , setLogicNPayable] = useState(false)
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
        movieManiaApi.get("/getPayedRequests"+id,{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
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
        movieManiaApi.get("/getPayableRequests"+id,{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then((res) => { 
          setRequests(res.data)
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
        movieManiaApi.get("/getNotPayableRequests"+id,{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then((res) => { 
          setRequests(res.data)
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

    function sendCustomerUploadMail(){
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
        movieManiaApi.put("/confirmRequest"+code,{
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

    function rejectReq(id){
       if(reasonLogic){
        setReasonLogic(false)
        const rejectDto = {id : reqId , reason : reason}
        movieManiaApi.put("/rejectRequest",{
            rejectDto,
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
       else{
        setReasonLogic(true)
        setId(id)
       }
    }

    function cancleReject(){
      setReasonLogic(false)
    }

    return(
        <>
        <div style={{height:'auto', width:'100%', position:'absolute', backgroundColor:'#171723', marginTop:'30px'}}>
           
                
                  
                        <Row>
                            <Col span={16}>
                                <h3 style={{paddingLeft:'20px',color:'#FFF504'}}>Request Number: </h3>
                            </Col>
                            <Col span={4}>
                                <h3 style={{color:'white'}}>Request Completion </h3>
                            </Col>
                            <Col span={4}><button style={{backgroundColor:'#FFF504', borderRadius:'20px'}}> Complete </button></Col>
                        </Row><br/><br/>
                        <Row>
                            <Col span={8}>
                                <h3 style={{paddingLeft:'20px',color:'white'}}>Customer Name </h3>
                            </Col>
                            <Col span={8}>
                                <h3 style={{paddingLeft:'20px',color:'white'}}>Contact </h3>
                            </Col>
                            <Col span={8}>
                                <h3 style={{paddingLeft:'20px',color:'white'}}>Email </h3>
                            </Col>
                        </Row><br/>
                        <hr/>
                        <br/>
                        <Row>
                            <Col span={6} ><h3 style={{paddingLeft:'20px',color:'white'}}>Category </h3></Col>
                            <Col span={6} ><h3 style={{color:'white'}}>Movie ID </h3></Col>
                            <Col span={6} ><h3 style={{color:'white'}}>Movie Name </h3></Col>
                            <Col span={6} ><h3 style={{color:'white'}}>Method </h3></Col>
                        </Row><br/><br/>
                        <Row><h3 style={{paddingLeft:'20px',color:'white'}}>Drive Link</h3></Row>

                        <button onClick={()=>rejectReq}>Reject</button>
                        <button onClick={()=>confirmReq}>Confirm</button>
                  
            {reasonLogic&&<div>
              <label>Reason</label>
              <input value={reason} onChange={(e) => setReason(e.target.value)}></input>
              <button onClick={rejectReq}>Reject</button>
              <button onClick={cancleReject}>Cancel</button>
              </div>}
          
        </div>
        </>
    );
}

export default MovieRequest;