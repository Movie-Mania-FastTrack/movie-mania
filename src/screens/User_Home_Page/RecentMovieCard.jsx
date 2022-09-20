import React , {useEffect , useState} from "react";
import {Link} from 'react-router-dom';
import movieManiaApi from "../../api/movieManiaApi";
import {useNavigate} from 'react-router-dom';
import HomePageStyles from "./HomePage.module.css";

function RecentMovieCard (movieImage)
{
    const [recentMovies , setRecentMovies] = useState([])
    const[slideIndex , setSlideIndex] = useState(0)
    const[slideMovies , setSlideMovies] = useState([])
    const testMovies = [{name:"m1"},{name:"m2"},{name:"m3"},{name:"m4"},{name:"m5"},{name:"m6"},{name:"m7"},{name:"m8"},{name:"m9"}]
    const width= 15;
    const height = 17;



    const navigate = useNavigate();
    
    useEffect(()=>{
        localStorage.removeItem("singleMovie")
        movieManiaApi.get("/getMovies",{

        })
        .then((res) => { 
            console.log("result - ",res.data)
            let singleArray = []
            let doubleArray = []
            let indexSingle = 0
            let indexDouble=0
            for(var i=0; i<res.data.length; i++){
                singleArray[indexSingle] = res.data[i]
                indexSingle++
                if(indexSingle>5){
                    console.log("Single Array ",singleArray)
                    doubleArray[indexDouble] = singleArray
                    singleArray=[]
                    indexSingle=0
                    indexDouble+=1
                }
            }
            doubleArray[indexDouble] = singleArray
            setRecentMovies(doubleArray)
            console.log("Double Array ",doubleArray)
            //setMoviesSlide(res.data)
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
            setMoviesSlide(recentMovies)
        }

        function movePreviosSlide(){
            setMoviesSlide2(recentMovies)
        }
        
        function moveToSingle(movie){
            //console.log("movie",movie)
            localStorage.setItem("singleMovie",JSON.stringify(movie))
            navigate("/single_movie_home")

        }

    return(
        <>
       
       <div>
            {recentMovies.length!== 0 && recentMovies.map((movieList,index)=>(
                    <div style={{position:"absolute",height:'12vw', width:'100vw',top:height*index+2+"vw",left:"0"}}>
                        {movieList.map((movie,index)=>(

<div className={HomePageStyles.card} style={{position:"absolute",height:'14vw', width:'13vw',backgroundColor:'white',textAlign:"center",backgroundColor:'yellow', opacity:'0.7', borderRadius:'0.9vw',top:"0", boxShadow:'0.1vw 0.1vw #656568',left:width*index+2+"vw"}} onClick={()=>moveToSingle(movie)}> 
<p style={{fontSize:"1.1vw",color:"#01011B", fontWeight:'550',paddingTop:'1vw' }}><b>{movie.name}</b></p>
<img style={{position:"absolute",height:'70%', width:'100%',backgroundColor:'white', borderRadius:'0.9vw',top:"30%",left:"0vw"}} src={movie.imageUrl}></img>
</div>


                        ))}
                    </div>
                ))}
                </div>
         
       
        </>
    );
}

export default RecentMovieCard;