import React, {useState, useEffect} from "react";
import { useAuth } from "../contexts/AuthContext";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";
import { updateScore, getUserScore, updateHighScore, getUserHighScore } from "./Services";

export default function Main(){

    const { currentUser} = useAuth();
    const navigate = useNavigate();
    const [randomNumber, setRandomNumber] = useState(0)
    const [winCondition, setWinCondition] = useState(false)
    const [scoreCondition, setScoreCondition] = useState(false)
    const [comboTracker, setcomboTracker] = useState(0)
    const [highscoreTracker, setHighScoreTracker] = useState(0)
    let [userAnswer, setUserAnswer] = useState('')
    const [formData, setFormData] = React.useState()


// on initital render get the users score and put that value into the combo tracker state
    // getUserScore(currentUser)

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

useEffect(() => {
    updateAllScores()
}, [comboTracker]);
useEffect(() => {
    updateHighScores()
});

async function updateAllScores(){
    try {
        await updateScore(currentUser, comboTracker)
        await updateHighScore(currentUser, comboTracker)
        setScoreCondition(!scoreCondition)
    } catch (error) {
        console.log(error);
    }
}

async function updateHighScores(){
    try {
        let userHS = await (getUserHighScore(currentUser))
        setHighScoreTracker(userHS)
    } catch (error) {
        console.log(error);
    }
}

function takeGuess(guess){
    let numberGuess = Number(guess.guess)
    setWinCondition(randomNumber === numberGuess ? true : false)
    setcomboTracker(prevValue => { return randomNumber === numberGuess ? prevValue + 1 : prevValue=0})
  }

const styles = {
    pointerEvents : winCondition === true ? "none" : "all",
}

function handleChange(event) {
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
                <h1>You Have {comboTracker} combo</h1>
                <h1>Your HighScore {highscoreTracker}</h1>
                <Logout />
            </form>
        </div>
    )
}