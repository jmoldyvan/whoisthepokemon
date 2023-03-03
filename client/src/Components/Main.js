import React, {useState, useEffect} from "react";
import { useAuth } from "../contexts/AuthContext";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";

export default function Main(){

    const { currentUser} = useAuth();
    const navigate = useNavigate();
    const [randomNumber, setRandomNumber] = useState(0)
    const [winCondition, setWinCondition] = useState(false)
    const [winTracker, setWinTracker] = useState(0)
    let [userAnswer, setUserAnswer] = useState('')
    const [formData, setFormData] = React.useState()




function randomNumberBetweenOneAndTen(){
    setWinCondition(false)
    let number = Math.floor(Math.random() * 10)
    setRandomNumber(number)
  }

  useEffect(() => {
    randomNumberBetweenOneAndTen()
    if(!currentUser){
    navigate("/login");
}
}, []);


function takeGuess(guess){
    console.log(guess.guess);
    let numberGuess = Number(guess.guess)
    setWinCondition(randomNumber === numberGuess ? true : false)
    setWinTracker(prevValue => { return randomNumber === numberGuess ? prevValue + 1 : prevValue=0})
  }

const styles = {
    pointerEvents : winCondition === true ? "none" : "all",
}

function handleChange(event) {
    console.log(event);
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [event.target.name]: event.target.value
        }
    })
}
function handleSubmit(event) {
    event.preventDefault()
}

console.log(randomNumber);
console.log(currentUser);


    return(
        <div>
            {currentUser ? <h3>Hello {currentUser.displayName}</h3> : <h3>Hello</h3>}
            <h3>What Number Am I Thinking Of? ONLY 1-10</h3>
            {winCondition && <h3>correct</h3>}
            <form onSubmit={handleSubmit}>
                <input name="guess" onChange={handleChange}></input>
                <button onClick={()=> takeGuess(formData)} 
                    style={styles}  
                    className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">TAKE GUESS
                </button>
                <button onClick={randomNumberBetweenOneAndTen} >Next Number</button>
                <h1>You Have {winTracker} combo</h1>
                <Logout />
            </form>
        </div>
    )
}