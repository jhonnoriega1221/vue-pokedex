import httpClient from './httpClient';

const END_POINT = '/pokemon'

const getAllPokemons = () => httpClient.get(END_POINT);

const getPokemon = (pokemon_id) => httpClient.get(END_POINT,{pokemon_id});

export {
	getAllPokemons,
	getPokemon
}