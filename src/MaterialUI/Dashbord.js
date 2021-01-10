import React from "react";
import {withRouter} from "react-router-dom";
import { useHistory } from "react-router";

function Dashbord(){
    const history = useHistory();
    const handelLogin=()=>{
        //localStorage.setItem('isAuth',false);
        localStorage.clear();
        history.push('/');
    }

    return (
        <div>
            <h1> Dashbord.......</h1>
            <button onClick={handelLogin}> LogOut </button>
        </div>    
        );
}

export default withRouter(Dashbord);