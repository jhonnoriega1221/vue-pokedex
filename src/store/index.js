import Vue from 'vue';
import Vuex from 'vuex';

import pokemonSpecieStore from './modules/pokemonSpecie.module';
import pokedexStore from './modules/pokedex.module';
import regionStore from './modules/region.module';

Vue.use(Vuex)

export default new Vuex.Store({


  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    pokemonSpecie:pokemonSpecieStore,
    pokedex:pokedexStore,
    region:regionStore

  }
})
