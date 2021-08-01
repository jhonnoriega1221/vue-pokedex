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
		let positionEdit = 0;
		for(const [i, pokemons] of state.pokemons.entries()){
			if(pokemons.name === pokemonName){
				positionEdit = i;
				break;
			}
		}

		try{
			const response = await getPokemon(pokemonName);
			commit('SET_POKEMON', {response, positionEdit});
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
