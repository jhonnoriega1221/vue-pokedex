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
			commit('SET_REGIONS', response.data.results);
		} catch (error) {
			console.log(error);
		}
	},

	async fetchRegion({state, commit}, value) {
		let positionEdit = 0;

		//MODIFICAR ESTE FOR con FIND
		for(const [i, region] of state.regions.entries()){
			if(region.name === value){
				positionEdit = i

				break;
			}
		}

		try {
			const response = await getRegion(value);
			commit('SET_REGION', {response, positionEdit});
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
