import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/Home.jsx';
import ShowTask from './components/ShowTask.jsx';
import Signin from './components/Signin.jsx';
import Login from './components/Login.jsx';
import AddTask from './components/AddTask.jsx';
import EditTask from './components/EditTask.jsx';

 
export const serverurl='http://localhost:1000'
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home'  element={<Home/>} />
      <Route path='/show'  element={<ShowTask/>} />
      <Route path='/signin'  element={<Signin/>} />
     <Route path='/login' element={<Login/>}/>
     <Route path='/addTask' element={<AddTask/>}/>
     <Route path='/edittask/:id' element={<EditTask/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
