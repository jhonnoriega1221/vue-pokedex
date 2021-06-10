<template>
    <div class="pokecard" v-if="pokemonData">
        <v-card
        class="pa-3"
        style="border-radius: 20px"
        :color="pokemonData.types[0].type.name"
        flat
        ripple
        dark
        :to="{ name: 'PokemonInfo', params: { pokemon_name: pokemonSpecieData.name}}"
        >
        
            <!--Pokeball background
            <img class="pokeball-bg" src="../assets/pokeball.svg" alt="">
            -->

            <!--Pokemon number-->
            <v-card-text style="height:20px" class="pa-0 text-h6 text-right font-weight-black text--disabled black--text">#{{pokemonSpecieData.pokedex_numbers[0].entry_number}}</v-card-text>

            <!--Pokemon name-->
            <v-card-title class="text-capitalize text-body pt-0 pl-0 font-weight-bold d-block text-truncate">{{pokemonSpecieData.name}}</v-card-title>


            <v-row>
                <!--Pokemon Types-->
                <v-col class="pb-0 pr-0 pt-0" cols="6">
                    
                    <v-chip v-for="(type) in pokemonData.types" v-bind:key="type.id" style="height:25px" class="text-capitalize mb-1 d-block text-center text-caption" color="rgba(255, 255, 255, 0.2)">
                        {{type.type.name}}
                    </v-chip>

                </v-col>

                <!--Pokemon artwork-->
                <v-col class="pa-0" cols="6">
                    <v-responsive :aspect-ratio="1/1">
                        <v-img v-bind:src='pokemonData.sprites.other["official-artwork"].front_default'>
                            <template v-slot:placeholder>
                                <v-skeleton-loader>
                                </v-skeleton-loader>
                            </template>
                        </v-img>
                    </v-responsive>
                </v-col>
                
            </v-row>
        </v-card>

    </div>
    <!--Component PokemonCard skeleton loader-->
    <div v-else>
        <v-skeleton-loader
            transition="fade-transition" 
            type="image"
            style="border-radius: 20px"
            height="193px"
            
        >
        </v-skeleton-loader>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Pokecard',
    props:{
        pokemonSpecieURL: Object
    },
    data: () => {
        return{
            pokemonSpecieData: '',
            pokemonData:''
        }
    },
    mounted(){
        this.getPokemonData();
    },
    methods: {
        async getPokemonData(){
            await axios.get(this.pokemonSpecieURL.url).then(
                res => {
                    this.pokemonSpecieData = res.data;
                    axios.get(res.data.varieties[0].pokemon.url).then(
                        res => {
                            this.pokemonData = res.data;
                        }
                    ).catch(
                        err => {
                            console.log(err);
                        }
                    );
                }
            ).catch(
                err =>{
                    console.log(err);
                }
            );
        }
    }
}
</script>

<style lang="scss">
    .pokeball-bg{
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(137deg) brightness(103%) contrast(101%) opacity(.2);
        position: absolute;
        left: 35%;
        top: 43%;
        width: 68%;
    }
</style>