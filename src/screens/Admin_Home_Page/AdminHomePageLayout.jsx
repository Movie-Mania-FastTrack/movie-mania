import React from "react";
import MovieRequest  from "./MovieRequest";


function AdminHomePageLayout()
{
    return(
        <>
        <div style={{height:'auto', width:'100vw', position: 'absolute', backgroundColor:'#040819'}}>
            <MovieRequest/>
        </div>

        </>
    );
}

export default AdminHomePageLayout;