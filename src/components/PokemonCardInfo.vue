<template>
    <div class="pokemon-card-info" v-if="pokemonData.pokemonVarieties">
        <v-card class="mt-md-5 mt-0">
            <v-tabs show-arrows centered>
                <v-tab>Acerca</v-tab>
                <v-tab>Estadisticas</v-tab>
                <v-tab>Evolución</v-tab>

                                <!--Acerca de-->
                <v-tab-item class="pb-10" v-if="pokemonData.pokemonVarieties[selectedForm]">
                    <v-card flat>
                        <v-card-text>
                            <p class="black--text">
                                {{pokemonData.pokedexEntry}}
                            </p>
                            <v-row>

                                <v-col cols="12" lg="5">

                                    <!--Tarjeta que muestra tamaño y peso-->
                                    <v-card  rounded="xl" elevation="5" class="pa-4">
                                        <v-row class="mb-m1 grey--text">
                                            <v-col cols=6>Altura</v-col>
                                            <v-col cols=6>Peso</v-col>
                                        </v-row>
                                        <v-row  class="mt-0">
                                            <v-col cols=6>{{pokemonData.pokemonVarieties[selectedForm].pokemonVarietieHeight / 10}} m</v-col>
                                            <v-col cols=6>{{pokemonData.pokemonVarieties[selectedForm].pokemonVarietieWeight / 10}} kg</v-col>
                                        </v-row>
                                    </v-card>

                                </v-col>

                                <v-col cols="12" lg="7">

                                    <!--Información de crianza-->
                                    <h3 class="black--text pb-7">Crianza</h3>
                                    <v-row>

                                        <v-col class="grey--text py-0" cols=5>
                                            <p>Genero</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=3>
                                            <p class="pink--text d-inline font-weight-bold">F</p>
                                            <p class="d-inline" v-if="pokemonData.pokemonGenderRate > -1"> {{(pokemonData.pokemonGenderRate / 8) * 100}}%</p>
                                            <p class="d-inline" v-else> 0%</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=4>
                                            <p class="blue--text d-inline font-weight-bold">M</p>
                                            <p class="d-inline" v-if="pokemonData.pokemonGenderRate > -1"> {{100-((pokemonData.pokemonGenderRate / 8) * 100)}}%</p>
                                            <p class="d-inline" v-else> 0%</p>
                                        </v-col>

                                    </v-row>

                                    <v-row v-if="pokemonData.pokemonEggGroup">

                                        <v-col class="grey--text py-0" cols=5>
                                            <p>Grupo Huevo</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=7>
                                            <p class="text-capitalize">{{pokemonData.pokemonEggGroup}}</p>
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <!--Estadisticas base-->
                <v-tab-item class="pb-10" v-if="pokemonData.pokemonVarieties[selectedForm]">
                    <v-card flat>
                        <v-card-text >
                            <h3 class="black--text pb-7">Estadisticas base</h3>
                            <!--Info-->
                            <v-row v-for="pokemonStat in pokemonData.pokemonVarieties[selectedForm].pokemonVarietieStats" v-bind:key=pokemonStat.id>
                                <v-col cols=3 class=pb-0>
                                    {{pokemonStat.name}}
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    {{pokemonStat.value}}
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    :value="pokemonStat.value">
                                    </v-progress-linear>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <!--Cadena evolutiva-->
                <v-tab-item class="pb-10">
                    <v-card flat>
                        <v-card-text v-if="pokemonData.evolutionChain.evolvesTo.length > 0">
                            <h3 class="black--text pb-7">Cadena evolutiva</h3>

                            <!--Fila de la primera evolución (Primer evolve to)-->
                            <v-row>

                                <!--Columna donde va el o los pokemón(es) que va a evolucionar-->
                                <v-col class="my-auto" cols=4>
                                    <v-card class="my-2" flat :to="{ name: 'PokemonInfo', params: { pokemon_name: pokemonData.evolutionChain.pokemonName}}">
                                        <v-img transition=none class="mx-auto" width="100" :src="pokemonData.evolutionChain.pokemonArtwork"></v-img>
                                        <v-card-text class="pa-0 text-center">{{pokemonData.evolutionChain.pokemonName}}</v-card-text>
                                    </v-card>
                                </v-col>

                                <!--Columna donde van las condiciones de evolución y los pokemones a los que evoluciona (No aplicar v-for)-->
                                <v-col class="my-auto" cols=8>
                                    <!--Fila donde van las condiciones de evolución y hacia que evoluciona (Aplicar v-for)-->
                                    <v-row v-for="evolveTo in pokemonData.evolutionChain.evolvesTo" v-bind:key=evolveTo.id>

                                        <!--Columna de las condiciones de evolución-->
                                        <v-col class="my-auto" cols=6>
                                            <div  class="text-center mb-0">
                                                <p v-for="evolutionConditions in evolveTo.evolutionConditions" v-bind:key=evolutionConditions.id> {{evolutionConditions}}</p>
                                            </div>
                                        </v-col>

                                        <!--Columna donde se muestra hacia que va a evolucionar-->
                                        <v-col class="my-auto" cols=6>
                                            <v-card class="my-2" flat :to="{ name: 'PokemonInfo', params: { pokemon_name: evolveTo.pokemonName}}">
                                                <v-img transition=none class="mx-auto" width="100" :src="evolveTo.pokemonArtwork"></v-img>
                                                <v-card-text class="pa-0 text-center">{{evolveTo.pokemonName}}</v-card-text>
                                            </v-card>
                                        </v-col>

                                    </v-row>
                                </v-col>
                            </v-row>

                            <v-divider></v-divider>
                            
                            <!--Fila de la segunda evolución-->
                            <v-row v-for="secondEvolution in pokemonData.evolutionChain.evolvesTo" v-bind:key=secondEvolution.id>

                                <!--Columna donde va el o los pokemón(es) que va a evolucionar-->
                                <v-col v-if="secondEvolution.evolvesTo.length > 0" class="my-auto" cols=4>
                                    <div>
                                        <v-card class="my-2" flat :to="{ name: 'PokemonInfo', params: { pokemon_name: secondEvolution.pokemonName}}">
                                            <v-img transition=none class="mx-auto" width="100" :src="secondEvolution.pokemonArtwork"></v-img>
                                            <v-card-text class="pa-0 text-center">{{secondEvolution.pokemonName}}</v-card-text>
                                        </v-card>
                                    </div>
                                </v-col>

                                <!--Columna donde van las condiciones de evolución y los pokemones a los que evoluciona (No aplicar v-for)-->
                                <v-col class="my-auto" cols=8>
                                    <!--Fila donde van las condiciones de evaluación y hacia que evoluciona (Aplicar v-for)-->
                                    <v-row v-for="evolveTo in secondEvolution.evolvesTo" v-bind:key=evolveTo.id>

                                        <!--Columna de las condiciones de evolución-->
                                        <v-col class="my-auto" cols=6>
                                            <div class="text-center mb-0">
                                                <p v-for="evolutionConditions in evolveTo.evolutionConditions" v-bind:key=evolutionConditions.id > {{evolutionConditions}}</p>
                                            </div>
                                        </v-col>

                                        <!--Columna donde se muestra hacia que va a evolucionar-->
                                        <v-col class="my-auto" cols=6>
                                            <v-card class="my-2" flat :to="{ name: 'PokemonInfo', params: { pokemon_name: evolveTo.pokemonName}}">
                                                <v-img transition=none class="mx-auto" width="100" :src="evolveTo.pokemonArtwork"></v-img>
                                                <v-card-text class="pa-0 text-center">{{evolveTo.pokemonName}}</v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>


                                </v-col>
                            </v-row>
                            
                        </v-card-text>
                        <v-card-text v-else>Este pokémon no posee evolución.</v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
    <div v-else>
        <v-skeleton-loader class="mt-0 mt-md-5" height="260" type ="image@2" style="background:white">
                    </v-skeleton-loader>
    </div>
</template>

<script>

export default {
    name: 'PokemonCardInfo',
    props: {
        pokemonData: Object,
        selectedForm: Number
    },
    data: () => {
        return {
        }
    },
    computed:{
    },
    mounted(){
    },
    methods: {
    }
}
</script>

<style lang="scss">
/* Flecha que va al fondo, sin implementar
    .evolution_conditions{ 
        background-size: 24px 24px;
        background-image: url(../assets/arrow.svg);
        background-position: center; 
    }*/

    .card-info-title{
        color: grey;
    }

    .card-info-text{
        color: black;
    }

</style>