import React, { useState } from "react";
import MovieRequest  from "./MovieRequest";


function AdminHomePageLayout()
{

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

    function changeAdmin(){

    }

    function addAdmin(){

    }

    function onclickEdit(){
        //navigate to manage movie
    }

    function onclickAdd(){
        //navigate to add movie
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