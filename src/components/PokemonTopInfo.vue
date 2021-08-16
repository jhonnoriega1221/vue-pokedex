<template>
    <div class="pokemon-top-info" v-if="pokemonData.pokemonVarieties">
        <!--Pokeball background
        <img  class="pokeball-bg" src="../assets/pokeball.svg" alt=""-->

        <!--Pokemon name and number-->
        <v-row>
            <v-col cols="1" class="pb-0 mt-1 pl-2">
                <v-btn v-on:click="back" class="white--text" icon><v-icon>arrow_back</v-icon></v-btn>
                
            </v-col>
            <v-col cols=5 class="pb-0">
                <h1 class="text-capitalize white--text">{{pokemonData.pokemonSpecieName}}</h1>
            </v-col>
            <v-col cols=6 class="pb-0">
                <h4 class="white--text font-weight-bold text-right">#{{pokemonData.pokedexNumber}}</h4>
            </v-col>
        </v-row>
        
        <!--Pokemon types and genera-->
        <v-row>
            <!--v-chip v-for="(type) in pokemonData.types" v-bind:key="type.id" dark style="height:25px"  class="mr-2 text-center text-capitalize" color="rgba(255, 255, 255, 0.3)">{{type.type.name}}</v-chip-->
            <v-col v-if="pokemonData.pokemonVarieties[selectedForm]" class="py-0" cols=7>
                <v-chip dark style="height:25px"  class="text-center text-capitalize mr-1" color="rgba(255, 255, 255, 0.3)">{{pokemonData.pokemonVarieties[selectedForm].pokemonVarietieFirstType}}</v-chip>
                <v-chip v-if="pokemonData.pokemonVarieties[selectedForm].pokemonVarietieSecondType" dark style="height:25px"  class="text-center text-capitalize mr-1" color="rgba(255, 255, 255, 0.3)">{{pokemonData.pokemonVarieties[selectedForm].pokemonVarietieSecondType}}</v-chip>
            </v-col>

            <v-col cols=5 class="py-0">
                <h6 class="white--text font-weight-light text-right py-1">{{pokemonData.pokemonGenera}}</h6>
            </v-col>
        </v-row>

        <!--Pokemon artwork-->
        <div style="min-height:300px;">
            <v-img 
            v-if="pokemonData.pokemonVarieties[selectedForm]"
            transition=none
            contain
            height="300px"
            v-bind:src='pokemonData.pokemonVarieties[selectedForm].pokemonVarietieArtwork'
            ></v-img>
        </div>

        <!--Pokemon forms-->
        <v-row v-if="pokemonData.pokemonVarieties.length > 1">
            <v-col cols=12 class="pt-0">
                <h5 class="text-center white--text font-weight-normal">{{pokemonData.pokemonVarieties[selectedForm].pokemonVarietieName}}</h5>
            </v-col>
            <div
            class="mx-auto pb-7"
            >
                <v-btn-toggle
                mandatory
                color="accent"
                v-model="selectedForm"
                @change="$emit('change',selectedForm)"
                >
                    <v-btn
                    icon
                    large
                    tile
                    v-for="pokemonVarietie in pokemonData.pokemonVarieties"
                    v-bind:key="pokemonVarietie.id"
                    >
                        <v-img
                        transition=none
                        width="44"
                        v-bind:src='pokemonVarietie.pokemonVarietieArtwork'
                        >
                        </v-img>
                    </v-btn>
                    
                </v-btn-toggle>
            </div>
        </v-row>

    </div>
    <div v-else>
            <v-skeleton-loader  type="heading" class="mt-3"></v-skeleton-loader>
                    <v-skeleton-loader type="text" class="mt-2" width="50"></v-skeleton-loader>
                    <v-skeleton-loader type="text" class="mt-n5 float-right" height="40" width="60"></v-skeleton-loader>
                    <v-skeleton-loader type="image" class="mt-6" height="270" ></v-skeleton-loader>
        
            
    </div>
</template>

<script>
export default {
    name: 'PokemonTopInfo',
    props: {
        pokemonData: Object
    },
    data: () => {
        return{
            selectedForm:0
        }
    },
    methods: {
        back(){
            this.$router.back();
        }
    }
}
</script>

<style lang="scss">
/* .pokeball-bg{
       filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(137deg) brightness(103%) contrast(101%) opacity(.2);
        position: absolute;
        top: 10px;
        overflow: hidden;
        right:-120px;
        
    }*/
</style>