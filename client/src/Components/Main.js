import React, {useState, useEffect} from "react";
import { useAuth } from "../contexts/AuthContext";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import { updateScore, updateHighScore, getUserHighScore } from "./Services";
import { getPokemonInfo, allPokemonNames } from "./APIService";
import Leaderboard from "./Leaderboard";
import AutocompleteSearch from "./AutocompleteSearch"
// need mui autocomplete
// npm install @mui/material @emotion/react @emotion/styled

export default function Main(){

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [randomPokemonInfo, setRandomPokemonInfo] = useState()
    const [winCondition, setWinCondition] = useState(false)
    const [scoreCondition, setScoreCondition] = useState(false)
    const [leaderboardBool, setLeaderboardBool] = useState(false)
    const [comboTracker, setcomboTracker] = useState(0)
    const [highscoreTracker, setHighScoreTracker] = useState(0)
    const [pokemonNames, setPokemonNames] = useState()

async function generateRandomPokemon(){
    try {
    setWinCondition(false)
    let pokemonInfo = await getPokemonInfo()
    await setRandomPokemonInfo(pokemonInfo)
    return true
    } catch (error) {
        console.log(error);
    }
  }

  randomPokemonInfo?console.log(randomPokemonInfo.name):console.log(null)

async function allNamesOfPokemon() {
    try {
        let names = await allPokemonNames()
        let allNames = names.map((x, i) => {
            return {name:x.name, id:(i+1)}
        })        
        await setPokemonNames(allNames)
        return true
    } catch (error) {
        console.log(error);
    }
}

    useEffect(() => {
        if(!currentUser){
            navigate("/login");
            }
        generateRandomPokemon()
        allNamesOfPokemon()
    }, []);
    useEffect(() => {
        updateAllScores()
        updateHighScores()
    }, [comboTracker]);

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
    let pokeGuess = guess
    setWinCondition(randomPokemonInfo.name === pokeGuess ? true : false)
    setcomboTracker(prevValue => { return randomPokemonInfo.name === pokeGuess ? prevValue + 1 : prevValue=0})
  }

const styles = {
    pointerEvents : winCondition === true ? "none" : "all",
}

const oppositeStyles = {
    pointerEvents : winCondition === false ? "none" : "all",
}

const pokemonShadow = {
    filter : winCondition === false ? 'brightness(0)' : null,
    pointerEvents : "none"
}

function toggleLeaderboard() {
    setLeaderboardBool(prevValue => !prevValue)
}

function giveUpRevealAnswer(){
    setWinCondition(true)
    setcomboTracker(0)
}

    return(
        <div>
            {currentUser ? <h3>Hello {currentUser.displayName}</h3> : <h3>Hello</h3>}
            <h3>Who's That Pokemon?</h3>
            {randomPokemonInfo ? <img style={pokemonShadow} src={randomPokemonInfo.sprites.other['official-artwork']['front_default']}></img> : <img></img>}
            {winCondition && <h3>It's {randomPokemonInfo.name}</h3>}
            <AutocompleteSearch
                pokemonNames={pokemonNames}
                takeGuess={takeGuess}

            />
            <button 
                style={oppositeStyles} 
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" 
                onClick={generateRandomPokemon} 
                >Next Pokemon
            </button>
            <button
                style={styles}  
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" 
                onClick={giveUpRevealAnswer} 
                >Give Up
            </button>
            <h1>You Have {comboTracker} combo</h1>
            <h1>Your HighScore {highscoreTracker}</h1>
            {leaderboardBool ? <Leaderboard handleLeaderboard={toggleLeaderboard} /> : <button onClick={() => toggleLeaderboard()}>Leaderboard</button>}
            <Logout />
        </div>
    )
}