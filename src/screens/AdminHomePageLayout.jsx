import React from "react";
import MovieRequest  from "./MovieRequest";


function AdminHomePageLayout()
{
    return(
        <>
        <div style={{height:'100%', width:'100%', position: 'fixed', backgroundColor:'#040819'}}>
            <MovieRequest/>
        </div>

        </>
    );
}

export default AdminHomePageLayout;