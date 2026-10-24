import { useEffect, useState } from 'react';
import React from 'react'
import axios from 'axios';

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Home from './components/Home.jsx';
import ShowTask from './components/ShowTask.jsx';
import Signin from './components/Signin.jsx';
import Login from './components/Login.jsx';
import AddTask from './components/AddTask.jsx';
import EditTask from './components/EditTask.jsx';


export const serverurl = 'https://task-management-system-5n39.onrender.com'

function EntryRoute() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios.get(`${serverurl}/api/check-auth`, {
      withCredentials: true
    })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setChecking(false));
  }, []);

  if (checking) return <p>Checking session...</p>;

  return authenticated
    ? <Navigate to="/home" replace />
    : <Navigate to="/signin" replace />;
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryRoute />} />
        <Route path='/home' element={<Home />} />
        <Route path='/show' element={<ShowTask />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addTask' element={<AddTask />} />
        <Route path='/edittask/:id' element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
