import httpClient from './httpClient';

const END_POINT = '/evolution-chain'

const getAllEvolutionChains = () =>  httpClient.get(`${END_POINT}?limit=467`);

const getEvolutionChain = (evolution_chain_id) => httpClient.get(`${END_POINT}/${evolution_chain_id}`);

export {
	getAllEvolutionChains,
	getEvolutionChain
}