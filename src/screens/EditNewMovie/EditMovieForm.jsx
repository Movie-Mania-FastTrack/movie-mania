import React, { useEffect } from "react";
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
const[movieLoad , setMovieLoad] = useState(false)

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

useEffect(()=>{

  var movieId = localStorage.getItem("movieId")
  var movieIId = parseInt(movieId)

  movieManiaApi.get("/getMovie"+movieIId,{

  })
  .then((res) => { 
      console.log("result - ",res.data)
      setMovie(res.data)
      setActors(res.data.actors)
      setCategory(res.data.category)
      setImageUrl(res.data.imageUrl)
      setLaunchingImageUrl(res.data.launchingImageUrl)
      setStory(res.data.story)
      setName(res.data.name)
      setTrailerLink(res.data.trailerLink)
      setPrice(res.data.price)
      setMovieLoad(true)
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
    movieManiaApi.get("/updateMovie"+movieIId,{
      movie,
      headers:{"header":releaseToken(localStorage.getItem("user"))}
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


  // function uploadTrailer(){
  //   if(videoUpload == null){
  //       alert("video clip has not selected")
  //       return}
  //       const imageRef = ref(storage ,"movieMania/trailer"+"/video")
  //       uploadBytes(imageRef,videoUpload).then((snapshot)=>{
  //           alert("submited")
  //           getDownloadURL(snapshot.ref).then((url) => {
  //             console.log(url)
  //             setTrailerLink(url)
  //             alert(url)
  //               // const productImageDTO = {productId : id , productImages}
      
  //       })
  //     })
  // }
  
  // function uploadMovieImage(){
  //   if(imageUpload == null){
  //       alert("image has not selected")
  //       return}
  //       const imageRef = ref(storage ,"movieMania/movieImage"+"/image")
  //       uploadBytes(imageRef,imageUpload).then((snapshot)=>{
  //           alert("submited")
  //           getDownloadURL(snapshot.ref).then((url) => {
  //               console.log(url)
  //               setImageUrl(url)
  //               alert(url)
  //       })
  //     })
  // }
  
  // function uploadReleaseImage(){
  //   if(releaseImageUpload == null){
  //       alert("image has not selected")
  //       return}
  //       const imageRef = ref(storage ,"movieMania/releaseImage"+"/image")
  //       uploadBytes(imageRef,releaseImageUpload).then((snapshot)=>{
  //           alert("submited")
  //           getDownloadURL(snapshot.ref).then((url) => {
  //             console.log(url)
  //             setLaunchingImageUrl(url)
  //             alert(url)
              
  //       })
  //     })
  // }
  
  // function submit(){
  //   uploadMovieImage();
  //   uploadTrailer();
  //   uploadReleaseImage();
  
  //   const delay = setTimeout(updateMovie,20000)
  
  // }

  return (
    <div>
      <h2 className={formStyles.heading}>View/Edit Movie</h2>
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
                  <Input className={formStyles.category} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Movie Name" className={formStyles.movieName}>
                  <Input className={formStyles.category} />
                </Form.Item>
              </Col>
            </Row>
            <Col span={24}>
              <Form.Item label="Story">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Form.Item label="Characters">
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
                <Col span={6}>
                  {" "}
                  <Input />
                </Col>
              </Row>
            </Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item label="Partner Image">
                  <Dragger style={{ width: "300px" }}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">Choose File</p>
                  </Dragger>
                </Form.Item>
              </Col>
              <Col span={8} offset={1}>
                <Form.Item label="Movie Image">
                  <Dragger style={{ width: "300px" }}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">Choose File</p>
                  </Dragger>
                </Form.Item>
              </Col>

              {/* <Col span={8}>
           
              </Col>
              <Col span={8}>
                <p>Movie Partner Image</p>
              </Col> */}

              <Form.Item label="Trailer Clip">
                <Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">Choose File</p>
                </Dragger>
              </Form.Item>
            </Row>
            <Form.Item {...tailLayout}>
              <Space>
                <Button className={formStyles.button}>Edit Movie</Button>
                <Button className={formStyles.button}>Remove</Button>
              </Space>
            </Form.Item>
          </Form>
        </Row>
      </center>
    </div>
  );
}

export default EditMovieForm;
