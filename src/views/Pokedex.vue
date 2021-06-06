<template>
    <div class="pokedex">
        <h1 class="pb-7">Pokedex</h1>
        <Pokecard/>
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
