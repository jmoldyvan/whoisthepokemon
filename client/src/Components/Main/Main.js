import React, {useState, useEffect} from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Logout from "../UserCred/Logout";
import { useNavigate } from "react-router-dom";
import { updateScore, updateHighScore, getUserHighScore } from "../UserCred/Services";
import { allPokemonNames } from "./APIService";
import Leaderboard from "./Leaderboard";
import AutocompleteSearch from "./AutocompleteSearch"
import Generations from "./Generations";

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
    const [genertaions, setGenerations] = useState([
    { name: 'gen1', range: [1, 151], selected: true },
    { name: 'gen2', range: [151, 251], selected: true },
    { name: 'gen3', range: [252, 386], selected: true },
    { name: 'gen4', range: [387, 493], selected: true },
    { name: 'gen5', range: [494, 649], selected: true },
    { name: 'gen6', range: [650, 721], selected: true },
    { name: 'gen7', range: [722, 809], selected: true },
    { name: 'gen8', range: [810, 905], selected: true },
    { name: 'gen9', range: [906, 1000], selected: true },
    ])  

function getSelectedRanges(genertaions){
    const selectedRanges = genertaions
    .filter((generation) => generation.selected)
    .map((generation) => generation.range);
    const randomRange = selectedRanges[Math.floor(Math.random() * selectedRanges.length)];
    const randomID = Math.floor(Math.random() * (randomRange[1] - randomRange[0] + 1) + randomRange[0]);
    console.log(randomID);
    return randomID;

}

console.log(getSelectedRanges(genertaions));
async function getPokemonInfo() {        
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${getSelectedRanges(genertaions)}/`);
        if(!res.data.sprites.other['official-artwork']['front_default']){
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${getSelectedRanges(genertaions)}/`);
                return res.data;
            } catch (error) {
                console.error(error);
            }
        }
    else{
        return res.data;      
    }
    } catch (error) {
        console.error(error);
    }
};

async function generateRandomPokemon(genertaions){
    try {
    setWinCondition(false)
    let pokemonInfo = await getPokemonInfo(genertaions)
    await setRandomPokemonInfo(pokemonInfo)
    return true
    } catch (error) {
        console.log(error);
    }
  }

function toggleGeneration(chosenGeneration) {
    setGenerations(prevValue => {
        return prevValue.map((selGen) => {
            return selGen.name === chosenGeneration ? {...selGen, selected: !selGen.selected} : selGen
        })
    })
}

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
        generateRandomPokemon(genertaions)
        allNamesOfPokemon()
    }, []);

    useEffect(() => {
        updateAllScores()
        updateHighScores()
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
    let pokeGuess = guess
    setWinCondition(randomPokemonInfo.name === pokeGuess ? true : false)
    setcomboTracker(prevValue => { return randomPokemonInfo.name === pokeGuess ? prevValue + 1 : prevValue=0})
    updateHighScores()
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

randomPokemonInfo?console.log(randomPokemonInfo.name):console.log(null)

    return(
        <div>
            {currentUser ? <h3>Hello {currentUser.displayName}</h3> : <h3>Hello</h3>}
            <h3>Who's That Pokemon?</h3>
            {randomPokemonInfo ? <img style={pokemonShadow} src={randomPokemonInfo.sprites.other['official-artwork']['front_default']}></img> : <img></img>}
            {winCondition && <h3>It's {randomPokemonInfo.name}</h3>}
            <AutocompleteSearch
                pokemonNames={pokemonNames}
                takeGuess={takeGuess}
                winCondition={winCondition}
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
            <Generations 
                genertaions = {genertaions}
                toggleGeneration = {toggleGeneration}
            />
            <h1>You Have {comboTracker} combo</h1>
            <h1>Your HighScore {highscoreTracker}</h1>
            {leaderboardBool ? <Leaderboard handleLeaderboard={toggleLeaderboard} /> : <button onClick={() => toggleLeaderboard()}>Leaderboard</button>}
            <Logout />
        </div>
    )
}