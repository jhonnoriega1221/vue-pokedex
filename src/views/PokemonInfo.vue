<template>
    <div class="pokemon-info" v-if="pokemonData">
        <v-row>
            <v-col class="pb-0" cols="12" lg="5">
                <PokemonTopInfo v-bind:pokemonData="pokemonData"/>
            </v-col>
            <v-col class="pt-sm-only-0 " cols="12" lg="7">
                <PokemonCardInfo/>
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
            pokemonData:''
        }
    },
    mounted(){
        this.getPokemon(this.$route.params.id);
    },
    methods:{
        async getPokemon(id){
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
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