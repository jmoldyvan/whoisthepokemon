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

    return( 
        <div> 
            <form onSubmit={handleSubmit}>
                <div
                    className={`poke-options-button ${props.selectTab[0].selected === true ? 'selected' : ''} ${props.winConditionAnimation === 1 ? 'success' : props.winConditionAnimation === 2 ? 'error' : '' }`}
                    onClick={() => props.selectA('autocomplete')}
                >
                    <Autocomplete
                        options={props.pokemonNames}
                        sx={{ 
                            width: 300,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "0",
                                padding: "0"
                            },
                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #eee"
                            }
                        }}
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
                <div 
                    onClick={() => {autoCompleteStringValue!==undefined ? props.takeGuess(autoCompleteStringValue.name) : props.takeGuess(null)}}
                    className={`poke-options-button ${props.selectTab[1].selected === true ? 'selected' : ''} ${props.winConditionAnimation === 1 ? 'success' : props.winConditionAnimation === 2 ? 'error' : '' }`}  
                    >TAKE GUESS
                </div>
            </form>             
        </div>
    )
}