'use strict'

import { getAllTypes, getType } from '@/api/type';

const state = {
	types: []
};

const getters = {
	getTypes(state) {
		return state.types;
	},

	getType: (state) => (id) => {
		return state.types.find(type => type.name === id);
	}
};

const actions = {
	async fetchTypes({ commit }) {
		try {
			const response = await getAllTypes();
			//commit('SET_TYPES', response.data.results);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},

	async fetchType({ state, commit }, value) {
		try {
			const response = await getType(value);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}
};


const mutations = {
	SET_TYPES(state, data) {
		state.types = data;
	},
	SET_TYPE(state, payload) {
		state.types[payload.positionEdit].url = payload.response.data
	}
};

export default {
	namespaced: true,	
	state,
	getters,
	actions,
	mutations
}
