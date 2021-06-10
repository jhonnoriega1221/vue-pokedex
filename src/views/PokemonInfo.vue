<template>
    <div class="pokemon-info" >
        <v-row>
            
            <v-col class="pb-0" cols="12" lg="5">
                <div v-if="pokemonData">
                    <PokemonTopInfo v-bind:pokemonData="pokemonData"/>
                </div>
                <div v-else>
                    <v-skeleton-loader  type="text" class="mt-3" width="130"></v-skeleton-loader>
                    <v-skeleton-loader type="chip" class="mt-2 mr-10" ></v-skeleton-loader>
                    <v-skeleton-loader type="text" class="mt-n5 float-right" height="25" width="60"></v-skeleton-loader>
                    <v-skeleton-loader type="image" class="mt-6" height="270" ></v-skeleton-loader>
                </div>
            </v-col>
            
            <v-col class="pt-sm-only-0 " cols="12" lg="7">
                <div v-if="pokemonData">
                    <PokemonCardInfo/>
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
            pokemonData: '',
            pokemonSpecieData: ''
        }
    },
    mounted(){
        this.getPokemonData(this.$route.params.pokemon_name);
    },
    methods:{
        async getPokemonData(name){
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
                res => {
                    this.pokemonData = res.data
                }
            ).catch(err =>{
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>    

</style>