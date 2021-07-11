'use strict'

import { getAllPokemonSpecies, getPokemonSpecie } from '@/api/pokemon-species';

const state = {
	pokemonSpecies: []
};

const getters = {
	getPokemonSpecies(state) {
		return state.pokemonSpecies;
	}
};

const actions = {
	async fetchPokemonSpecies({ commit }) {
		try {
			const response = await getAllPokemonSpecies();
			commit('SET_POKEMON_SPECIES', response.data);
		} catch (error) {
			console.log(error);
		}
	}
};


const mutations = {
	SET_POKEMON_SPECIES(state, data) {
		state.pokemonSpecies = data;
	}
};

export default {
	state,
	getters,
	actions,
	mutations,
	namespaced: true
}
