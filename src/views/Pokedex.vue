<template>
    <div class="pokedex" >
        <div class="d-flex">
            <!--Pokedex title-->
            <div>
                <h1 class="pb-7 pr-3">Pokédex</h1>
            </div>

            <!--Filter button (Desktop)-->

            <v-btn
            text
            color="accent"
            class="mt-2"
            :hidden="this.$vuetify.breakpoint.mobile"
            @click="showFilterDialog()"
            >
                <v-icon left>filter_alt</v-icon>
            Filtrar
            </v-btn>
        </div>

        <!--Filter FAB button (Mobile)-->
        <v-btn
        fab
        elevation="2"
        :hidden="$route.hash=='#search'"
        right
        color="accent"
        fixed
        bottom
        large
        class="mb-14"
        @click="showFilterDialog()"
        v-if="this.$vuetify.breakpoint.mobile"
        >
            <v-icon>filter_alt</v-icon>
        </v-btn>
        
        <!--Pokemons cards row-->
        <div >
            <v-row>
                <v-col 
                class="pa-2" cols="6" sm="4" md="3" lg="3" xl="2" v-for="(pokemon, i) in apiLimit"
                v-bind:key="i">

                    <!--Pokemon card-->
                    <div v-if="pokemonSpeciesURLList">
                        <Pokecard v-bind:pokemonSpecieURL="pokemonSpeciesURLList[i]"/>
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
        class="py-8 mb-12 mb-lg-0"
        :length="75"
        :total-visible="8"
        circle
        v-model="paginationPage"
        @input="nextPage"
        >

        </v-pagination>

        <!--Form de filtros-->
        <FilterForm/>

    </div>
</template>

<script>
import Pokecard from '@/components/PokemonCard.vue'
import FilterForm from '@/components/FilterForm.vue'

import axios from 'axios';

    export default {
        components: {
            Pokecard,
            FilterForm
        },
        data: () => {
            return {
                pokemonSpeciesURLList: '', //Lista de las especies de pokemon obtenidas de la API
                apiLimit:12, //Limite de consulta de la API
                apiOffset:0, //Offset de la consulta de la API
                paginationPage:0 //Posición del paginador
            }
        },
        mounted(){
            this.setPagination(); //Metodo que determina la paginación de acuerdo la query en el router
            this.getPokemonSpeciesURLs(this.apiLimit, this.paginationPage) //Metodo que obtiene los datos de la API
        },
        watch: {
            $route (newVal, oldVal) { //Actualiza la lista de pokemons al cambiar la ruta
                if(oldVal.hash == newVal.hash){
                    this.setPagination();
                    this.pokemonSpeciesURLList=''
                    window.scrollTo(0,0)
                    this.getPokemonSpeciesURLs(this.apiLimit, this.paginationPage)
                }
            }
        },
        methods: {
            async getPokemonSpeciesURLs(limit, page){ //Obtiene los datos de la API
                this.apiOffset = limit * (page-1) //Calcula el offset de acuerdo al limite de valores establecidos y la pagina solicitada

                await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${this.apiOffset}`).then(
                    res => {
                        this.pokemonSpeciesURLList = res.data.results
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            setPagination(){ //Determina que valor debe tener la query "page"
                if(!this.$route.query.page){
                    //this.$route.query.page = '1'
                    this.paginationPage = 1
                } else {
                    this.paginationPage = parseInt(this.$route.query.page)
                }
            },

            nextPage(page) { //Cambia la query de la ruta al cambiar de valor en el paginador
                this.$router.push({name:'Pokedex', query:{page:parseInt(page)}})
            },

            showFilterDialog(){
                this.$router.push({query:{page:this.$route.query.page}, hash:'filter'})
            }
        }
    }
</script>

<style lang="scss">

</style>
