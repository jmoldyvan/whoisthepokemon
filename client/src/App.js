
import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Main from './Components/Main';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";




export default function App() {

  const [randomNumber, setRandomNumber] = useState(0)
  const [winCondition, setWinCondition] = useState(false)
  const [winTracker, setWinTracker] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

function randomNumberBetweenOneAndTen(){
  let number = Math.floor(Math.random() * 10)
  setRandomNumber(number)
}

useEffect(() => {
    randomNumberBetweenOneAndTen()
}, []);

console.log(randomNumber);
function takeGuess(guess){
  console.log(guess.guess);
  let numberGuess = Number(guess.guess)
  setWinCondition(prevValue => {
      return randomNumber === numberGuess ? true : false
  })
  setWinTracker(prevValue => { return randomNumber === numberGuess ? prevValue + 1 : prevValue=0})
}
console.log(winCondition);

  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/'> {isLoggedIn ? <Navigate to="/main" /> : <Login />}
          </Route>
          <Route path = '/main' element={<>< Main
              takeGuess={takeGuess}
              winCondition={winCondition}
              winTracker={winTracker} /> </>} 
          />
                <Route path='/signup' element={<Signup />} />
             
            
        </Routes>
    </BrowserRouter>
  );
}
