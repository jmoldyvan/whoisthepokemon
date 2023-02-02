import React from "react"

export default function Generations(props){

const highlight = {
    color : 'blue',
    backgroundColor : 'green'
}

return(
    <div className="">
        {/* {props.genertaions.map((elementObject, i) =>{
            return (
                <div>
                    {elementObject[`gen${i+1}`] ? <button onClick= {() => props.toggleGeneration(`gen${i+1}`)} style={highlight}>{`gen${i+1}`}</button> : <button onClick= {() => props.toggleGeneration(`gen${i+1}`)} >{`gen${i+1}`}</button>}
                </div>
            )
        })} */}            
        {props.genertaions[0].selected ? <button onClick= {() => props.toggleGeneration('gen1')} style={highlight}>Gen 1</button> : <button onClick= {() => props.toggleGeneration('gen1')} >Gen 1</button>}
        {props.genertaions[1].selected ? <button onClick= {() => props.toggleGeneration('gen2')} style={highlight}>Gen 2</button> : <button onClick= {() => props.toggleGeneration('gen2')} >Gen 2</button>}
        {props.genertaions[2].selected ? <button onClick= {() => props.toggleGeneration('gen3')} style={highlight}>Gen 3</button> : <button onClick= {() => props.toggleGeneration('gen3')} >Gen 3</button>}
        {props.genertaions[3].selected ? <button onClick= {() => props.toggleGeneration('gen4')} style={highlight}>Gen 4</button> : <button onClick= {() => props.toggleGeneration('gen4')} >Gen 4</button>}
        {props.genertaions[4].selected ? <button onClick= {() => props.toggleGeneration('gen5')} style={highlight}>Gen 5</button> : <button onClick= {() => props.toggleGeneration('gen5')} >Gen 5</button>}
        {props.genertaions[5].selected ? <button onClick= {() => props.toggleGeneration('gen6')} style={highlight}>Gen 6</button> : <button onClick= {() => props.toggleGeneration('gen6')} >Gen 6</button>}
        {props.genertaions[6].selected ? <button onClick= {() => props.toggleGeneration('gen7')} style={highlight}>Gen 7</button> : <button onClick= {() => props.toggleGeneration('gen7')} >Gen 7</button>}
        {props.genertaions[7].selected ? <button onClick= {() => props.toggleGeneration('gen8')} style={highlight}>Gen 8</button> : <button onClick= {() => props.toggleGeneration('gen8')} >Gen 8</button>}
        {props.genertaions[8].selected ? <button onClick= {() => props.toggleGeneration('gen9')} style={highlight}>Gen 9</button> : <button onClick= {() => props.toggleGeneration('gen9')} >Gen 9</button>}
    </div>
)
}