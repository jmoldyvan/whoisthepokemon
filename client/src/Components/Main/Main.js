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
import { TransitionGroup, CSSTransition } from "react-transition-group";


export default function Main(){

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [randomPokemonInfo, setRandomPokemonInfo] = useState()
    const [winCondition, setWinCondition] = useState(false)
    const [winConditionAnimation, setWinConditionAnimation] = useState(0)
    const [scoreCondition, setScoreCondition] = useState(false)
    const [leaderboardBool, setLeaderboardBool] = useState(false)
    const [comboTracker, setcomboTracker] = useState(0)
    const [highscoreTracker, setHighScoreTracker] = useState(0)
    const [pokemonNames, setPokemonNames] = useState()
    const [selectTab, setSelectTab] = useState([
        {name: 'autocomplete', selected: false},
        {name: 'submit', selected: false}
    ])
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
    setSelectTab([
        {name: 'autocomplete', selected: false},
        {name: 'submit', selected: false}
    ])
    setWinCondition(false)
    setWinConditionAnimation(0)
    let pokemonInfo = await getPokemonInfo(genertaions)
    await setRandomPokemonInfo(pokemonInfo)
    return true
    } catch (error) {
        console.log(error);
    }
  }

function toggleGeneration(chosenGeneration) {
    setGenerations(prevValue => {
        const selectedGenerations = prevValue.filter(selGen => selGen.selected);
        const isLastSelected = selectedGenerations.length === 1 && selectedGenerations[0].name === chosenGeneration;
        
        return prevValue.map(selGen => {
            if (selGen.name === chosenGeneration) {
                if (isLastSelected) {
                    return selGen;
                } else {
                    return {...selGen, selected: !selGen.selected};
                }
            } else {
                return selGen;
            }
        });
    });
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
    setWinConditionAnimation(randomPokemonInfo.name === pokeGuess ? 1 : 2)
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
    setSelectTab([
        {name: 'autocomplete', selected: false},
        {name: 'submit', selected: false}
    ])
    setWinCondition(true)
    setWinConditionAnimation(2)
    setcomboTracker(0)
}

function selectA(index){
    setSelectTab(prevValue => {
        return prevValue.map((cell) => {
            return cell.name === index ? {...cell, selected: !cell.selected} : cell
        })
    })
}

randomPokemonInfo?console.log(randomPokemonInfo.name):console.log(null)

    return(
        <div id="app">
            <main className="container" >
                <CSSTransition name="animate-section" classNames="animate-section">
                    <section className="poke-section" >
                        {currentUser ? <h1 className="poke-title">Hello {currentUser.displayName}</h1> : <h1 className="poke-title">Hello</h1>}
                        <h1 className="">Who's That Pokemon?</h1>
                        <div className="poke-question-wrapper">
                            <h2 className="poke-question">
                                <span aria-live="polite" className="poke-question-number">
                                <span className="sr-only">Current Combo:</span>
                                {comboTracker}
                                </span>
                                {/* <span className="poke-question-amount">/ {questionAmount}</span>                                 */}
                            </h2>
                            <span className="poke-score">
                                {highscoreTracker}
                                <small> HIGH SCORE</small>
                            </span>
                            <div className={`poke-image ${winConditionAnimation === 1 ? 'poke-image-success' : winConditionAnimation === 2 ? 'poke-image-error' : ''}`}>
                                {randomPokemonInfo ? <img /*className="poke-image-img"*/ style={pokemonShadow} src={randomPokemonInfo.sprites.other['official-artwork']['front_default']}></img> : <img></img>}                               
                            </div>
                            {winCondition && <h3>It's {randomPokemonInfo.name}</h3>}
                            <TransitionGroup tag="div" name="animate-options" className={`poke-options ${winConditionAnimation ? 'poke-options-answers' : ''}`}>
                                <AutocompleteSearch
                                    pokemonNames={pokemonNames}
                                    takeGuess={takeGuess}
                                    winCondition={winCondition}
                                    winConditionAnimation={winConditionAnimation}
                                    selectA={selectA}
                                    selectTab={selectTab}
                                />
                                {leaderboardBool ? <Leaderboard winConditionAnimation={winConditionAnimation} handleLeaderboard={toggleLeaderboard} /> : 
                                <div className={`poke-options-button`} onClick={() => toggleLeaderboard()}>Leaderboard</div>}
                            </TransitionGroup>
                            <Logout winConditionAnimation={winConditionAnimation} />
                            <footer className="poke-buttons">
                                <button 
                                    style={oppositeStyles} 
                                    className="button" 
                                    onClick={generateRandomPokemon} 
                                    >Next Pokemon
                                </button>
                                <button
                                    style={styles}  
                                    className="button" 
                                    onClick={giveUpRevealAnswer} 
                                    >Give Up
                                </button>
                            </footer>
                            <Generations 
                                genertaions = {genertaions}
                                toggleGeneration = {toggleGeneration}
                            />
                        </div>
                    </section>
                </CSSTransition>
            </main>
        </div>
    )
}
