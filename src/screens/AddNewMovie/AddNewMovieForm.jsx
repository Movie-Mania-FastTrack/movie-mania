import React from "react";
import {storage} from "../../resources/Firebase";
import {ref , uploadBytes , getDownloadURL} from "firebase/storage";
import { Form, Input,Row, Space,Col } from "antd";
import movieManiaApi from "../../api/movieManiaApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import formStyles from "./AddNewMovie.module.css";
import "./AddNewMovie.css";
import {useNavigate} from 'react-router-dom';

const { TextArea } = Input;
function AddNewMovieForm() {
  const tailLayout = {
  wrapperCol: { offset: 13, span: 16 },
};

const[name ,setName] = useState("")
const[imageUrl ,setImageUrl] = useState("")
const[trailerLink ,setTrailerLink] = useState("")
const[launchingImageUrl ,setLaunchingImageUrl] = useState("")
const[category ,setCategory] = useState("")
const[actors ,setActors] = useState("")
const[story ,setStory] = useState("")
const[price ,setPrice] = useState(0)
const[imageUpload,setImageUpload] = useState(null)
const[releaseImageUpload,setReleaseImageUpload] = useState(null)
const[videoUpload,setVideoUpload] = useState(null)
const[characters , setCharacters] = useState([])

const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

const navigate = useNavigate();

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

function reloadW(){
  window.location.reload()
}

function addCharacter(){
  
  const actor = { character : actors}
  alert(actors)
  characters.push(actor)
}

function addMovie(){
  
  alert(imageUrl)
  alert(name)
  alert(characters)
    const movie = {name : name , story : story , category, imageUrl , launchingImageUrl , trailerLink , actors , price}
    movieManiaApi.post("/addMovie",{
        name : name,
        story,
        category,
        imageUrl,
        launchingImageUrl,
        trailerLink,
        characters,
        price,
      headers:{"header":releaseToken()}
    })
    .then((res) => { 
        console.log("result - ",res.data)
        alert(res.data)
        window.location.reload()
    })
  
  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  })
  
}

function uploadTrailer(){
  if(videoUpload == null){
      alert("video clip has not selected")
      return}
      const imageRef = ref(storage ,"movieMania/trailer"+"/video")
      uploadBytes(imageRef,videoUpload).then((snapshot)=>{
          alert("submited Trailer")
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url)
            setTrailerLink(url)
            alert(url)
              // const productImageDTO = {productId : id , productImages}
    
      })
    })
}

function uploadMovieImage(){
  if(imageUpload == null){
      alert("image has not selected")
      return}
      const imageRef = ref(storage ,"movieMania/movieImage"+"/image")
      uploadBytes(imageRef,imageUpload).then((snapshot)=>{
          alert("submited  Moie Image")
          getDownloadURL(snapshot.ref).then((url) => {
              console.log(url)
              setImageUrl(url)
              alert(url)
      })
    })
}

function uploadReleaseImage(){
  if(releaseImageUpload == null){
      alert("image has not selected")
      return}
      const imageRef = ref(storage ,"movieMania/releaseImage"+"/image")
      uploadBytes(imageRef,releaseImageUpload).then((snapshot)=>{
          alert("submited Partner image")
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url)
            setLaunchingImageUrl(url)
            alert(url)
            
      })
    })
}

function submit(){
  uploadMovieImage();
  uploadTrailer();
  uploadReleaseImage();

  const delay = setTimeout(addMovie,30000)

}

  return (
    <>
    <div className="header">
          <h1 className="h1">ADMINISTRATION</h1>
          <h2 className="date">
          <span style={{ fontWeight: "bold" , fontSize:"1vw"}}>TODAY : </span>
          {date}
        </h2>
        </div>
        <div style={{height:"40vw", width:"100vw", position: 'absolute', backgroundColor:'#040819'}}>
      <h2 className={formStyles.heading} style={{fontSize:"1.4vw",color:"white"}}>Add New Movie</h2>
      <lable style={{ color:"white",position: 'absolute',left:"0",top:"20%",fontSize:"1vw"}}>Movie Name</lable>
      <input style={{left:"0"}} onChange={(e) => setName(e.target.value)}></input>
      <label>Story</label>
      <input  onChange={(e) => setStory(e.target.value)}></input>
      <lable>Price</lable>
      <input onChange={(e) => setPrice(e.target.value)}></input>
      <lable>Actor</lable>
      <input  onChange={(e) => setActors(e.target.value)}></input>
      <button onClick={addCharacter}>Add Actor</button>
    </div>
    </>
  );
}

export default AddNewMovieForm;
