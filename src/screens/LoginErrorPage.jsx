import React from "react";


function LoginErrorPage(){

    const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

    return(
        <>
         <div className="header">
          <h1 className="h1">ADMINISTRATION</h1>
          <h2 className="date">
          <span style={{ fontWeight: "bold" , fontSize:"1vw"}}>TODAY : </span>
          {date}
        </h2>
        </div>
        <div style={{height:"40vw", width:"100vw", position: 'absolute', backgroundColor:'#040819'}}>
            <h2 style={{ fontWeight: "bold" , fontSize:"3vw" , color:"red"}}> LogIn First - <span style={{fontWeight:"normal" , fontSize:"2vw" , color:"yellow"}}>without login you can't do administrations</span></h2>
        </div>
        </>
    )
}

export default LoginErrorPage;