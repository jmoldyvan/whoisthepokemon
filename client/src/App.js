
import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Main from './Components/Main';
import WinTracker from './Components/WinTracker';
import { BrowserRouter, Routes, Route} from "react-router-dom";





export default function App() {

let [randomNumber, setRandomNumber] = useState(0)
let [winCondition, setWinCondition] = useState(false)
let [winTracker, setWinTracker] = useState(0)


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
            <Route path='/' element={<Login />}/>
            <Route path='/signup' element={<Signup />} />
            <Route path = '/main' element={<>< Main
              takeGuess={takeGuess}
              winCondition={winCondition}
            /> <WinTracker winTracker={winTracker} /></>} />
            
        </Routes>
    </BrowserRouter>
  );
}
