<template>
    <div class="pokemon-card-info" v-if="evolutionChain">
        <v-card class="mt-0">
            <v-tabs show-arrows >
                <v-tab>Acerca</v-tab>
                <v-tab>Estadisticas</v-tab>
                <v-tab>Evolución</v-tab>
                <v-tab>Otros</v-tab>

                <!--Acerca de-->
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <p class="black--text">
                                {{pokedexDescription}}
                            </p>
                            <v-row>

                                <v-col cols="12" lg="5">

                                    <!--Tarjeta que muestra tamaño y peso-->
                                    <v-card elevation="5" class="pa-4">
                                        <v-row class="mb-m1 grey--text">
                                            <v-col cols=6>Altura</v-col>
                                            <v-col cols=6>Peso</v-col>
                                        </v-row>
                                        <v-row class="mt-0">
                                            <v-col cols=6>{{this.pokemonVarieties[selectedForm].height / 10}} m</v-col>
                                            <v-col cols=6>{{this.pokemonVarieties[selectedForm].weight / 10}} kg</v-col>
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
                                            <p class="d-inline" v-if="this.pokemonSpecie.gender_rate > -1"> {{(this.pokemonSpecie.gender_rate / 8) * 100}}%</p>
                                            <p class="d-inline" v-else> 0%</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=4>
                                            <p class="blue--text d-inline font-weight-bold">M</p>
                                            <p class="d-inline" v-if="this.pokemonSpecie.gender_rate > -1"> {{100-((this.pokemonSpecie.gender_rate / 8) * 100)}}%</p>
                                            <p class="d-inline" v-else> 0%</p>
                                        </v-col>

                                    </v-row>

                                    <v-row v-if="this.pokemonSpecie.egg_groups.length">

                                        <v-col class="grey--text py-0" cols=5>
                                            <p>Grupos Huevo</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=7>
                                            <p class="text-capitalize">{{this.pokemonSpecie.egg_groups[0].name}}</p>
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <!--Estadisticas base-->
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h3 class="black--text pb-7">Estadisticas Base</h3>
                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class=pb-0>
                                    PS
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    {{pokemonVarieties[selectedForm].stats[0].base_stat}}
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    :value="pokemonVarieties[selectedForm].stats[0].base_stat">
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class=pb-0>
                                    Ataque
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    {{pokemonVarieties[selectedForm].stats[1].base_stat}}
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    :value="pokemonVarieties[selectedForm].stats[1].base_stat">
                                        
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class="pb-0 pr-0">
                                    Defensa
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    {{pokemonVarieties[selectedForm].stats[2].base_stat}}
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    :value="pokemonVarieties[selectedForm].stats[2].base_stat">
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class="pb-0 pr-0">
                                    Atq. Es
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    {{pokemonVarieties[selectedForm].stats[3].base_stat}}
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    :value="pokemonVarieties[selectedForm].stats[3].base_stat">
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class="pb-0 pr-0">
                                    Dfns. Es
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    {{pokemonVarieties[selectedForm].stats[4].base_stat}}
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    :value="pokemonVarieties[selectedForm].stats[4].base_stat">
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row class="mb-4">
                                <v-col cols=3 class="pb-0 pr-0">
                                    Agilidad
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    {{pokemonVarieties[selectedForm].stats[5].base_stat}}
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    :value="pokemonVarieties[selectedForm].stats[5].base_stat">
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <!--Cadena evolutiva-->
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h3 class="black--text pb-7">Cadena evolutiva</h3>

                            <!--Fila de la primera evolución (Primer evolve to)-->
                            <v-row>

                                <!--Columna donde va el o los pokemón(es) que va a evolucionar-->
                                <v-col class="my-auto" cols=4>
                                    <div>
                                        <v-img class="mx-auto" width="100" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"></v-img>
                                        <p class="d-block text-center">{{evolutionChain.chain.species.name}}</p>
                                    </div>
                                </v-col>

                                <!--Columna donde van las condiciones de evolución y los pokemones a los que evoluciona (No aplicar v-for)-->
                                <v-col class="my-auto" cols=8>
                                    <!--Fila donde van las condiciones de evolución y hacia que evoluciona (Aplicar v-for)-->
                                    <v-row v-for="evolveTo in evolutionChain.chain.evolves_to" v-bind:key=evolveTo.id>

                                        <!--Columna de las condiciones de evolución-->
                                        <v-col class="my-auto" cols=6>
                                            <p v-for="evolutionConditions in evolveTo.evolution_details" v-bind:key=evolutionConditions.id class="text-center mb-0">
                                                Nivel {{evolutionConditions.min_level}}
                                            </p>
                                        </v-col>

                                        <!--Columna donde se muestra hacia que va a evolucionar-->
                                        <v-col class="my-auto" cols=6>
                                            <v-img class="mx-auto" width="100" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"></v-img>
                                            <p class="d-block text-center">{{evolveTo.species.name}}</p>
                                        </v-col>

                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>

                            <!--Fila de la segunda evolución-->
                            <v-row v-for="secondEvolution in evolutionChain.chain.evolves_to" v-bind:key=secondEvolution.id>

                                <!--Columna donde va el o los pokemón(es) que va a evolucionar-->
                                <v-col class="my-auto" cols=4>
                                    <div>
                                        <v-img class="mx-auto" width="100" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"></v-img>
                                        <p class="d-block text-center">{{secondEvolution.species.name}}</p>
                                    </div>
                                </v-col>

                                <!--Columna donde van las condiciones de evolución y los pokemones a los que evoluciona (No aplicar v-for)-->
                                <v-col class="my-auto" cols=8>
                                    <!--Fila donde van las condiciones de evaluación y hacia que evoluciona (Aplicar v-for)-->
                                    <v-row v-for="evolveTo in secondEvolution.evolves_to" v-bind:key=evolveTo.id>

                                        <!--Columna de las condiciones de evolución-->
                                        <v-col class="my-auto" cols=6>
                                            <p v-for="evolutionConditions in evolveTo.evolution_details" v-bind:key=evolutionConditions.id class="text-center mb-0">
                                                Nivel {{evolutionConditions.min_level}}
                                            </p>
                                        </v-col>

                                        <!--Columna donde se muestra hacia que va a evolucionar-->
                                        <v-col class="my-auto" cols=6>
                                            <v-img class="mx-auto" width="100" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"></v-img>
                                            <p class="d-block text-center">{{evolveTo.species.name}}</p>
                                        </v-col>
                                    </v-row>


                                </v-col>
                            </v-row>
                            
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item></v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'PokemonCardInfo',
    props: {
        pokemonSpecie:Object,
        pokemonVarieties: Array,
        selectedForm: Number
    },
    data: () => {
        return {
            pokedexDescription:'',
            evolutionChain:''

            //Cadena evolutiva
        }
    },
    mounted(){
        this.getDescription(this.pokemonSpecie.flavor_text_entries)
        this.getEvolutionChain();
    },
    methods: {
        getDescription(pokemonEntries){
            for (let i = 0; i < pokemonEntries.length; i++) {
                if(pokemonEntries[i].language.name == 'es' && pokemonEntries[i].version.name == 'sword') {
                    this.pokedexDescription = pokemonEntries[i].flavor_text;
                    break;
                } else if(pokemonEntries[i].language.name == 'es' && pokemonEntries[i].version.name == 'lets-go-pikachu') {
                    this.pokedexDescription = pokemonEntries[i].flavor_text;
                    break;
                } else if(pokemonEntries[i].language.name == 'es' && pokemonEntries[i].version.name == 'ultra-sun') {
                    this.pokedexDescription = pokemonEntries[i].flavor_text;
                    break;
                } else if(pokemonEntries[i].language.name == 'es' && pokemonEntries[i].version.name == 'x') {
                    this.pokedexDescription = pokemonEntries[i].flavor_text;
                    break;
                }
            }
        },
        async getEvolutionChain(){
            await axios.get(this.pokemonSpecie.evolution_chain.url).then(
                res => {
                    console.log(res.data);
                    this.evolutionChain = res.data;
                }
            ).catch( err => {console.log(err)} )
        }
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