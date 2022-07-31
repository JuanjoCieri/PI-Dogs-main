import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Home from './components/Home';
import Landing from "./components/Landing"
import Form from './components/Form';
import Detail from './components/Detail';
import Nothing from './components/Nothing';
import About from './components/About';

import './App.css';
import Loading from './components/Loading';

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Landing}/>
          <Route exact path={"/home"} component={Home}/>
          {/* <Route exact path={"/home/*"} component={Nothing}/> */}
          <Route exact path={"/form"} component={Form}/>
          <Route exact path={"/home/:id"} component={Detail}/>
          <Route exact path={"/about"} component={About}/>
          <Route exact path={"/asd"} component={Loading}/>
          <Route path={"*"} component={Nothing}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
