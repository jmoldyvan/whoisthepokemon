import axios from "axios";

export const allPokemonNames = async () => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000,fields=id,name/`)
    return res.data.results
  } catch (error) {
    console.error(error);
  }
}