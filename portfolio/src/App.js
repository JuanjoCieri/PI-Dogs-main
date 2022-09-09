import React from 'react';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom"
import Home from './components/Home';
import Landing from "./components/Landing"
import Form from './components/Form';
import Detail from './components/Detail';
import Nothing from './components/Nothing';
import Aboutt from './components/Aboutt';
import DetailTemperament from './components/Temperaments';
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Landing />}/>
          <Route path={"/home"} element={<Home />}/>
          <Route path={"/form"} element={<Form />}/>
          <Route path={"/home/:id"} element={<Detail />}/>
          <Route path={"/temperament/:id"} element={<DetailTemperament />}/>
          <Route path={"/about"} element={<Aboutt />}/>
          <Route path={"*"} element={<Nothing />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
