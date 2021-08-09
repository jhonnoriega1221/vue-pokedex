<template>
    <div>
        <v-row class="">
            <v-col class="pb-0" cols="12" lg="5">
                <div v-if="pokemonSpecieData">
                    <PokemonTopInfo
                    @change="changeSelectedForm"
                    :pokemonData="pokemonSpecieData"
                    :selectedForm="selectedFormData"/>
                </div>
                <div v-else>
                    <v-skeleton-loader  type="text" class="mt-3" width="130"></v-skeleton-loader>
                    <v-skeleton-loader type="chip" class="mt-2 mr-10" ></v-skeleton-loader>
                    <v-skeleton-loader type="text" class="mt-n5 float-right" height="25" width="60"></v-skeleton-loader>
                    <v-skeleton-loader type="image" class="mt-6" height="270" ></v-skeleton-loader>
                </div>
            </v-col>
            
            <v-col class="pt-1 pt-md-0" cols="12" lg="7">
                <div v-if="pokemonSpecieData">
                    <PokemonCardInfo
                    :pokemonData="pokemonSpecieData"
                    :selectedForm="selectedFormData"/>
                </div>
                <div v-else>
                    <v-skeleton-loader class="mt-0 mt-md-5" type ="image@2" style="background:white">
                    </v-skeleton-loader>
                </div>
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
    },
    data: () => {
        return{

            pokemonSpecieData: {},
            selectedFormData:0
        }
    },
    async mounted(){

        window.scrollTo(0,0);
        await this.fetchPokemonSpecieData();
    },
    watch: {
        $route: function(newVal, oldVal){
            if(oldVal.params.pokemon_name != newVal.params.pokemon_name){
                this.pokemonSpecieData=''
                this.pokemonVarietiesData=[]
                this.selectedFormData=0
                window.scrollTo(0,0)
                this.fetchPokemonSpecieData()
            }
        }   
    },
    methods:{
        async fetchPokemonSpecieData(){
            let pokemonVarietieInfo

            const pokemonSpecieResponse = await this.$store.dispatch('pokemonSpecie/fetchPokemonSpecie', this.$route.params.pokemon_name);
            
            //Obtiene el id de la cadena evolutiva
            const pokemonChainEvolutionId = pokemonSpecieResponse.evolution_chain.url.slice(42, (pokemonSpecieResponse.evolution_chain.url.length-1))
            
            //Obtiene la info de la especie pokemon
            //Esto está dos veces porque da error cuando un pokemon no tiene grupo huevo (MEJORAR ESTO)
            if(pokemonSpecieResponse.egg_groups.length > 1){ // Si tiene grupo huevo
                this.pokemonSpecieData = {
                    pokemonSpecieName: pokemonSpecieResponse.name,
                    pokemonGenderRate: pokemonSpecieResponse.gender_rate,
                    pokemonGenera: pokemonSpecieResponse.genera[5].genus,
                    pokedexEntry: this.setPokedexInfo(pokemonSpecieResponse.flavor_text_entries),
                    pokedexNumber: pokemonSpecieResponse.pokedex_numbers[0].entry_number,
                    pokemonVarieties: [],
                    pokemonEggGroup: pokemonSpecieResponse.egg_groups[0].name,
                    evolutionChain: await this.fetchEvolutionChain(pokemonChainEvolutionId)
                }
            } else {
                this.pokemonSpecieData = { //Si no tiene grupo huevo
                    pokemonSpecieName: pokemonSpecieResponse.name,
                    pokemonGenderRate: pokemonSpecieResponse.gender_rate,
                    pokemonGenera: pokemonSpecieResponse.genera[5].genus,
                    pokedexEntry: this.setPokedexInfo(pokemonSpecieResponse.flavor_text_entries),
                    pokedexNumber: pokemonSpecieResponse.pokedex_numbers[0].entry_number,
                    pokemonVarieties: [],
                    evolutionChain: await this.fetchEvolutionChain(pokemonChainEvolutionId)
                }
            }

            //Obtiene la info de las variaciones del pokemon
            for(const [i, pokemonVarietie] of pokemonSpecieResponse.varieties.entries()){
                const pokemonVarietieResponse = await this.$store.dispatch('pokemon/fetchPokemon', pokemonVarietie.pokemon.name);
                
                //Esto está dos veces porque da error cuando un pokemon no tiene tipo secundario (MEJORAR ESTO)
                if(pokemonVarietieResponse.types.length > 1){ //Si tine tipo secundario
                    pokemonVarietieInfo = {
                    pokemonVarietieName : pokemonVarietieResponse.name,
                    pokemonVarietieArtwork: pokemonVarietieResponse.sprites.other["official-artwork"].front_default,
                    pokemonVarietieFirstType: pokemonVarietieResponse.types[0].type.name,
                    pokemonVarietieSecondType: pokemonVarietieResponse.types[1].type.name,
                    pokemonVarietieWeight: pokemonVarietieResponse.weight,
                    pokemonVarietieHeight: pokemonVarietieResponse.height,
                    pokemonVarietieStats: [
                        {name: 'HP', value: pokemonVarietieResponse.stats[0].base_stat},
                        {name: 'Attack', value: pokemonVarietieResponse.stats[1].base_stat},
                        {name: 'Defense', value: pokemonVarietieResponse.stats[2].base_stat},
                        {name: 'SpecialAtk', value: pokemonVarietieResponse.stats[3].base_stat},
                        {name: 'SpecialDfn', value: pokemonVarietieResponse.stats[4].base_stat},
                        {name: 'Agility', value: pokemonVarietieResponse.stats[5].base_stat}
                        ]
                    }
                } else { //Si no tiene tipo secundario
                    pokemonVarietieInfo = {
                    pokemonVarietieName : pokemonVarietieResponse.name,
                    pokemonVarietieArtwork: pokemonVarietieResponse.sprites.other["official-artwork"].front_default,
                    pokemonVarietieFirstType: pokemonVarietieResponse.types[0].type.name,
                    pokemonVarietieWeight: pokemonVarietieResponse.weight,
                    pokemonVarietieHeight: pokemonVarietieResponse.height,
                    pokemonVarietieStats: [
                        {name: 'HP', value: pokemonVarietieResponse.stats[0].base_stat},
                        {name: 'Attack', value: pokemonVarietieResponse.stats[1].base_stat},
                        {name: 'Defense', value: pokemonVarietieResponse.stats[2].base_stat},
                        {name: 'SpecialAtk', value: pokemonVarietieResponse.stats[3].base_stat},
                        {name: 'SpecialDfn', value: pokemonVarietieResponse.stats[4].base_stat},
                        {name: 'Agility', value: pokemonVarietieResponse.stats[5].base_stat}
                        ]
                    }
                }

                //Excepciones con pokemones
                if(this.pokemonSpecieData.pokemonSpecieName === 'pikachu'){
                    if( i < 1 || i > 13)
                        this.pokemonSpecieData.pokemonVarieties.push(pokemonVarietieInfo)
                } else {
                    this.pokemonSpecieData.pokemonVarieties.push(pokemonVarietieInfo)
                }                
                
            }
            console.log(this.pokemonSpecieData)
        },
        setPokedexInfo(pokedexEntries){

            for (let i = 0; i < pokedexEntries.length; i++) {
                if(pokedexEntries[i].language.name == 'es' && pokedexEntries[i].version.name == 'sword') {
                    return pokedexEntries[i].flavor_text;
                } else if(pokedexEntries[i].language.name == 'es' && pokedexEntries[i].version.name == 'lets-go-pikachu') {
                    return pokedexEntries[i].flavor_text;
                } else if(pokedexEntries[i].language.name == 'es' && pokedexEntries[i].version.name == 'ultra-sun') {
                    return pokedexEntries[i].flavor_text;
                } else if(pokedexEntries[i].language.name == 'es' && pokedexEntries[i].version.name == 'x') {
                    return pokedexEntries[i].flavor_text;
                } else if(pokedexEntries[i].language.name == 'en' && pokedexEntries[i].version.name == 'sword') {
                    return pokedexEntries[i].flavor_text;
                }
            }

        },
        async fetchEvolutionChain(evolutionChainId){
            const evolutionChainResponse = await this.$store.dispatch('evolutionChain/fetchEvolutionChain', evolutionChainId);
            
            const pokemonSpecieResponse = await this.$store.dispatch('pokemonSpecie/fetchPokemonSpecie', evolutionChainResponse.chain.species.name);
            const pokemonResponse = await this.$store.dispatch('pokemon/fetchPokemon', pokemonSpecieResponse.varieties[0].pokemon.name);

            let chain = {
                pokemonName: pokemonSpecieResponse.name,
                pokemonArtwork: pokemonResponse.sprites.other["official-artwork"].front_default,
                evolvesTo: []
            }

            if(evolutionChainResponse.chain.evolves_to.length > 0){ // Si el pokemon tiene primera evolucion
                for ( const firstEvolvesTo of evolutionChainResponse.chain.evolves_to){

                    const pokemonSpecieResponse = await this.$store.dispatch('pokemonSpecie/fetchPokemonSpecie', firstEvolvesTo.species.name);
                    const pokemonResponse = await this.$store.dispatch('pokemon/fetchPokemon', pokemonSpecieResponse.varieties[0].pokemon.name);

                    let firstEvolves = {
                        pokemonName : pokemonSpecieResponse.name,
                        pokemonArtwork: pokemonResponse.sprites.other["official-artwork"].front_default,
                        evolutionConditions: this.setEvolutionConditions(firstEvolvesTo.evolution_details[0]), //Aquí va una funcion
                        evolvesTo: []
                    }

                    if(firstEvolvesTo.evolves_to.length > 0){
                        for( const secondEvolvesTo of firstEvolvesTo.evolves_to){
                           
                            const pokemonSpecieResponse = await this.$store.dispatch('pokemonSpecie/fetchPokemonSpecie', secondEvolvesTo.species.name);
                            const pokemonResponse = await this.$store.dispatch('pokemon/fetchPokemon', pokemonSpecieResponse.varieties[0].pokemon.name);

                            let secondEvolves = {
                                pokemonName: pokemonSpecieResponse.name,
                                pokemonArtwork: pokemonResponse.sprites.other["official-artwork"].front_default,
                                evolutionConditions: this.setEvolutionConditions(secondEvolvesTo.evolution_details[0]) //Aqui va una funcion
                            }
                            //Se pushea para el evolvesto del primer for
                            firstEvolves.evolvesTo.push(secondEvolves)
                        }
                    }
                    chain.evolvesTo.push(firstEvolves)
                }
            }
            return chain;
        },

        setEvolutionConditions (evolutionConditions) {
            let evolutionConditionsTemporal = [];

            if(evolutionConditions.gender){
                const stringCondition = ('Genero ' + evolutionConditions.gender)
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.held_item){
                const stringCondition = ('Equipar ' + evolutionConditions.held_item.name)
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.item){
                const stringCondition = ('Usar ' + evolutionConditions.item.name)
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.known_move)
                //evolutionConditionsTemporal.push('Conocer', evolutionConditions.known_move.name)

            if(evolutionConditions.known_move_type)
                //evolutionConditionsTemporal.push('Conocer tipo', evolutionConditions.known_move_type.name)

            if(evolutionConditions.location){
                const stringConditions = ('En ' + evolutionConditions.location.name)
                evolutionConditionsTemporal.push(stringConditions)
            }

            if(evolutionConditions.min_affection){
                const stringCondition = (evolutionConditions.min_affection, 'de afecto')
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.min_beauty){
                const stringCondition = (evolutionConditions.min_beauty, 'de belleza')
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.min_happiness){
                const stringCondition = (evolutionConditions.min_happiness, 'de felicidad')
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.min_level){
                const stringCondition = ('Nivel ' + evolutionConditions.min_level)
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.needs_overworld_rain)
                //evolutionConditionsTemporal.push('Mientras llueve')

            if(evolutionConditions.party_species)
                //evolutionConditionsTemporal.push('Tiene que estar', evolutionConditions.party_species)

            if(evolutionConditions.party_type){
                const stringCondition = ('Tiene que esta tipo ' + evolutionConditions.party_type)
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.relative_physical_stats){
                const stringCondition = ('Estadisticas en ' + evolutionConditions.relative_physical_stats)
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.time_of_day){
                const stringCondition = ('Debe ser ' + evolutionConditions.time_of_day)
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.trade_species){
                const stringCondition = ('Intercambiar ' + evolutionConditions.trade_species)
                evolutionConditionsTemporal.push(stringCondition)
            }

            if(evolutionConditions.turn_upside_down)
                evolutionConditionsTemporal.push('Volteado')

            return evolutionConditionsTemporal;            
        },
        changeSelectedForm (selectedForm) {
            this.selectedFormData = selectedForm;
        }
    }
}
</script>

<style lang="scss" scoped>    
</style>