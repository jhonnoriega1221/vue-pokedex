import httpClient from './httpClient';

const END_POINT = '/pokedex'

const getAllPokedexes = () =>  httpClient.get(`${END_POINT}?limit=28`);

const getPokedex = (pokedex_id) => httpClient.get(`${END_POINT}/${pokedex_id}`);

export {
	getAllPokedexes,
	getPokedex
}