<template>
    <div class="pokemon-top-info">
        <!--Pokeball background
        <img  class="pokeball-bg" src="../assets/pokeball.svg" alt="">
        
-->
        <!--Pokemon name-->
        <h1 class="text-capitalize white--text">{{pokemonData.name}}</h1>

        <!--Pokemon number-->
        <span 
        style="height:10px"
        class=" d-block text-h6 font-weight-black white--text text-right"
        >
            #{{pokemonData.id}}
        </span>

        <!--Pokemon types-->
        <v-chip v-for="(type) in pokemonData.types" v-bind:key="type.id" dark style="height:25px"  class="mr-2 text-center text-capitalize" color="rgba(255, 255, 255, 0.3)">{{type.type.name}}</v-chip>
        <!--Pokemon artwork-->
        <v-img 
        contain
        height="200px"
        v-bind:src='pokemonData.sprites.other["official-artwork"].front_default'
        ></v-img>
        
    </div>
</template>

<script>
export default {
    name: 'PokemonTopInfo',
    props:{
        pokemonData: Object
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