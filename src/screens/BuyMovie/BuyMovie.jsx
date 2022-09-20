import React, { useEffect, useState } from "react";
import styles from "./BuyMovie.module.css";
import { Row, Col, Radio, Select,Button, Input } from "antd";
import {Link} from 'react-router-dom';
import { PlusCircleOutlined } from "@ant-design/icons";
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';

const { Option } = Select;
function BuyMovie() {

  const navigate = useNavigate();
  
  const movieCount=12;
    const payableAmount = 300.00;
    const[code , setCode] = useState("")
    const[requst , setRequest] = useState({})
    const[customerName , setCustomerName] = useState("")
    const[customerEmail , setCustomerEmail] = useState("")
    const[contact , setContact] = useState("")
    const[driverLink , setDriverLink] = useState("")
    const[logicPay , setLogicPay] = useState(false)
    const[movie , setMovie] = useState({})
    const[movieId , setMovieId] = useState(0)
    const[movies , setMovies] = useState([])
    const[selectedMovies , setSelectedMovies] = useState([])
    const[requestCount , setRequestCount] = useState(0)
    const[selectPrice , SetSelectedPrice] = useState(0)
    const[movieName , setMovieName] = useState("")
    const[slideIndexSelected , setSlideIndexSelected] = useState(0)
    const[slideMoviesSelected , setSlideMoviesSelected] = useState([])
    const[paymentMethod , setPaymentMethod] = useState(0)
    const[driverLinkLogic , setDriverLinkLogic] = useState(false)
    const[moreMovies , setMoreMovies] = useState(false)

    const payment_methods = [{method:"Pickup from the shop",value:0},{method:"Collect To The Drive",value:1}]

    const width= 15;

    const current = new Date();
    const date = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;

    function ValidateEmail(email) 
{
    var atCount = 0
    var atIndex = 0
    var dotIndex=0
    var dotCount =0
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456790"
    for(let i=0; i<email.length ; i++){
        if(email[i]==' '){
            alert("space")
            return(false)
        }
        else{
            if(email[i]=='@'){
                atIndex=i
                atCount+=1
            }
        }
    }

    if(atCount==1){
        if(letters.includes(email[email.length-1])&&letters.includes(email[atIndex+1])){
            for(let i=atIndex+1; i<email.length; i++){
                if(email[i]=="."){
                    dotIndex=i
                    dotCount+=1
                }
            }
            if(dotCount==1){
                if(letters.includes(email[dotIndex+1])){
                    dotCount=0
                    for(let i=0; i<atIndex; i++){
                        if(email[i]=="."){
                            dotCount+=1
                        }
                    }
                    if(dotCount==1||dotCount==0){
                        return(true)
                    }
                    else{
                       // alert("2. in username")
                        return(false)
                    }
                }
                else{
                   // alert("after . not a letter")
                    return(false)
                }
            }
            else{
               // alert("2.")
                return(false)
            }
        }
        else{
          //  alert("not a letter")
            return(false)
        }
    }
    else{
      //  alert("2@")
        return(false)
    }


}

    function addMultipleMovies(){
      const request = {customerName,customerEmail,contact,driverLink,payableStatus:"payable"}
      localStorage.setItem("request",JSON.stringify(request))
      localStorage.setItem("movies",JSON.stringify(movies))
      console.log(localStorage.getItem("movies"))
      navigate("/multiple_movie_select")
    }

    function getRequestByCode(){
      if(code!=""){
        movieManiaApi.get("/getRequest"+code)
      .then((res) => { 
        setRequest(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
      }
      else{
        alert("enter code first please")
      }
    }

    function addPayableRequest(){
      console.log("length ")
      if(customerEmail!="" && customerName !="" && driverLink != "" && contact!=""){
        var string = "none"
        
        const request = {customerName,customerEmail,contact,driverLink,payableStatus:"payable"}
        const requestDto = {request:request,movies}
        console.log("movies",requestDto)
        movieManiaApi.post("/addRequest/"+string,{
          customerName,
          customerEmail,
          contact,
          driverLink,
          payableStatus:"payable",
          movie : movie.movieId
        })
        .then((res) => { 
          alert(res.data)
          if(res.data=="error"){
            navigate("/movie_trailor_page")
          }
          else{
            for(let i=2; i<movies.length; i++){
              movieManiaApi.post("/addRequest/"+res.data,{
                customerName,
                customerEmail,
                contact,
                driverLink,
                payableStatus:"payable",
                movie : movies[i]
              })
              .then((res2) => { 
              if(i==movies.length-1){
                alert("Successfully Added & Your Code Is -: "+res2.data)
                
              }
                
                
            })
            // Catch errors if any
        .catch((err) => { 
          console.log(err)
        });
            }

            alert("Your Full Payment For This Request : "+selectPrice)
            window.location.reload()
            
          }
      })
      // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
      }
      else{
        alert("please Fill The form")
      }
        
    }

    function addNotPayableRequest(){
      if(customerEmail!="" && customerName !="" && contact!=""){
        var string = "none"
        
        const request = {customerName,customerEmail,contact,driverLink,payableStatus:"payable"}
        const requestDto = {request:request,movies}
        console.log("movies",requestDto)
        movieManiaApi.post("/addRequest/"+string,{
          customerName,
          customerEmail,
          contact,
          driverLink,
          payableStatus:"notPayable",
          movie : movie.movieId
        })
        .then((res) => { 
          alert(res.data)
          if(res.data=="error"){
            navigate("/movie_trailor_page")
          }
          else{
            for(let i=2; i<movies.length; i++){
              movieManiaApi.post("/addRequest/"+res.data,{
                customerName,
                customerEmail,
                contact,
                driverLink,
                payableStatus:"notPayable",
                movie : movies[i]
              })
              .then((res2) => { 
              if(i==movies.length-1){
                alert("Successfully Added & Your Code Is -: "+res2.data)
                
              }
                
                
            })
            // Catch errors if any
        .catch((err) => { 
          console.log(err)
        });
            }

            alert("Your Full Payment For This Request : "+selectPrice)
            window.location.reload()
          }
      })
      // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
      }
      else{
        alert("please Fill The form")
      }

  
    }

    function cancleRequest(){

      if(code!=""){
        movieManiaApi.get("/cancelRequest"+code)
      .then((res) => { 
        alert(res.data)
    })

  // Catch errors if any
  .catch((err) => { 
    console.log(err)
  });
      }
      else{
        alert("enter code first please")
      }

    }


    function onclickCheck(){
      alert("hee")
    }

    useEffect(()=>{
        if(localStorage.getItem("request")!=null){
          const reques = JSON.parse(localStorage.getItem("request"))
          console.log(reques)
          setContact(reques.contact)
          setCustomerEmail(reques.customerEmail)
          setCustomerName(reques.customerName)
          setDriverLink(reques.driverLink)
          //alert("hello")
          const moviesOld = JSON.parse(localStorage.getItem("movies"))
          if(moviesOld==0){
            navigate("/")
          }
          localStorage.removeItem("movies")
          localStorage.removeItem("request")
          console.log("moviesOld",moviesOld)
        movieManiaApi.post("/getMoviesByID",
          moviesOld
        )
          .then((res) => { 
            console.log(res.data)
            setSelectedMovies(res.data)
            setMoviesSlideSelected(res.data)
           // setRequestCount(res.data[0].rate)
           var price =0 ;
           for(let i=0; i<res.data.length; i++){
            price+=res.data[i].price
           }
            SetSelectedPrice(price)
            setMoreMovies(true)
        })
    
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });
          setMovies(moviesOld)
          setMovie(moviesOld[0])

        }
        else{
          const movie = JSON.parse( localStorage.getItem("singleMovie"))  
          setMovieId(movie.movieId)
          setMoreMovies(false)
          console.log("movies : ",movies)
          console.log("id : ",movie.movieId)
          movies.push(movie.movieId)
          console.log("movies : ",movies)
          selectedMovies.push(movie)
          setRequestCount(movie.rate)
          SetSelectedPrice(movie.price)
          setMovieName(movie.name)
          movieManiaApi.get("/getMovie/"+movie.movieId )
          .then((res) => { 
            console.log(res.data)
            //selectedMovies.push(res.data)
            setMovie(res.data)
           // setRequestCount(res.data[0].rate)
        })
    
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });
        }
      },[])


      function setMoviesSlideSelected(movies){
        if(slideIndexSelected+6<movies.length){
            const slideMoviesCopy = []
            for(let i = slideIndexSelected; i<slideIndexSelected+6; i++){
                
                slideMoviesCopy.push(movies[i])
                console.log(movies[i])
    
            }
            setSlideMoviesSelected(slideMoviesCopy)
            setSlideIndexSelected(slideIndexSelected+6)
        }
        else{
           if(slideIndexSelected<movies.length){
            const slideMoviesCopy = []
            for(let i = slideIndexSelected; i<movies.length; i++){
                
                slideMoviesCopy.push(movies[i])
    
            }
            setSlideMoviesSelected(slideMoviesCopy)
            setSlideIndexSelected(movies.length)
           }
        }
    }
    
    function setMoviesSlideSelected2(movies){
    
        let index = slideIndexSelected%6
      //  alert(index)
        if(index==0){
            if(slideIndexSelected-6>0){
                const slideMoviesCopy = []
                for(let i = slideIndexSelected-12; i<slideIndexSelected-6; i++){
                    
                    slideMoviesCopy.push(movies[i])
                    console.log(movies[i])
    
                }
                setSlideMoviesSelected(slideMoviesCopy)
                setSlideIndexSelected(slideIndexSelected-6)
            }
            // else{
            //    if(slideIndex>0){
            //     const slideMoviesCopy = []
            //     for(let i = 0; i<slideIndex; i++){
                    
            //         slideMoviesCopy.push(movies[i])
                    
    
            //     }
            //     console.log(slideMoviesCopy)
            //     setSlideMovies(slideMoviesCopy)
            //     setSlideIndex(0)
            //    }
            // } 
        }
        else{
            if(movies.length>6){
            let start = index+6
            const slideMoviesCopy = []
                for(let i = slideIndexSelected-start; i<slideIndexSelected-index; i++){
                    
                    slideMoviesCopy.push(movies[i])
                    console.log(movies[i])
    
                }
                setSlideMoviesSelected(slideMoviesCopy)
                setSlideIndexSelected(slideIndexSelected-index)
    
            }
            
        }
    }
    
    function moveNextSlideSelected(){
        setMoviesSlideSelected(selectedMovies)
    }
    
    function movePreviosSlideSelected(){
        setMoviesSlideSelected2(selectedMovies)
    }

    function onchangeCollection(value){
     // alert(value)
     setPaymentMethod(value)
      if(value==1){
        setDriverLinkLogic(true)
      }
      else{
        setDriverLinkLogic(false)
      }
    }

    function contactValidation(){
      if(contact.length!=10){
        return false
      }
      return true
    }

    function submit(){
      var emailValidity = ValidateEmail(customerEmail)
      var contactValidity = contactValidation()

      if(!contactValidity){
        alert("Error Contact Type Contact Length 10 Characters")
        return
      }
      if(!emailValidity){
        alert("Error Email Type")
        return
      }
      if(paymentMethod==0){
        if(customerName==""||customerEmail==""||contact==""){
          alert("Please Fill The Full Form")
          return
        }

        addNotPayableRequest()
        
      }
      else{
        if(customerName==""||customerEmail==""||contact==""||driverLink==""){
          alert("Please Fill The Full Form")
          return
        }
        addPayableRequest()
      }
      navigate("/")
    }

    function moveToSingle(movie){
      //console.log("movie",movie)
      localStorage.setItem("singleMovie",JSON.stringify(movie))
      const request = {customerName,customerEmail,contact,driverLink,payableStatus:"payable"}
      localStorage.setItem("request",JSON.stringify(request))
      localStorage.setItem("movies",JSON.stringify(movies))
      navigate("/single_movie_home")

  }

return(
  <>
   <div className="header">
          <h1 className="h1" >BUY MOVIES</h1>
       
        </div>
        <div style={{height:"55vw", width:"100vw", position: 'absolute', backgroundColor:'#00010F'}}>
        {moreMovies?<div style={{height:"15vw", width:"100vw", position: 'absolute', backgroundColor:'#00010F',top:"0",left:"5vw"}}>
          <h2 style={{color:"yellow" , fontSize:"1.3vw", opacity:'0.5'}}>Selected Movies</h2>
          {selectedMovies.length!== 0 && slideMoviesSelected.map((movie,index)=>(
                    <div style={{position:"absolute",height:'15vw', width:'10vw', borderRadius:'0.9vw',top:"0",left:width*index+2+"vw"}} onClick={()=>moveToSingle(movie)}>
                      <div style={{position:"absolute",height:'12vw', width:'10vw',textAlign:"center",backgroundColor:'white', borderRadius:'0.9vw',top:"12%",left:"0"}} > 
                      <p style={{fontSize:"1vw",color:"black"}}><b>{movie.name}</b></p>
                    <img style={{position:"absolute",height:'70%', width:'100%',backgroundColor:'white', borderRadius:'0.9vw',top:"30%",left:"0vw"}} src={movie.imageUrl}></img>
                  </div>
                    </div>
                    
                ))}
                <div style={{fontSize:'2.4vw', color:'black',position:"absolute",background:"#676523",width:"3vw",height:"3vw",borderWidth:"10px",borderColor:"red",borderRadius:"100%",right:"8vw", padding:'1vw 0px 0px 1vw', opacity:'0.8' , cursor:"pointer"}} onClick={moveNextSlideSelected}><b style={{position:"absolute",left:"29%",top:"-24%"}}>{'>'}</b></div>
              <div style={{fontSize:'2.4vw', color:'black',position:"absolute",background:"#676523",width:"3vw",height:"3vw",borderWidth:"10px",borderColor:"red",borderRadius:"100%",left:"-3vw", padding:'1vw 0px 0px 1vw', opacity:'0.8' , cursor:"pointer"}} onClick={movePreviosSlideSelected}><b style={{position:"absolute",left:"29%",top:"-24%"}}>{'<'}</b></div>
        </div>:<div style={{height:"15vw", width:"100vw", position: 'absolute', backgroundColor:'#00010F',top:"0",left:"5vw"}}>
        <h2 style={{color:"white" , fontSize:"1vw"}}>Selected Movies</h2>
        <div style={{position:"absolute",height:'12vw', width:'10vw',backgroundColor:'white',textAlign:"center", borderRadius:'0.9vw',top:"10%",left:"0"}} onClick={()=>moveToSingle(movie)}> 
                      <p style={{fontSize:"1vw",color:"red"}}><span style={{color:"blue"}}></span> <b>{movie.name}</b></p>
                    <img style={{position:"absolute",height:'70%', width:'100%',backgroundColor:'white', borderRadius:'0.9vw',top:"30%",left:"0vw"}} src={movie.imageUrl}></img>
                  </div>
          </div>}
        <div div style={{height:"32vw", width:"100vw", position: 'absolute', backgroundColor:'#00010F',top:"18vw",left:"5vw"}}>
          <button className={styles.addMoreBtn} style={{position:"absolute",width:"10vw",height:"2.4vw",top:"0",background:"#F0A116", marginLeft:'10vw', color:'white', cursor:'pointer'}} onClick={addMultipleMovies}>Add More Movies</button>
          <label style={{ color:"yellow",opacity:'0.7',position: 'absolute',paddingLeft:"4vw",top:"15%",fontSize:"1.2vw"}}>Name </label>
      <input style={{ color:"white",position: 'absolute',left:"0",top:"22%",fontSize:"1vw",marginLeft:"4vw", backgroundColor:'transparent', borderColor:'yellow', borderRadius:'0.5vw', height:'2.5vw', width:'22vw', borderWidth:'0.2vw'}} value={customerName} onChange={(e) => setCustomerName(e.target.value)}></input>
      <label style={{ color:"yellow",opacity:'0.7',position: 'absolute',paddingLeft:"4vw",top:"34%",fontSize:"1.2vw"}}>Contact No</label>
      <input style={{ color:"white",position: 'absolute',left:"0",top:"39%",fontSize:"1vw",marginLeft:"4vw",backgroundColor:'transparent', borderColor:'yellow', borderRadius:'0.5vw', height:'2.5vw', width:'22vw', borderWidth:'0.2vw'}} type="number" value={contact} onChange={(e) => setContact(e.target.value)}></input>
      <label style={{ color:"yellow",opacity:'0.7',position: 'absolute',paddingLeft:"4vw",top:"49%",fontSize:"1.2vw"}}>Email Address</label>
      <input style={{ color:"white",position: 'absolute',left:"0",top:"54%",fontSize:"1vw",marginLeft:"4vw",backgroundColor:'transparent', borderColor:'yellow', borderRadius:'0.5vw', height:'2.5vw', width:'22vw', borderWidth:'0.2vw'}} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)}></input>
      <label style={{ color:"yellow",opacity:'0.7',position: 'absolute',paddingLeft:"4vw",top:"65%",fontSize:"1.2vw"}} >Collection Method</label><br></br>
                <select name="Category" id="cate" style={{ color:"black",position: 'absolute',left:"0",top:"71%",fontSize:"1vw",marginLeft:"4vw", borderWidth:'0.2vw'}}
                onChange={(e)=>onchangeCollection(e.target.value)}
                >
                  {payment_methods.map((method)=>(<option value={method.value}>{method.method}</option>))}  
  
 
