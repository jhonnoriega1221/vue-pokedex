<template>
    <div class="pokemon-top-info">
        <!--Pokemon name-->
        <h1 class="white--text">Bulbasaur</h1>

        <!--Pokemon number-->
        <span class="d-block white--text text-right">#001</span>

        <!--Pokemon types-->
        <v-chip dark style="height:25px"  class="mr-2 text-center" color="rgba(255, 255, 255, 0.3)">Planta</v-chip>
        <v-chip dark style="height:25px"  class="mr-2 text-center" color="rgba(255, 255, 255, 0.3)">Veneno</v-chip>
        
        <!--Pokeball background-->
        <img  class="pokeball-bg" src="../assets/pokeball.svg" alt="">

        <!--Pokemon artwork-->
        <v-img 
        contain
        height="200px"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
        
        ></v-img>
    </div>
</template>

<script>
export default {
    name: 'PokemonTopInfo'
}
</script>

<style lang="scss">
.pokeball-bg{
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(137deg) brightness(103%) contrast(101%) opacity(.2);
        position: absolute;
        left: 0;
        top: 10%;
        width: 30%;
    }
</style>