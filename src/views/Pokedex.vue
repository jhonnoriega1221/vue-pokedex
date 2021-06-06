<template>
    <div class="pokedex">
        <h1 class="pb-7">Pokedex</h1>
        <v-row>
            <v-col 
            class="pa-2" cols="6" sm="4" md="3" lg="3" xl="2" v-for="(pokemon, i) in 12"
            v-bind:key="i">
                <Pokecard/>
            </v-col>
        </v-row>
        
    </div>
</template>

<script>
import Pokecard from '@/components/PokemonCard.vue'
    export default {
        components: {
            Pokecard
        }
    }
</script>

<style lang="scss">

</style>
