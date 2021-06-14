import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pokedex from '../views/Pokedex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import (/*webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/pokedex',
    name: 'Pokedex',
    alias:'/pokedex?page=1',
    component: () => import (/* webpackChunkName: "pokedex" */ '../views/Pokedex.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import (/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pokemon/:pokemon_name',
    name: 'PokemonInfo',
    component: () => import (/* webpackChunkName: "pokemon-info" */ '../views/PokemonInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
