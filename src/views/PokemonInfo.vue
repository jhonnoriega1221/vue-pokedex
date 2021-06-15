<template>
    <div>
        <v-row>
            <v-col class="pb-0" cols="12" lg="5">
                <div v-if="pokemonVarietiesData.length">
                    <PokemonTopInfo
                    @change="changeSelectedForm"
                    v-bind:pokemonSpecie="pokemonSpecieData" 
                    v-bind:pokemonVarieties="pokemonVarietiesData"/>
                </div>
                <div v-else>
                    <v-skeleton-loader  type="text" class="mt-3" width="130"></v-skeleton-loader>
                    <v-skeleton-loader type="chip" class="mt-2 mr-10" ></v-skeleton-loader>
                    <v-skeleton-loader type="text" class="mt-n5 float-right" height="25" width="60"></v-skeleton-loader>
                    <v-skeleton-loader type="image" class="mt-6" height="270" ></v-skeleton-loader>
                </div>
            </v-col>
            
            <v-col class="pt-1 " cols="12" lg="7">
                <div v-if="pokemonVarietiesData.length">
                    <PokemonCardInfo
                    v-bind:pokemonSpecie="pokemonSpecieData" 
                    v-bind:pokemonVarieties="pokemonVarietiesData"
                    v-bind:selectedForm="selectedFormData"/>
                </div>
                    <div v-else>
                    <v-skeleton-loader type ="image@2" style="background:white">

                    </v-skeleton-loader>
                </div>
            </v-col>
           
        </v-row>
    </div>

    
</template>

<script>
import PokemonTopInfo from '@/components/PokemonTopInfo.vue'
import PokemonCardInfo from '@/components/PokemonCardInfo.vue'

import axios from "axios";

export default {
    components:{
        PokemonTopInfo,
        PokemonCardInfo
    },
    data: () => {
        return{
            pokemonSpecieData: '',
            pokemonVarietiesData:[],
            selectedFormData:0
        }
    },
    mounted(){
        window.scrollTo(0,0);
        this.getPokemonSpecieData(this.$route.params.pokemon_name);
    },
    watch: {
        $route: function(newVal, oldVal){
            if(oldVal.params.pokemon_name != newVal.params.pokemon_name){
                this.pokemonSpecieData=''
                this.pokemonVarietiesData=[]
                this.selectedFormData=0
                window.scrollTo(0,0)
                this.getPokemonSpecieData(this.$route.params.pokemon_name)
            }
        }   
    },
    methods:{
        async getPokemonSpecieData(name){
            await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(
                res => {
                    this.pokemonSpecieData = res.data
                    //Funcion que obtiene la info de cada pokemon
                    const getPokemonsVarietiesData = async () => {
                        for (const pokemonDataURL of this.pokemonSpecieData.varieties){
                            await axios.get(pokemonDataURL.pokemon.url).then(
                                res => {
                                    this.pokemonVarietiesData.push(res.data)
                                }
                            ).catch(err => {console.log(err)})
                        }
                    }
                    getPokemonsVarietiesData();                    
                }
            ).catch(err =>{
                console.log(err);
            })
        },

        changeSelectedForm (selectedForm) {
            this.selectedFormData = selectedForm;
        }
    }
}
</script>

<style lang="scss" scoped>    
</style>