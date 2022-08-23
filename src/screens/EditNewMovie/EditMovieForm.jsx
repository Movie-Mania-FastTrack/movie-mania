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
  
  function submit(){
    uploadMovieImage();
    uploadTrailer();
    uploadReleaseImage();
  
    const delay = setTimeout(updateMovie,30000)
  
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
    <div>
    <h2 className={formStyles.heading}>Add New Movie</h2>
    <center>
      <Row gutter={[16, 16]}>
        <Form
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          className={formStyles.form}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item label="Category">
                {/* <p className={formStyles.p}>Category</p> */}
                <Input className={formStyles.category} 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Movie Name" className={formStyles.movieName}>
                <Input className={formStyles.category}
                value={name} 
                 onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Col span={24}>
            <Form.Item label="Story">
              <TextArea rows={4} 
              value={story}
              onChange={(e) => setStory(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Form.Item label="Characters">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                {" "}
                <Input 
                 onChange={(e) => setActors(e.target.value)}
                />
                <button onClick={()=>addCharacter()}>Add Actor</button>
              </Col>
            </Row>
          </Form.Item>
          {oldCharacters.map((character)=>(
            <Row>
               <Col span={8}>
                <p>{character.character}</p>
                <button onClick={()=>removeCharacter(character.id)}>Remove</button>
            </Col>
            </Row>
          ))}
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item label="Partner Image">
              <input type="file" name="file" onChange={(e)=>setReleaseImageUpload(e.target.files[0])}/>
              </Form.Item>
            </Col>
            <Col span={8} offset={1}>
              <Form.Item label="Movie Image">
              <input type="file" name="file" onChange={(e)=>setImageUpload(e.target.files[0])} />
              </Form.Item>
            </Col>


            <Form.Item label="Trailer Clip">
            <input type="file" name="file" onChange={(e)=>setVideoUpload(e.target.files[0])} />
            </Form.Item>
          </Row>
          <Form.Item {...tailLayout}>
            <Space>
              <button className={formStyles.button} onClick={submit}>Update Movie</button> 
            </Space>
          </Form.Item>
        </Form>
      </Row>
    </center>
  </div>
  );
}

export default EditMovieForm;
