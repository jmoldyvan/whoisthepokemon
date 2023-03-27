import React, {useState, useEffect} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

export default function AutocompleteSearch(props){

    const [autoCompleteStringValue, setAutoCompleteStringValue] = useState(String[0]);
    const [inputValue, setInputValue] = useState('');

function handleChange(event, newInputValue) {
    setAutoCompleteStringValue(newInputValue)
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
                        value={autoCompleteStringValue || null}
                        autoComplete
                        includeInputInList
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                          }}
                        renderInput={(params) => <TextField {...params} />}
                        getOptionLabel={(option) => option.name || ""}
                    />
                </div>
                <button 
                    onClick={() => props.takeGuess(autoCompleteStringValue.name)}   
                    style={styles}  
                    className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    >TAKE GUESS
                </button>
            </form>             
        </div>
    )
}