import axios from "axios";

// export const getPokemonInfo = async (props) => {
// // PROPS ISNT WORKING
//   console.log(props);
// // SLOPPY
// function makeArrayOfRangesFromSelectedGens(props){
//   const nonFiltered = Object.entries(props);
//   const filtered = nonFiltered.filter(([key, value]) => value === true);
//   const selectedGens = Object.fromEntries(filtered);
//   const selectedGensArray = Object.keys(selectedGens);
//   console.log(selectedGensArray);
//   // selectedGensArray.forEach(element => {
//   //   if(element==='gen1')
//   // });
// }

// function randomNumber(){
//   let randNum = Math.floor(Math.random() * 1000)
//   return randNum
// } 
  
//   try {
//     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber()}/`);
//     if(!res.data.sprites.other['official-artwork']['front_default']){
//       try {
//         const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber()}/`);
//         return res.data;
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     else{
//     return res.data;      
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

export const allPokemonNames = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000,fields=id,name/`)
    return res.data.results
  } catch (error) {
    console.error(error);
  }
}