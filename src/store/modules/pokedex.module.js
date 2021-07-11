'use strict'

import { getAllPokedexes, getPokedex } from '@/api/pokedex';

const state = {
	pokedexes: []
};

const getters = {
	getPokedexes(state) {
		return state.pokedexes;
	},

	getPokedex: (state) => (id) => {
		return state.pokedexes.find(pokedex => pokedex.name === id);
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
		let positionEdit = 0;
		for(const [i, pokedexes] of state.pokedexes.entries()){
			if(pokedexes.name === pokedexName){
				positionEdit = i;
				break;
			}
		}

		try{
			const response = await getPokedex(pokedexName);
			commit('SET_POKEDEX', {response, positionEdit});
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
