import React, { useState } from "react";
import MovieRequest  from "./MovieRequest";


function AdminHomePageLayout()
{
    const[movies , setMovies] = useState[[]]
    useEffect(()=>{
        movieManiaApi.get("/getMovies",{

        })
        .then((res) => { 
            console.log("result - ",res.data)
            setMovies(res.data)
        })
  
      // Catch errors if any
      .catch((err) => { 
        console.log(err)
      });
          
        },[])

        function deleteMovie(id){
            movieManiaApi.get("/deleteMovie"+id,{

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

        function editMovie(id){
            localStorage.setItem("movieId",id)
            //navigate to edit movie page
        }


    return(
        <>
        <div style={{height:'auto', width:'100vw', position: 'absolute', backgroundColor:'#040819'}}>
            <MovieRequest/>
        </div>

        </>
    );
}

export default AdminHomePageLayout;