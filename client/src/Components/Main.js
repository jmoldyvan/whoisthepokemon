import React, {useState} from "react";


export default function Main(props){


let [userAnswer, setUserAnswer] = useState('')
const [formData, setFormData] = React.useState()

const styles = {
    pointerEvents : props.winCondition === true ? "none" : "all",
}
// const styl = {
//     pointerEvents : props.winCondition === false ? "none" : "all",
// }
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
    // console.log(formData)
}
    return(
        <div>
            <h3>What Number Am I Thinking Of?</h3>
            {props.winCondition && <h3>correct</h3>}
            <form onSubmit={handleSubmit}>
                <input name="guess" onChange={handleChange}></input>
                <button onClick={()=> props.takeGuess(formData)} 
                style={styles}  
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">TAKE GUESS
                </button>
                <button>Next Number</button>
                <h1>{props.winTracker}</h1>
            </form>
        </div>
    )
}