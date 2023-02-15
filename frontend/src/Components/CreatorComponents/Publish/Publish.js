import React from 'react'
import Navbar from "../Navbar/Navbar";
import { useLocation,useParams,useNavigate } from "react-router-dom";


const Publish=(props)=>{
    const navigate=useNavigate();
    const location=useLocation();
    const {email}=useParams();

    const hostname=window.location.hostname
    const port=window.location.port
    const formID=location.state.formID
    const url=`http://${hostname}:${port}/userend/${formID}`;

    return(
        <div>
            <Navbar email={email}/>
            <h1>Publish Form</h1>
            <div>
                <h2>Generated Link :</h2>

                <h3 style={{color:"blue",cursor:"pointer" }} onClick={()=>{navigate(`/userend/${formID}`)}}>{url}</h3>
                <button onClick={() => { navigator.clipboard.writeText(url) }}>Copy to clipboard</button>
            </div>
        </div>
    )
}


export default Publish;