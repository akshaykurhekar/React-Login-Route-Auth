import React,{useState, useEffect, useReducer} from 'react';
import './App.css';
import { BrowserRouter as Router,  
    Switch,
    Route,
    Link
  } from "react-router-dom";
 
  import Axios from 'axios';  
import SignIn from './MaterialUI/signin';
import SignUp from './MaterialUI/signup';
import Error from './MaterialUI/error';
import Dashbord from './MaterialUI/Dashbord';
import PrivateRout from './PrivateRout';
import { connect } from 'react-redux';

function App(props) {

    const [isAuth, setAuth]=useReducer(props.isAuth);

    console.log(props);
    // useEffect(()=>{
    //     setAuth(props.isAuth);
    // },[])

  return (
    <React.Fragment>
    <div className="App">
        <h1>React Login Auth. Using Node.js & MySql {props.isAuth} </h1>
        
        <Router>        
            <Switch>
                <Route path={"/"} component={SignIn} exact />
                <Route path={"/signup"} component={SignUp} exact />
                <PrivateRout path={"/Dashbord"} component={Dashbord} isAuth={isAuth} />
                <Route component={Error}  />  
            </Switch>
        </Router> 
    </div>
    </React.Fragment>
  );
}
 
const mapStateToProps = (state)=>{
    return{
        isAuth: state.isAuth
    }
}



export default connect(mapStateToProps)(App);
