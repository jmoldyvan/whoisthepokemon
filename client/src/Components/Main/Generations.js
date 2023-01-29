import React from "react"
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function Generations(props){

const highlight = {
    color : 'blue',
    backgroundColor : 'green'
}

return(
    <div className="">
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
            <div className={`poke-options-1-button ${!props.genertaions[2].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen3')}>Gen 3</div>
            <div className={`poke-options-1-button ${!props.genertaions[3].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen4')}>Gen 4</div>
            <div className={`poke-options-1-button ${!props.genertaions[4].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen5')}>Gen 5</div>
            <div className={`poke-options-1-button ${!props.genertaions[5].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen6')}>Gen 6</div>
            <div className={`poke-options-1-button ${!props.genertaions[6].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen7')}>Gen 7</div>
            <div className={`poke-options-1-button ${!props.genertaions[7].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen8')}>Gen 8</div>
            <div className={`poke-options-1-button ${!props.genertaions[8].selected ? 'selected' : ''}`} onClick= {() => props.toggleGeneration('gen9')}>Gen 9</div>
        </TransitionGroup>
    </div>
)
}