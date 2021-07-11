'use strict'

import { getAllPokedexes, getPokedex } from '@/api/pokedex';

const state = {
	pokedexes: []
};

const getters = {
	getPokedexes(state) {
		return state.pokedexes;
	},

	getPokedex(state, id){
		return state.pokedex
	}
};

const actions = {
	async fetchPokedexes({ commit }, id) {
		try {
			const response = await getAllPokedexes();
			commit('SET_POKEDEXES', response.data.results);
		} catch (error) {
			console.log(error);
		}
	},

	fetchPokedex({ state, commit }, pokedexName) {
		let position = 0;
		for(const [i, pokedexes] of state.pokedexes){
			if(pokedexes.name === pokedexName){
				position = i;
				break;
			}
		}
	}
};


const mutations = {
	SET_POKEDEXES(state, data) {
		state.pokedexes = data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations,
		namespaced: true

}
