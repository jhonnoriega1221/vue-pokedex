<template>
    <div class="pokedex" >
        <!--Pokedex title-->
        <h1 class="pb-7">Pokedex</h1>

        <!--Pokemons cards row-->
        <div >
            <v-row>
                <v-col 
                class="pa-2" cols="6" sm="4" md="3" lg="3" xl="2" v-for="(pokemon, i) in apiLimit"
                v-bind:key="i">

                    <!--Pokemon card-->
                    <div v-if="pokemonsURLList">
                        <Pokecard v-bind:pokemonURL="pokemonsURLList[i]"/>
                    </div>

                    <!--Pokemon card skeleton loader-->
                    <div v-else>
                        <v-skeleton-loader 
                        type="image"
                        style="border-radius: 20px"
                        height="193px"
                        >
                        </v-skeleton-loader>
                    </div>
                </v-col>
            </v-row>
        </div>

        <!--Pokedex pagination-->
        <v-pagination
        class="py-8"
        :length="75"
        :total-visible="8"
        circle
        v-model="paginationPage"
        @input="nextPage"
        >
        </v-pagination>
        
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
                pokemonsURLList: '',
                apiLimit:12,
                apiOffset:0,
                paginationPage:0
            }
        },
        mounted(){
            this.setPagination();
            this.getPokemonsURLs(this.apiLimit, this.paginationPage)
        },
        watch: {
            $route (to, from) {
                this.setPagination();
                this.pokemonsURLList=''
                window.scrollTo(0,0)
                this.getPokemonsURLs(this.apiLimit, this.paginationPage)
            }
        },
        methods: {
            async getPokemonsURLs(limit, page){
                this.apiOffset = limit * (page-1)

                await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${this.apiOffset}`).then(
                    res => {
                        this.pokemonsURLList = res.data.results
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },
            setPagination(){
                if(!this.$route.query.page){
                    this.$route.query.page = '1'
                    this.paginationPage = parseInt(this.$route.query.page)
                } else {
                    this.paginationPage = parseInt(this.$route.query.page)
                }
            },
            nextPage(page) {
                this.$router.push({name:'Pokedex', query:{page:page}})
            }
        }
    }
</script>

<style lang="scss">

</style>
