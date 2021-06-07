<template>
    <div class="pokedex" v-if="pokemonsURLList">
        <h1 class="pb-7">Pokedex</h1>
        <v-row>
            <v-col 
            class="pa-2" cols="6" sm="4" md="3" lg="3" xl="2" v-for="(pokemon, i) in 12"
            v-bind:key="i">
                <Pokecard v-bind:pokemonURL="pokemonsURLList[i]"/>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>
import Pokecard from '@/components/PokemonCard.vue'

import axios from 'axios';

    export default {
        components: {
            Pokecard
        },
        data: () => {
            return {
                pokemonsURLList: ''
            }
        },
        mounted(){
            this.getPokemonsURLs()
        },
        methods:{
            async getPokemonsURLs(){
                await axios.get('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0').then(
                    res => {
                        this.pokemonsURLList = res.data.results
                    }
                )
            }
        }
    }
</script>

<style lang="scss">

</style>
