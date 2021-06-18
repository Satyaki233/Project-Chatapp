import React from 'react'
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import './App.css';


import Join from './Components/Join/Join'
import Chat from './Components/Chat/Chat'

function App() {
  return (
   <Router>
     <div style={{height:'100%'}} >
     <Switch>
       <Route path="/" exact component={Join}/>
       <Route path="/Chat" component={Chat}/>
     </Switch>

     </div>
    
   </Router>
  );
}

export default App;
