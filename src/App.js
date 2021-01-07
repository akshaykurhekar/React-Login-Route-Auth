import './App.css';
import {   
    Switch,
    Route,
    Link
  } from "react-router-dom";
import SignIn from './MaterialUI/signin';
import SignUp from './MaterialUI/signup';
import Error from './MaterialUI/error';
import Dashbord from './MaterialUI/Dashbord';

function App() {
  return (
    <div className="App">
        <h1>React Login Auth. Using Node.js & MySql</h1>
        <Switch>
            <Route path={"/signin"} component={SignIn} exact />
            <Route path={"/signup"} component={SignUp} exact />
            <Route path={"/Dashbord"} component={Dashbord} exact />
            <Route component={Error}  />  
        </Switch>
    </div>
  );
}

export default App;
