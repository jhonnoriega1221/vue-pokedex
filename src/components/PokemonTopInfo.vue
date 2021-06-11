<template>
    <div class="pokemon-top-info">

        <!--Pokeball background
        <img  class="pokeball-bg" src="../assets/pokeball.svg" alt=""-->

        <!--Pokemon name and number-->
        <v-row>
            <v-col cols=6 class="pb-0">
                <h1 class="text-capitalize white--text">Bulbasaur</h1>
            </v-col>
            <v-col cols=6 class="pb-0">
                <h4 class="white--text font-weight-bold text-right py-3">#001</h4>
            </v-col>
        </v-row>
        
        <!--Pokemon types and specie-->
        <v-row>
            <!--v-chip v-for="(type) in pokemonData.types" v-bind:key="type.id" dark style="height:25px"  class="mr-2 text-center text-capitalize" color="rgba(255, 255, 255, 0.3)">{{type.type.name}}</v-chip-->
            <v-col class="py-0" cols=7>
                <v-chip dark style="height:25px"  class="text-center text-capitalize mr-1" color="rgba(255, 255, 255, 0.3)">Planta</v-chip>
                <v-chip dark style="height:25px"  class="text-center text-capitalize mr-1" color="rgba(255, 255, 255, 0.3)">Veneno</v-chip>
            </v-col>

            <v-col cols=5 class="py-0">
                <h6 class="white--text font-weight-light text-right py-1">Pokemon Semilla</h6>
            </v-col>
        </v-row>

        <!--Pokemon artwork-->
        <v-img 
        contain
        height="300px"
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
        ></v-img>

        <!--Pokemon forms-->
        <v-row v-if="true">
            <v-col cols=12 class="pt-0">
                <h5 class="text-center white--text font-weight-normal">Forma normal</h5>
            </v-col>
            <div
            class="mx-auto pb-7"
            >
                <v-btn
                icon
                large
                v-for="form in 3"
                v-bind:key="form.id"
                class="mr-2"
                >
                    <v-avatar
                    color="white"
                    size="44"
                    >
                        <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/386.png"
                        >
                    </v-avatar>
                </v-btn>
            </div>
        </v-row>

    </div>
</template>

<script>
export default {
    name: 'PokemonTopInfo',
    props:{
        //pokemonData: Object
    }
}
</script>

<style lang="scss">
.pokeball-bg{
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(137deg) brightness(103%) contrast(101%) opacity(.2);
        position: absolute;
        top: 10px;
        overflow: hidden;
        right:-120px;
        
    }
</style>