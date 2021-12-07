import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home.jsx';
import Landing from './components/Landing.jsx';
import React from 'react';



function App() {
  return (
      <div className="App">
        <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
        </Switch>
      </div>
  );
}

export default App;
