'use strict'

import { getAllRegions, getRegion } from '@/api/region';

const state = {
	regions: []
};

const getters = {
	getRegions(state) {
		return state.regions;
	},

	getRegion: (state) => (id) => {
		return state.regions.find(region => region.name === id)
	}
};

const actions = {
	async fetchRegions({ commit }) {
		try {
			const response = await getAllRegions();
			//commit('SET_REGIONS', response.data.results);
			return response.data
		} catch (error) {
			console.log(error);
		}
	},

	async fetchRegion({state, commit}, value) {
		try {
			const response = await getRegion(value);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	}

};


const mutations = {
	SET_REGIONS(state, data) {
		state.regions = data;
	},
	SET_REGION(state, payload) {
		state.regions[payload.positionEdit].url = payload.response.data
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
