import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Detail from './components/Detail/Detail.jsx';
import Form from './components/Form/Form.jsx';
import Home from './components/Home/Home.jsx';
import Landing from './components/Landing/Landing.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import About from './components/About/About.jsx';


import './App.css';

function App() {
  return (
      <>
        <Navbar/>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/recipes' component={Home}/>
        <Route exact path='/recipes/:id' component={Detail}/>
        <Route exact path='/create' component={Form}/>
        <Route exact path='/about' component={About}/>
      </>
  );
}

export default App;
