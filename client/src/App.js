import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Main from './Components/Main';
import { AuthProvider } from './contexts/AuthContext';
import ErrorMessage from "./Components/ErrorMessage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  return (
    <AuthProvider>
      <BrowserRouter>
        <ErrorMessage />
          <Routes>
            <Route exact path='/login' element={<Login />}>
            </Route>
            <Route path = '/' element={< Main/>} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
