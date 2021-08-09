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
  },
  mutations: {
  },
  actions: {
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
