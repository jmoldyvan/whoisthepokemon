import React, {useState, useEffect} from "react";
import { useAuth } from "../../contexts/AuthContext";
import Logout from "../UserCred/Logout";
import { useNavigate } from "react-router-dom";
import { updateScore, updateHighScore, getUserHighScore } from "../UserCred/Services";
import { getPokemonInfo, allPokemonNames } from "./APIService";
import Leaderboard from "./Leaderboard";
import AutocompleteSearch from "./AutocompleteSearch"

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
    const [genertaions, setGenerations] = useState({
        gen1: true,
        gen2: true,
        gen3: true,
        gen4: true,
        gen5: true,
        gen6: true,
        gen7: true,
        gen8: true,
        gen9: true,
    })

async function generateRandomPokemon(genertaions){
    try {
    setWinCondition(false)
    // pass in the highlighted generations to only produce those generation pokemon
    let pokemonInfo = await getPokemonInfo(genertaions)
    await setRandomPokemonInfo(pokemonInfo)
    return true
    } catch (error) {
        console.log(error);
    }
  }

  randomPokemonInfo?console.log(randomPokemonInfo.name):console.log(null)

async function allNamesOfPokemon() {
    try {
        // pass in the highlighted generations to only produce those generation pokemon namnes
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
const highlight = {
    color : 'blue',
    backgroundColor : 'green'
}

function toggleLeaderboard() {
    setLeaderboardBool(prevValue => !prevValue)
}

function toggleGeneration(chosenGeneration) {
    setGenerations(prevValue => {
        return {
            ...prevValue,
            [chosenGeneration]: !prevValue[chosenGeneration]
        }
    })
}

function giveUpRevealAnswer(){
    setWinCondition(true)
    setcomboTracker(0)
}

// console.log(genertaions);

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
            {/* {genertaions.map((elementObject, i) =>{
                return (
                    <div>
                        {elementObject[`gen${i+1}`] ? <button onClick= {() => toggleGeneration(`gen${i+1}`)} style={highlight}>{`gen${i+1}`}</button> : <button onClick= {() => toggleGeneration(`gen${i+1}`)} >{`gen${i+1}`}</button>}
                    </div>
                )
            })} */}
            {genertaions.gen1 ? <button onClick= {() => toggleGeneration('gen1')} style={highlight}>Gen 1</button> : <button onClick= {() => toggleGeneration('gen1')} >Gen 1</button>}
            {genertaions.gen2 ? <button onClick= {() => toggleGeneration('gen2')} style={highlight}>Gen 2</button> : <button onClick= {() => toggleGeneration('gen2')} >Gen 2</button>}
            {genertaions.gen3 ? <button onClick= {() => toggleGeneration('gen3')} style={highlight}>Gen 3</button> : <button onClick= {() => toggleGeneration('gen3')} >Gen 3</button>}
            {genertaions.gen4 ? <button onClick= {() => toggleGeneration('gen4')} style={highlight}>Gen 4</button> : <button onClick= {() => toggleGeneration('gen4')} >Gen 4</button>}
            {genertaions.gen5 ? <button onClick= {() => toggleGeneration('gen5')} style={highlight}>Gen 5</button> : <button onClick= {() => toggleGeneration('gen5')} >Gen 5</button>}
            {genertaions.gen6 ? <button onClick= {() => toggleGeneration('gen6')} style={highlight}>Gen 6</button> : <button onClick= {() => toggleGeneration('gen6')} >Gen 6</button>}
            {genertaions.gen7 ? <button onClick= {() => toggleGeneration('gen7')} style={highlight}>Gen 7</button> : <button onClick= {() => toggleGeneration('gen7')} >Gen 7</button>}
            {genertaions.gen8 ? <button onClick= {() => toggleGeneration('gen8')} style={highlight}>Gen 8</button> : <button onClick= {() => toggleGeneration('gen8')} >Gen 8</button>}
            {genertaions.gen9 ? <button onClick= {() => toggleGeneration('gen9')} style={highlight}>Gen 9</button> : <button onClick= {() => toggleGeneration('gen9')} >Gen 9</button>}
            <h1>You Have {comboTracker} combo</h1>
            <h1>Your HighScore {highscoreTracker}</h1>
            {leaderboardBool ? <Leaderboard handleLeaderboard={toggleLeaderboard} /> : <button onClick={() => toggleLeaderboard()}>Leaderboard</button>}
            <Logout />
        </div>
    )
}