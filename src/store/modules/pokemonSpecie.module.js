'use strict'

import { getAllPokemonSpecies, getPokemonSpecie } from '@/api/pokemon-species';

const state = {
	pokemonSpecies: []
};

const getters = {
	getPokemonSpecies(state) {
		return state.pokemonSpecies;
	},

	getPokemonSpecie: (state) => (id) => {
		return state.pokemonSpecies.find(pokemonSpecie => pokemonSpecie.name === id);
	}
};

const actions = {
	async fetchPokemonSpecies({ commit }) {
		try {
			const response = await getAllPokemonSpecies();
			commit('SET_POKEMON_SPECIES', response.data.results);
		} catch (error) {
			console.log(error);
		}
	},

	async fetchPokemonSpecie({ state, commit }, pokemonSpecieName) {
		try{
			const response = await getPokemonSpecie(pokemonSpecieName);
			return response.data
		} catch (error) {
			console.log(error);
		}
	}
};


const mutations = {
	SET_POKEMON_SPECIES(state, data) {
		state.pokemonSpecies = data;
	},

	SET_POKEMON_SPECIE(state, payload) {
		state.pokemonSpecies[payload.positionEdit].url = payload.response.data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}
