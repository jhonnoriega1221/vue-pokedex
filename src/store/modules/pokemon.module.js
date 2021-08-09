'use strict'

import { getAllPokemons, getPokemon } from '@/api/pokemon';

const state = {
	pokemons: []
};

const getters = {
	getPokemons(state) {
		return state.pokemons;
	},

	getPokemon: (state) => (id) => {
		return state.pokemons.find(pokemon => pokemon.name === id);
	}
};

const actions = {
	async fetchPokemons({ commit }) {
		try {
			const response = await getAllPokemons();
			commit('SET_POKEMONS', response.data.results);
		} catch (error) {
			console.log(error);
		}
	},

	async fetchPokemon({ state, commit }, pokemonName) {
		try{
			const response = await getPokemon(pokemonName);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
};


const mutations = {
	SET_POKEMONS(state, data) {
		state.pokemons = data;
	},
	SET_POKEMON(state, payload) {
		state.pokemons[payload.positionEdit].url = payload.response.data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations,
		namespaced: true

}
