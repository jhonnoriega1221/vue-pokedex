'use strict'

import { getAllEvolutionChains, getEvolutionChain } from '@/api/evolution-chain';

const state = {
	evolutionChains: []
};

const getters = {
};

const actions = {

	async fetchEvolutionChain({ state, commit }, evolutionChainId) {
		
		try{
			const response = await getEvolutionChain(evolutionChainId);
			return response.data;
		} catch (error) {
			console.log(error);
		}
		
	}
};


const mutations = {
};

export default {
	state,
	getters,
	actions,
	mutations,
		namespaced: true

}
