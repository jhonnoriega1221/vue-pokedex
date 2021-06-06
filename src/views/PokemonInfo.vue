<template>
    <div class="pokemon-info">
        <v-row>
            <v-col class="pb-0" cols="12" lg="5">
                <PokemonTopInfo/>
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
export default {
    components:{
        PokemonTopInfo,
        PokemonCardInfo
    }
}
</script>

<style lang="scss" scoped>    

</style>