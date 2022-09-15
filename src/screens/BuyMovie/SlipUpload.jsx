import React, { useEffect, useState } from "react";
import {storage} from "../../resources/Firebase"
import {ref , uploadBytes , listAll, getDownloadURL} from "firebase/storage"
import movieManiaApi from "../../api/movieManiaApi";
import { Result } from "antd";



function SlipUpload()
{

    const[imageUpload,setImageUpload] = useState(null)
    const[code,setCode] = useState("")

    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

    function validateFormRequired() {
      if(code!=""){
        return true
      }
      return false
    }

    function uploadImage(){

      var validation1 = validateFormRequired()
      if(!validation1){
        alert("Please Enter Code First")
        return
      }

        if(imageUpload == null){
            alert("image havent selected")
            return}

            var validation1 = validateFormRequired()
            if(!validation1){
              alert("Please Enter Code First")
              return
            }
            const imageRef = ref(storage ,"movieMania/slip"+code+"/image")
            uploadBytes(imageRef,imageUpload).then((snapshot)=>{
                alert("submited")
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    const slipImages = url
                    // const productImageDTO = {productId : id , productImages}
                   movieManiaApi.put("/addScanCopy",{
                    url:slipImages,
                    code
                   })
                   .then((res) => { 
                    console.log("result - ",res.data)
                    alert(res.data)
                    if(res.data=="added"){
                      window.location.reload()
                    }
                })
          
              // Catch errors if any
              .catch((err) => { 
                console.log(err)
              });
            })
          })
    }

    function showPayment(){

      var validation1 = validateFormRequired()
      if(!validation1){
        alert("Please Enter Code First")
        return
      }

      movieManiaApi.get("/getRequest/"+code,{

      })
      .then((res) => { 
       console.log("result - ",res.data)
       var price = 0
       for(let i=0; i<res.data.length; i++){
        price+=res.data[i].movie.price
       }
       alert("Your Full Payment For This Request : "+price)
   })

 // Catch errors if any
 .catch((err) => { 
   console.log(err)
 });
    }

    return(
        <>
        <div className="header">
          <h1 className="h1">UPLOAD SLIP</h1>
          <h2 className="date">
          <span style={{ fontWeight: "bold" , fontSize:"1vw"}}>TODAY : </span>
          {date}
        </h2>
        </div>
        <div style={{height:"40vw", width:"100vw", position: "relative", backgroundColor:'#040819'}}>
            <h3 style={{ fontWeight: "bold" , fontSize:"2vw" ,color:"yellow"}}>Enter Request Code: </h3>
            <br/>
            <lable style={{ color:"white",position: 'absolute',left:"0",top:"15%",fontSize:"1vw"}}>Request Code</lable>
            <input style={{ color:"black" ,background:"white",position: 'absolute',width:"20vw",height:"2vw",left:"0",top:"25%",fontSize:"1vw"}} value={code} onChange={(e) => setCode(e.target.value)}></input>
            <button style={{ color:"black",position: 'absolute', height:"3vw",width:"10vw",left:"0",top:"33%",fontSize:"1vw"}} onClick={showPayment}>Show Payment</button>
          <br></br>
          <lable style={{ color:"white",position: 'absolute',left:"0",top:"45%",fontSize:"1vw"}}>Slip Image</lable>
      <input style={{ color:"green",position: 'absolute', height:"2vw",width:"20vw",left:"0",top:"55%",fontSize:"0.8vw"}} type="file"  onChange={(e)=>setImageUpload(e.target.files[0])}></input>
     <br></br>
            <button style={{ color:"black",position: 'absolute', height:"3vw",left:"0",top:"70%",fontSize:"1vw"}} onClick={uploadImage}>Submit</button>
        </div>
        </>
    );
}

export default SlipUpload;