import React, { useEffect } from "react";
import {storage} from "../../resources/Firebase";
import {ref , uploadBytes , getDownloadURL, updateMetadata} from "firebase/storage";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Switch,
  Upload,
  Col
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import formStyles from "../AddNewMovie/AddNewMovie.module.css";
import movieManiaApi from "../../api/movieManiaApi";
import movieManiaApiCopy from "../../api/movieManiaApi copy";
// import "./AddNewMovie.css";
const { Dragger } = Upload;
const { TextArea } = Input;
function EditMovieForm() {
  const tailLayout = {
  wrapperCol: { offset: 13, span: 16 },
};

const[movie , setMovie] = useState({})
const[name ,setName] = useState("")
const[imageUrl ,setImageUrl] = useState("")
const[trailerLink ,setTrailerLink] = useState("")
const[launchingImageUrl ,setLaunchingImageUrl] = useState("")
const[category ,setCategory] = useState("")
const[actors ,setActors] = useState("")
const[story ,setStory] = useState("")
const[price ,setPrice] = useState(0)
const[movieId ,setMovieId] = useState(0)
const[movieLoad , setMovieLoad] = useState(false)
const[oldCharacters , setOldCharacters] = useState([])
const[characters , setCharacters] = useState([])
const[removableCharacters , setRemoveCharacters] = useState([])
const[imageUpload,setImageUpload] = useState(null)
const[releaseImageUpload,setReleaseImageUpload] = useState(null)
const[videoUpload,setVideoUpload] = useState(null)
const[valid,setValid]=useState(false)

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

function addCharacter(){
  
  const actor = { character : actors}
  alert(actors)
  characters.push(actor)
  const oldCharacterAsis = oldCharacters;
  oldCharacterAsis.push(actor)
  
  setOldCharacters(oldCharacterAsis)
}

useEffect(()=>{

  var movieId = localStorage.getItem("movieId")
  var movieIId = parseInt(movieId)

  movieManiaApi.get("/getMovie/"+movieIId,{

  })
  .then((res) => { 
      console.log("result - ",res.data)
      setMovie(res.data)
      setMovieId(res.data.movieId)
      setActors(res.data.actors)
      setCategory(res.data.category)
      setImageUrl(res.data.imageUrl)
      setLaunchingImageUrl(res.data.launchingImageUrl)
      setStory(res.data.story)
      setName(res.data.name)
      setTrailerLink(res.data.trailerLink)
      setPrice(res.data.price)
      setMovieLoad(true)
      setOldCharacters(res.data.characters)
  })

// Catch errors if any
.catch((err) => { 
  console.log(err)
});
    
  },[])

  function updateMovie(){
    var movieId = localStorage.getItem("movieId")
    var movieIId = parseInt(movieId)
  const movie = {name , story , category, imageUrl , launchingImageUrl , trailerLink , actors , price}
    movieManiaApi.put("/updateMovie",{
      movieId,
      name,
      story,
      category,
      imageUrl,
      launchingImageUrl,
      trailerLink,
      characters,
      price,
      removableCharacters,
      headers:{"header":releaseToken()}
    })
    .then((res) => { 
        console.log("result - ",res.data)
        alert(res.data)
    })
  
  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
  }

  function updateMovie2(){
    const movieUpdateData = {movieId, name , story , category, imageUrl , launchingImageUrl , trailerLink , actors , price, characters,removableCharacters}
    fetch("https://localhost:8080/movie/updateMovie",{
            method:"PUT",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
            body:JSON.stringify(movieUpdateData)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log(result)
            alert(result)
          })
  }
  function uploadTrailer(){
    if(videoUpload == null){
        alert("video clip has not updated")
        return}
        const imageRef = ref(storage ,"movieMania/trailer"+"/video")
        uploadBytes(imageRef,videoUpload).then((snapshot)=>{
            alert("submited")
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
        alert("image has not updated")
        return}
        const imageRef = ref(storage ,"movieMania/movieImage"+"/image")
        uploadBytes(imageRef,imageUpload).then((snapshot)=>{
            alert("submited")
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url)
                setImageUrl(url)
                alert(url)
        })
      })
  }
  
  function uploadReleaseImage(){
    if(releaseImageUpload == null){
        alert("image has not updated")
        return}
        const imageRef = ref(storage ,"movieMania/releaseImage"+"/image")
        uploadBytes(imageRef,releaseImageUpload).then((snapshot)=>{
            alert("submited")
            getDownloadURL(snapshot.ref).then((url) => {
              console.log(url)
              setLaunchingImageUrl(url)
              alert(url)
              
        })
      })
  }

  function uploadFiles(){
    uploadMovieImage();
    uploadTrailer();
    uploadReleaseImage();
  }
  
  function submit(){
    updateMovie()
  }

  function removeCharacter(id){
    removableCharacters.push(id)
    const charactersAssis = []
        for(let i=0; oldCharacters[i]!=null; i++){
            if(oldCharacters[i].id!=id){
                charactersAssis.push(oldCharacters[i])
            }
        }
        setOldCharacters(charactersAssis)
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
      <h2 className={formStyles.heading} style={{fontSize:"1.4vw",color:"white"}}>Update Movie</h2>
      <lable style={{ color:"white",position: 'absolute',left:"0",top:"5%",fontSize:"1vw"}}>Movie Category</lable>
      <input style={{ color:"black",position: 'absolute',left:"0",top:"10%",fontSize:"1vw"}} value={category} onChange={(e) => setCategory(e.target.value)}></input>
      <lable style={{ color:"white",position: 'absolute',left:"0",top:"15%",fontSize:"1vw"}}>Movie Name</lable>
      <input style={{ color:"black",position: 'absolute',left:"0",top:"20%",fontSize:"1vw"}} value={name} onChange={(e) => setName(e.target.value)}></input>
      <label style={{ color:"white",position: 'absolute',left:"0",top:"25%",fontSize:"1vw"}}>Story</label>
      <input  style={{ color:"black",position: 'absolute',left:"0",top:"30%",fontSize:"1vw"}} value={story} onChange={(e) => setStory(e.target.value)}></input>
      <lable style={{ color:"white",position: 'absolute',left:"0",top:"35%",fontSize:"1vw"}}>Price</lable>
      <input style={{ color:"black",position: 'absolute',left:"0",top:"40%",fontSize:"1vw"}} value={price} onChange={(e) => setPrice(e.target.value)}></input>
      <lable style={{ color:"white",position: 'absolute',left:"0",top:"45%",fontSize:"1vw"}} >Actor</lable>
      <input style={{ color:"black",position: 'absolute',left:"0",top:"50%",fontSize:"1vw"}} onChange={(e) => setActors(e.target.value)}></input>
      <button style={{ color:"white",position: 'absolute',left:"0",top:"57%",fontSize:"1vw" , color:"black",background:"yellow"}} onClick={addCharacter}>Add Actor</button>
      <lable style={{ color:"white",position: 'absolute',left:"0",top:"65%",fontSize:"1vw"}}>Movie Image</lable>
      <input style={{ color:"white",position: 'absolute',left:"0",top:"70%",fontSize:"1vw"}} type="file" onChange={(e) => setImageUpload(e.target.files[0])}></input>
      <lable style={{ color:"white",position: 'absolute',left:"20%",top:"65%",fontSize:"1vw"}}>Releas Partner Image</lable>
      <input style={{ color:"white",position: 'absolute',left:"20%",top:"70%",fontSize:"1vw"}} type="file" onChange={(e) => setReleaseImageUpload(e.target.files[0])}></input>
      <lable style={{ color:"white",position: 'absolute',left:"40%",top:"65%",fontSize:"1vw"}}>Movie Trailer</lable>
      <input style={{ color:"white",position: 'absolute',left:"40%",top:"70%",fontSize:"1vw"}} type="file" onChange={(e) => setVideoUpload(e.target.files[0])}></input>
      <div style={{left:"85%",top:"5%",position: 'absolute'}}>
        <p style={{color:"blue", fontSize:"1vw"}}>Exist Actors</p>
      {oldCharacters.map((character)=>(
            <div>
              <p style={{color:"white" , fontSize:"1vw"}}>{character.character}</p>
                <button style={{ color:"white",left:"0",fontSize:"1vw" , color:"black" , background:"red"}} onClick={()=>removeCharacter(character.id)}>Remove</button>
            </div>
          ))}
          
      </div>
      <button style={{ color:"white",position: 'absolute',left:"0",top:"80%",fontSize:"1vw" , color:"black" , background:"yellow"}} onClick={uploadFiles}>Upload All Files</button>
      <button style={{ color:"white",left:"0" , position:"absolute" ,top:"87%",fontSize:"1vw" , color:"black" , background:"green"}} onClick={submit}>Submit All</button>
    </div>
    </>
  );
}

export default EditMovieForm;
