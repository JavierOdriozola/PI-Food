import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/recipes/:id' component={Detail}/>
      <Route exact path='/form' component={Form}/>
      <Redirect to='/home'/>
        </Switch>
      </div>
      </Router>
  );
}

export default App;
