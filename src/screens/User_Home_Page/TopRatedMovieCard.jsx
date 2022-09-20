import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';
import HomePageStyles from "./HomePage.module.css";

function TopRatedMovieCard ()
{
    const navigate = useNavigate();
    const [topMovies , setTopMovies] = useState([])
    const[slideIndex , setSlideIndex] = useState(0)
    const[slideMovies , setSlideMovies] = useState([])
    const testMovies = [{name:"m1"},{name:"m2"},{name:"m3"},{name:"m4"},{name:"m5"},{name:"m6"},{name:"m7"},{name:"m8"},{name:"m9"}]
    const width= 15;

    useEffect(()=>{
        localStorage.removeItem("singleMovie")
        movieManiaApi.get("/getMovieTop",{

        })
        .then((res) => { 
            console.log("result - ",res.data)
            setTopMovies(res.data)
            setMoviesSlide(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });
      
      
      
        },[])

        function setMoviesSlide(movies){
            if(slideIndex+6<movies.length){
                const slideMoviesCopy = []
                for(let i = slideIndex; i<slideIndex+6; i++){
                    
                    slideMoviesCopy.push(movies[i])
                    console.log(movies[i])

                }
                setSlideMovies(slideMoviesCopy)
                setSlideIndex(slideIndex+6)
            }
            else{
               if(slideIndex<movies.length){
                const slideMoviesCopy = []
                for(let i = slideIndex; i<movies.length; i++){
                    
                    slideMoviesCopy.push(movies[i])

                }
                setSlideMovies(slideMoviesCopy)
                setSlideIndex(movies.length)
               }
            }
        }

        function setMoviesSlide2(movies){

            let index = slideIndex%6
          //  alert(index)
            if(index==0){
                if(slideIndex-6>0){
                    const slideMoviesCopy = []
                    for(let i = slideIndex-12; i<slideIndex-6; i++){
                        
                        slideMoviesCopy.push(movies[i])
                        console.log(movies[i])
    
                    }
                    setSlideMovies(slideMoviesCopy)
                    setSlideIndex(slideIndex-6)
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
                    for(let i = slideIndex-start; i<slideIndex-index; i++){
                        
                        slideMoviesCopy.push(movies[i])
                        console.log(movies[i])
    
                    }
                    setSlideMovies(slideMoviesCopy)
                    setSlideIndex(slideIndex-index)

                }
                
            }
        }

        function moveNextSlide(){
            setMoviesSlide(topMovies)
        }

        function movePreviosSlide(){
            setMoviesSlide2(topMovies)
        }
        

        function moveToSingle(movie){
            //console.log("movie",movie)
            localStorage.setItem("singleMovie",JSON.stringify(movie))
            navigate("/single_movie_home")

        }
            
    return(
        <>
         
         <div>
            {topMovies.length!== 0 && slideMovies.map((movie,index)=>(
                    <div className={HomePageStyles.topRatedCard} style={{position:"absolute",height:'13vw', width:'11vw', backgroundColor:'#CAB51D', opacity:'0.9',boxShadow:'0vw 0.1vw #656568',textAlign:"center", borderRadius:'0.9vw',top:"0",left:width*index+2+"vw"}} onClick={()=>moveToSingle(movie)}> 
                     <p style={{fontSize:"1.1vw",color:"#01011B", fontWeight:'550',paddingTop:'1vw' }}><b>{movie.name}</b></p>
                    <img style={{position:"absolute",height:'70%', width:'100%',backgroundColor:'white', borderRadius:'0.9vw',top:"30%",left:"0vw"}} src={movie.imageUrl}></img>
                    </div>
                ))}
                <div style={{fontSize:'2.4vw', color:'black',position:"absolute",background:"#676523",width:"3vw",height:"3vw",borderWidth:"10px",borderColor:"red",borderRadius:"100%",right:"0", padding:'1vw 0px 0px 1vw', opacity:'0.8' , cursor:"pointer", top:'5vw'}} onClick={moveNextSlide}><b style={{position:"absolute",left:"29%",top:"-24%"}}>{'>'}</b></div>
              <div style={{fontSize:'2.4vw', color:'black',position:"absolute",background:"#676523",width:"3vw",height:"3vw",borderWidth:"10px",borderColor:"red",borderRadius:"100%",left:"-3vw", padding:'1vw 0px 0px 1vw', opacity:'0.8' , cursor:"pointer",top:'5vw'}} onClick={movePreviosSlide}><b style={{position:"absolute",left:"29%",top:"-24%"}}>{'<'}</b></div>
              
            </div>
         
       
        </>
    );
}

export default TopRatedMovieCard