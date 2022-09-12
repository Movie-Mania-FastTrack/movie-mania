import React, { useEffect, useState } from "react";
import {storage} from "../../resources/Firebase"
import {ref , uploadBytes , listAll, getDownloadURL} from "firebase/storage"
import movieManiaApi from "../../api/movieManiaApi";



function SlipUpload()
{

    const[imageUpload,setImageUpload] = useState(null)
    const[code,setCode] = useState("")

    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

    function uploadImage(){
        if(imageUpload == null){
            alert("image havent selected")
            return}
            const imageRef = ref(storage ,"movieMania/slip"+code+"/image")
            uploadBytes(imageRef,imageUpload).then((snapshot)=>{
                alert("submited")
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    const productImages = {url}
                    // const productImageDTO = {productId : id , productImages}
                   movieManiaApi.post("/",{

                   })
                   .then((res) => { 
                    console.log("result - ",res.data)
                })
          
              // Catch errors if any
              .catch((err) => { 
                console.log(err)
              });
            })
          })
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
            <input style={{ color:"white",position: 'absolute',width:"20vw",height:"2vw",left:"0",top:"25%",fontSize:"1vw"}}></input>
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