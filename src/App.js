import React from "react";
import { BrowserRouter as Router, Route, Switch ,Link} from "react-router-dom";
import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';

import Login from "./components/Login";
import "./styles.scss";

function App() {


  const logout = () =>{
    localStorage.removeItem('token');   // added this action to remove token and connect bubblepage and login page without entering a link to browser's field
  }

  return (
    <Router>
      <div className="App">
        <Link to='/' onClick={logout}>Logout</Link>     
        <Switch>
        <PrivateRoute path='/bubblepage' component={BubblePage}/>
        <Route exact path="/" component={Login}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute