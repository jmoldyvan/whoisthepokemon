import axios from "axios";

export const getPokemonInfo = async () => {

let randomNumber = Math.floor(Math.random() * 1000)
  
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`);
    if(res.data.sprites.other['official-artwork']['front_default']){
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    }
    else{
    console.log(res.data);
    return res.data;      
    }
  } catch (error) {
    console.error(error);
  }
};

export const allPokemonNames = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000,fields=id,name/`)
    console.log(res.data.results);
    return res.data.results
  } catch (error) {
    console.error(error);
  }
}