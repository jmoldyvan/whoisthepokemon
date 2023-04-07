import React from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function Generations(props){

const highlight = {
    color : 'blue',
    backgroundColor : 'green'
}

return(
    <div >
        <TransitionGroup tag="div" name="animate-options" className={`poke-options-1`}>

            {/* {props.genertaions.map((elementObject, i) =>{
                return (
                    <div>
                        {elementObject[`gen${i+1}`] ? <button onClick= {() => props.toggleGeneration(`gen${i+1}`)} style={highlight}>{`gen${i+1}`}</button> : <button onClick= {() => props.toggleGeneration(`gen${i+1}`)} >{`gen${i+1}`}</button>}
                    </div>
                )
            })} */}            
            <div className={`poke-options-1-button ${!props.genertaions[0].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen1')}><button>Gen 1</button></div>
            <div className={`poke-options-1-button ${!props.genertaions[1].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen2')}><button>Gen 2</button></div>
            <div className={`poke-options-1-button ${!props.genertaions[2].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen3')}><button>Gen 3</button></div>
            <div className={`poke-options-1-button ${!props.genertaions[3].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen4')}><button>Gen 4</button></div>
            <div className={`poke-options-1-button ${!props.genertaions[4].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen5')}><button>Gen 5</button></div>
            <div className={`poke-options-1-button ${!props.genertaions[5].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen6')}><button>Gen 6</button></div>
            <div className={`poke-options-1-button ${!props.genertaions[6].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen7')}><button>Gen 7</button></div>
            <div className={`poke-options-1-button ${!props.genertaions[7].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen8')}><button>Gen 8</button></div>
            <div className={`poke-options-1-button ${!props.genertaions[8].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen9')}><button>Gen 9</button></div>
        </TransitionGroup>
    </div>
)
}