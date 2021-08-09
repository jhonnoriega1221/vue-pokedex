import Vue from 'vue';
import Vuex from 'vuex';

import pokemonSpecieStore from './modules/pokemonSpecie.module';
import pokemonStore from './modules/pokemon.module';
import pokedexStore from './modules/pokedex.module';
import regionStore from './modules/region.module';
import typeStore from './modules/type.module';
import evolutionChainStore from './modules/evolutionChain.module';

Vue.use(Vuex)

export default new Vuex.Store({


  state: {
    mainBackground: ''
  },
  mutations: {
    SET_MAIN_BACKGROUND (state, data){
      state.mainBackground = data;
    }
  },
  actions: {
    setMainBackground ({commit}, value) { 
      commit('SET_MAIN_BACKGROUND', value)
    }
  },
  getters: {
    getMainBackground(state) {
      return state.mainBackground;
    }
  },
  modules: {
    pokemonSpecie:pokemonSpecieStore,
    pokemon:pokemonStore,
    pokedex:pokedexStore,
    region:regionStore,
    type:typeStore,
    evolutionChain:evolutionChainStore

  }
})
