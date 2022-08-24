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
                  onChange={(e) => setCategory(e.target.value)}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Movie Name" className={formStyles.movieName}>
                  <Input className={formStyles.category} 
                   onChange={(e) => setName(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Col span={24}>
              <Form.Item label="Story">
                <TextArea rows={4} 
                onChange={(e) => setStory(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label="Movie Price" className={formStyles.moviePrice}>
                  <Input className={formStyles.category} 
                   onChange={(e) => setPrice(e.target.value)}
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
                  <button onClick={addCharacter}>Add Actor</button>
                </Col>
              </Row>
            </Form.Item>

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
                <button className={formStyles.button} onClick={submit}>Add Movie</button>
               <Link to="/"><button className={formStyles.button}>Cancel</button></Link> 
              </Space>
            </Form.Item>
          </Form>
        </Row>
        
      </center>
    </div>
  );
}

export default AddNewMovieForm;
