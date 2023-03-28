import React, {useState, useEffect} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

export default function AutocompleteSearch(props){

    const [autoCompleteStringValue, setAutoCompleteStringValue] = useState(String[0]);

function handleChange(event) {
    setAutoCompleteStringValue(prevAutoCompleteStringValue => {
        return {
            ...prevAutoCompleteStringValue,
            [event.target.name]: event.target.value.toLowerCase()
        }
    })
}
function handleSubmit(event) {
    event.preventDefault()
}

const styles = {
    pointerEvents : props.winCondition === true ? "none" : "all",
}

    return( 
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Autocomplete
                        options={props.pokemonNames}
                        sx={{ width: 300 }}
                        onChange={handleChange}
                        id="pokeNameAutocomplete"
                        value={autoCompleteStringValue}
                        autoComplete
                        includeInputInList
                        renderInput={(params) => <TextField {...params} label="Names" />}
                    />
                </div>
                <button 
                    onClick={() => props.takeGuess(autoCompleteStringValue)}   
                    style={styles}  
                    className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    >TAKE GUESS
                </button>
            </form>             
        </div>
    )
}