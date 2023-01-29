import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Components/UserCred/Login';
import Signup from './Components/UserCred/Signup';
import Main from './Components/Main/Main';
import ForgotPassword from './Components/UserCred/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import ErrorMessage from "./Components/ErrorMessage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthProvider >
      <BrowserRouter>
        <ErrorMessage />
          <Routes>
            <Route exact path='/login' element={<Login />}>
            </Route>
            <Route path = '/' element={< Main/>} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
// return (
//   <div id="app">
//     <main className="container">
//       <CSSTransition name="animate-section" in={isPlaying} timeout={500} classNames="animate-section">
//         <section className="poke-section" v-if={isPlaying}>
//           <h1 aria-live="polite" className="poke-title">
//             Who's that pokemon?
//           </h1>
//           <div className="poke-question-wrapper">
//             <h2 className="poke-question">
//               <span aria-live="polite" className="poke-question-number">
//                 <span className="sr-only">Question:</span>
//                 {question}
//               </span>
//               <span className="poke-question-amount">/ {questionAmount}</span>
//             </h2>
//             <span className="poke-score">
//               {score}
//               <small>pts</small>
//             </span>
//             <div className={`poke-image ${isChecked && selected.name === answer.name ? 'poke-image-success' : isChecked && selected.name !== answer.name ? 'poke-image-error' : ''}`}>
//               <img src={image} alt="No cheating" className="poke-image-img" />
//             </div>
//             <TransitionGroup tag="div" name="animate-options" className={`poke-options ${isChecked ? 'poke-options-answers' : ''}`}>
//               {options.map((pokemon, index) => (
//                 <div
//                   key={pokemon.name}
//                   data-index={index}
//                   className={`poke-options-button ${selected.index === index ? 'selected' : ''} ${isChecked && pokemon.name === answer.name ? 'success' : isChecked && selected.index === index && selected.name !== answer.name ? 'error' : ''}`}
//                   onClick={() => selectAnswer(pokemon.name, index)}
//                 >
//                   <input id={pokemon.name} value={pokemon.name} className="poke-options-control" name="poke" type="radio" />
//                   <label htmlFor={pokemon.name}>{prettifyName(pokemon.name)}</label>
//                 </div>
//               ))}
//             </TransitionGroup>
//             <footer className="poke-buttons">
//               <button disabled={isChecked || Object.keys(selected).length < 1} className="button" onClick={checkAnswer}>Submit</button>
//               <span className="sr-only" v-if={isChecked} aria-live="polite">
//                 {selected.name === answer.name ? 'Correct!' : `Incorrect, the correct answer was ${answer.name}.`}
//               </span>
//               <button disabled={!isChecked} className="button" onClick={getNextQuestion}>Next</button>
//             </footer>
//           </div>
//         </section>
//       </CSSTransition>
//     </main>
//   </div>
// );