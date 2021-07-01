<template>
    <div class="pokemon-top-info" v-if="pokemonSpecie && pokemonVarieties.length">
        <!--Pokeball background
        <img  class="pokeball-bg" src="../assets/pokeball.svg" alt=""-->

        <!--Pokemon name and number-->
        <v-row>
            <v-col cols=6 class="pb-0">
                <h1 class="text-capitalize white--text">{{pokemonSpecie.name}}</h1>
            </v-col>
            <v-col cols=6 class="pb-0">
                <h4 class="white--text font-weight-bold text-right">#{{pokemonSpecie.pokedex_numbers[0].entry_number}}</h4>
            </v-col>
        </v-row>
        
        <!--Pokemon types and genera-->
        <v-row>
            <!--v-chip v-for="(type) in pokemonData.types" v-bind:key="type.id" dark style="height:25px"  class="mr-2 text-center text-capitalize" color="rgba(255, 255, 255, 0.3)">{{type.type.name}}</v-chip-->
            <v-col class="py-0" cols=7>
                <v-chip v-for="type in pokemonVarieties[selectedForm].types" v-bind:key="type.id" dark style="height:25px"  class="text-center text-capitalize mr-1" color="rgba(255, 255, 255, 0.3)">{{type.type.name}}</v-chip>
            </v-col>

            <v-col cols=5 class="py-0">
                <h6 class="white--text font-weight-light text-right py-1">{{pokemonSpecie.genera[5].genus}}</h6>
            </v-col>
        </v-row>

        <!--Pokemon artwork-->
        <v-img 
        transition=none
        contain
        height="300px"
        v-bind:src='pokemonVarieties[selectedForm].sprites.other["official-artwork"].front_default'
        ></v-img>

        <!--Pokemon forms-->
        <v-row v-if="pokemonVarieties.length > 1">
            <v-col cols=12 class="pt-0">
                <h5 class="text-center white--text font-weight-normal">{{pokemonVarieties[selectedForm].name}}</h5>
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
                    v-for="pokemonVarietie in pokemonVarieties"
                    v-bind:key="pokemonVarietie.id"
                    >
                        <v-img
                        transition=none
                        width="44"
                        v-bind:src='pokemonVarietie.sprites.other["official-artwork"].front_default'
                        >
                        </v-img>
                    </v-btn>
                    
                </v-btn-toggle>
            </div>
        </v-row>

    </div>
    <div v-else>
        <p>No ha carga2</p>
    </div>
</template>

<script>
export default {
    name: 'PokemonTopInfo',
    props: {
        pokemonSpecie: Object,
        pokemonVarieties: Array,
    },
    data: () => {
        return{
            selectedForm:0
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