</select>
{driverLinkLogic?<div>
  <label style={{ color:"yellow",opacity:'0.7',position: 'absolute',left:"0",top:"80%",fontSize:"1vw", paddingLeft:'4vw'}}>Driver Link </label>
      <input style={{ color:"white",position: 'absolute',left:"0",top:"85%",fontSize:"1vw", marginLeft:'4vw',backgroundColor:'transparent', borderColor:'yellow', borderRadius:'0.5vw', height:'2.5vw', width:'30vw', border:'0.5'}} value={driverLink} onChange={(e) => setDriverLink(e.target.value)}></input>
      <button style={{position:"absolute",width:"10vw",height:"2.2vw",top:"99%",marginLeft:'8vw',background:"yellow", opacity:'0.7', color:'black', fontWeight:'750', boxShadow:'0.15vw 0.2vw grey', border:'none', cursor:'pointer'}} onClick={submit}>Send Request</button>
</div>:<div>
<button style={{position:"absolute",width:"10vw",height:"2.2vw",top:"91%",marginLeft:'8vw',background:"yellow", opacity:'0.7', color:'black', fontWeight:'750', boxShadow:'0.15vw 0.2vw grey', border:'none', cursor:'pointer'}} onClick={submit}>Send Request</button>
  </div>}
        </div>
          <div style={{position:'absolute', height:'30vw', width:'40vw', top:'40%', marginLeft:'50vw'}}>
           <center><h3 style={{color:'white', fontWeight:'700', fontSize:'1.4vw'}}>Steps to follow :</h3></center> 
            <ol style={{fontSize:'1.2vw', fontWeight:'650', color:'white', lineHeight:'3vw'}}>
              <li>This screen shows the movies that you have selected.</li>
              <li>If you want to select more, you need to click on 'add movies' button.</li>
              <li>Then, you will be redirected to movie selection screen and you can add multiple movies from there.</li>
              <li>Check that all the required movies are in the list.</li>
              <li>Finally submit the form by filling the relevant details in the form.</li>
            </ol>
          </div>
       </div>
  </>
)
  
}

export default BuyMovie;
