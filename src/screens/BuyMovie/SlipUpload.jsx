import React, { useEffect, useState } from "react";
import {storage} from "../../resources/Firebase"
import {ref , uploadBytes , listAll, getDownloadURL} from "firebase/storage"
import movieManiaApi from "../../api/movieManiaApi";
import style from './BuyMovie.module.css';



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
{/* Header Part */}
        <div className="header" style={{boxShadow:'2px 5px white'}}>
          <h1 className="h1">UPLOAD SLIP</h1>
        
       
        </div>
{/* Content Part */}

        <div style={{height:"40vw", width:"100vw", position: "relative", backgroundColor:'#01020C'}}>
          <center> <h3 style={{ fontWeight: "450" , fontSize:"1.3vw" ,color:"white", maxWidth:'80vw', paddingTop:'4vw'}}>Enter the request code, which you have obtained from the system, at the moment you made the request. Once you click on "Show Payment" button, you can see the relevant amount. A clear image of payment slip should be uploaded. Finally submit the form and you will receive the movies via the drive link, which you have provided at the request.</h3></center> 
            <br/>
            <hr style={{color:'white'}}/>
            <br/>
            <label style={{ color:"yellow",opacity:'0.7',position: 'absolute',paddingLeft:"20vw",top:"38%",fontSize:"1.2vw"}}>Request Code</label>
            <input style={{ color:"white" ,background:"transparent",borderColor:'#7C7E2E',position: 'absolute',width:"25vw",height:"3vw",marginLeft:"20vw",top:"43%",fontSize:"1.2vw", borderRadius:'0.5vw'}} value={code} onChange={(e) => setCode(e.target.value)}></input>
            <button style={{ color:"black",position: 'absolute', height:"3vw",width:"10vw",marginLeft:"52vw",fontSize:"1.1vw", marginTop:'1.5vw', backgroundColor:'yellow', fontWeight:'650', opacity:'0.5', cursor:'pointer'}} onClick={showPayment}>Show Payment</button>
          <br></br>
          <label style={{ color:"yellow",opacity:'0.7',position: 'absolute',paddingLeft:"20vw",top:"58%",fontSize:"1.2vw"}}>Slip Image</label>
          <input style={{ color:"yellow",position: 'absolute', height:"2vw",width:"20vw",marginLeft:"20vw",top:"66%",fontSize:"0.8vw"}} type="file"  onChange={(e)=>setImageUpload(e.target.files[0])}></input>
          <br></br>
            <button style={{ backgroundColor:"yellow",opacity:'0.8',borderRadius:'0.5vw',position: 'absolute', height:"3.2vw",marginLeft:"35vw",top:"78%",fontSize:"1.2vw", fontWeight:'650', color:'red', cursor:'pointer'}} onClick={uploadImage}>SUBMIT</button>
        </div>
        </>
    );
}

export default SlipUpload;