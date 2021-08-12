<template>
    <div class="pokecard" v-if="pokemonCardData">
        <v-card
        class="pa-3"
        rounded="xl"
        :color = "pokemonCardData.pokemonTypePrimary"
        flat
        ripple
        dark
        :to="{ name: 'PokemonInfo', params: { pokemon_name: pokemonCardData.pokemonName}}"
        >
            <!--Pokeball background
            <img class="pokeball-bg" src="../assets/pokeball.svg" alt="">
            -->

            <!--Pokemon number-->
            <v-card-text style="height:20px" class="pa-0 text-h6 text-right font-weight-black text--disabled black--text">#{{pokemonCardData.pokemonEntry}}</v-card-text>

            <!--Pokemon name-->
            <v-card-title class="text-capitalize text-body pt-0 pl-0 font-weight-bold d-block text-truncate">{{pokemonCardData.pokemonName}}</v-card-title>


            <v-row>
                <!--Pokemon Types-->
                <v-col class="pb-0 pr-0 pt-0" cols="6">
                    
                    <v-chip style="height:25px" class="text-capitalize mb-1 d-block text-center text-caption" color="rgba(255, 255, 255, 0.2)">
                        {{pokemonCardData.pokemonTypePrimary}}
                    </v-chip>
                    <v-chip v-if=pokemonCardData.pokemonTypeSecondary style="height:25px" class="text-capitalize mb-1 d-block text-center text-caption" color="rgba(255, 255, 255, 0.2)">
                        {{pokemonCardData.pokemonTypeSecondary}}
                    </v-chip>

                </v-col>

                <!--Pokemon artwork-->
                <v-col class="pa-0" cols="6">
                    <v-responsive :aspect-ratio="1/1">
                        <v-img 
                        v-bind:src='pokemonCardData.pokemonArtwork'
                        transition=none
                        >
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

export default {
    name: 'Pokecard',
    props:{
        pokemonCardData: Object
    },
    data: () => {
        return{
            pokemonSpecieData: '',
            pokemonData:''
        }
    },
    mounted(){
       // this.getPokemonData();
    },
    methods: {
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