import httpClient from './httpClient';

const END_POINT = '/type'

const getAllPokemonSpecies = () => {
	let pokemon_specie = httpClient.get(`${END_POINT}?limit=898`);
	return pokemon_specie
}

const getPokemonSpecie = (pokemonSpecie_id) => httpClient.get(END_POINT,{pokemonSpecie_id});

export {
	getAllPokemonSpecies,
	getPokemonSpecie
}