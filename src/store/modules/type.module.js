'use strict'

import { getAllTypes, getType } from '@/api/type';

const state = {
	types: []
};

const getters = {
	getTypes(state) {
		return state.types;
	}
};

const actions = {
	async fetchTypes({ commit }) {
		try {
			const response = await getAllTypes();
			commit('SET_TYPES', response.data);
		} catch (error) {
			console.log(error);
		}
	},

	async fetchType({ state, commit }, value) {
		let positionEdit = 0;

		//MODIFICAR ESTE FOR con FIND
		for(const [i, type] of state.types.entries()) {
			if(type.name === value) {
				positionEdit = i
				break;
			}
		}

		try {
			const response = await getType(value);
			commit('SET_TYPE', {response, positionEdit});
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
