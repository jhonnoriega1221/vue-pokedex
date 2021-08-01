import httpClient from './httpClient';

const END_POINT = '/pokemon'

const getAllPokemons = () => {
	let pokemon = httpClient.get(`${END_POINT}?limit=1118`);
	return pokemon
}

const getPokemon = (pokemon_id) => httpClient.get(`${END_POINT}/${pokemon_id}`);

export {
	getAllPokemons,
	getPokemon
}