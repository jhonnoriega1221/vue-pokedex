'use strict'

import { getAllPokedexes, getPokedex } from '@/api/pokedex';

const state = {
	pokedexes: []
};

const getters = {
	getPokedexes(state) {
		return state.pokedexes;
	}
};

const actions = {
	async fetchPokedexes({ commit }) {
		try {
			const response = await getAllPokedexes();
			commit('SET_POKEDEXES', response.data.results);
		} catch (error) {
			console.log(error);
		}
	},

	async fetchPokedex({ state, commit }, pokedexName) {
		
		try{
			const response = await getPokedex(pokedexName);
			return response.data;
		} catch (error) {
			console.log(error);
		}
		
	}
};


const mutations = {
	SET_POKEDEXES(state, data) {
		state.pokedexes = data;
	},
	SET_POKEDEX(state, payload) {
		state.pokedexes[payload.positionEdit].url = payload.response.data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations,
		namespaced: true

}
