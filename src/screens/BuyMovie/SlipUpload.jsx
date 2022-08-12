import React, { useEffect, useState } from "react";
import {storage} from "../../resources/Firebase"
import {ref , uploadBytes , listAll, getDownloadURL} from "firebase/storage"
import movieManiaApi from "../../api/movieManiaApi";



function SlipUpload()
{

    const[imageUpload,setImageUpload] = useState(null)
    const[code,setCode] = useState("")

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
        <div>
            <h3>Enter Request ID: </h3>
            <br/>
            <input label="product id" varient="Outlined" fullWidth type="text" placeholder="Product ID"
          value={code}
          onChange={(e)=>setCode(e.target.value)}>
          </input><br></br>
            <input type="file" 
              onChange={(e)=>setImageUpload(e.target.files[0])}></input><br></br>
            <button onClick={uploadImage}>Submit</button>
        </div>
        </>
    );
}

export default SlipUpload;