<template>
    <div class="pokedex" >
        <div class="d-flex">
            <!--Pokedex title-->
            <div>
                <h1 class="pb-7 pr-3">Pokédex</h1>
            </div>

            <!--Filter button (Desktop)-->

            <v-btn
            text
            color="accent"
            class="mt-2"
            :hidden="this.$vuetify.breakpoint.mobile"
            @click="showFilterDialog()"
            >
                <v-icon left>filter_alt</v-icon>
            Filtrar
            </v-btn>
        </div>

        <!--Filter FAB button (Mobile)-->
        <v-btn
        fab
        elevation="2"
        :hidden="$route.hash=='#search'"
        right
        color="accent"
        fixed
        bottom
        class="mb-14"
        @click="showFilterDialog()"
        v-if="this.$vuetify.breakpoint.mobile"
        >
            <v-icon>filter_alt</v-icon>
        </v-btn>
        
        <!--Pokemons cards row-->
        <div >
            <v-row>
                <v-col 
                class="pa-2" cols="6" sm="4" md="3" lg="3" xl="2" v-for="(pokemon, i) in apiLimit"
                v-bind:key="i">

                    <!--Pokemon card-->
                    <div v-if="pokemonsPagination.length > 0">
                        <Pokecard 
                            :pokemonCardData = "pokemonsPagination[i]"
                        />
                    </div>

                    <!--Pokemon card skeleton loader-->
                    <div v-else>
                        <v-skeleton-loader 
                        type="image"
                        style="border-radius: 20px"
                        height="193px"
                        >
                        </v-skeleton-loader>
                    </div>
                </v-col>
            </v-row>
        </div>

        <!--Pokedex pagination-->
        <v-pagination
        class="py-8 mb-12 mb-lg-0"
        :length=paginationLimit
        :total-visible="8"
        circle
        v-model="paginationPage"
        @input="nextPage"
        >

        </v-pagination>

        <!--Form de filtros-->
        <FilterForm
        v-on:applyFilter="applyFilter"
        />

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pokecard from '@/components/PokemonCard.vue'
import FilterForm from '@/components/FilterForm.vue'

import axios from 'axios';

export default {
    components: {
        Pokecard,
        FilterForm
    },
    data: () => {
        return {
            pokemons: [],
            pokemonsPagination: [],
            isLoading: false,
            pokemonSpeciesURLList: '', //Lista de las especies de pokemon obtenidas de la API (DEPRECATED)
            apiLimit: 12, //Limite de consulta de la API
            apiOffset: 0, //Offset de la consulta de la API
            paginationPage: 0, //Posición del paginador
            paginationLimit: 0 //Limite del paginador
        }
    },
    computed: {
        ...mapGetters('pokedex', ['getPokedexes', 'getPokedex']),
        ...mapGetters('type', ['getTypes', 'getType']),
        ...mapGetters('pokemonSpecie', ['getPokemonSpecies', 'getPokemonSpecie']),
        ...mapGetters('pokemon', ['getPokemons', 'getPokemon'])

    },
    async mounted() {
        if( this.getPokedexes.length === 0 ) {
            //loadingScreen
            this.isLoading = true;                       
            await this.$store.dispatch('pokedex/fetchPokedexes')

            this.isLoading = false;
        }

        if( this.getTypes.length === 0) {

            await this.$store.dispatch('type/fetchTypes')

        }

        if( this.getPokemonSpecies.length === 0 ) {
                //loadingScreen
                this.isLoading = true;                       
                await this.$store.dispatch('pokemonSpecie/fetchPokemonSpecies')

                this.isLoading = false;
            }

        //if que valida que hayan datos en el store de pokemons
        if( this.getPokemons.length === 0 ) {
            //loadingScreen
            this.isLoading = true;                       
            await this.$store.dispatch('pokemon/fetchPokemons')

            this.isLoading = false;
        }

        this.setPagination(); //Metodo que determina la paginación de acuerdo la query en el router
        this.getPokemonSpeciesURLs(this.apiLimit, this.paginationPage) //Metodo que obtiene los datos de la API (DEPRECATED)
        this.getPokemonList(); //METODO QUE ME OBTIENE LOS POKIMONS (NUEVO)
    },
    watch: {
        $route (newVal, oldVal) { //Actualiza la lista de pokemons al cambiar la ruta
            if( oldVal.hash == newVal.hash ) {
                this.setPagination();
                window.scrollTo(0,0);
                this.setPokemonPagination();
            }
        }
    },
    methods: {

        //Verifica si está activado algún filtro
        async getPokemonList(){

            if(
            (this.$route.query.pokedex === 'national' || this.$route.query.pokedex === undefined) && 
            (this.$route.query.type === 'all' || this.$route.query.type === undefined)
            ){
                //Si No hay ningún filtro activado entonces obtiene la lista de pokemons en la pokedex nacional
                if(typeof(this.getPokedex('national').url) === 'string') {
                    //Pendiente colocar loading
                    await this.$store.dispatch('pokedex/fetchPokedex', 'national');
                    //Pendiente colocar loading
                }

                this.pokemons = this.getPokedex('national').url.pokemon_entries;
            } else
                //Filtra la pokedex de acuerdo a los filtros colocados
                this.pokemons = await this.filterPokedex();
            this.paginationLimit = Math.round(this.pokemons.length / this.apiLimit)
            await this.setPokemonPagination();

        },

        async setPokemonPagination(){
            let pokemonsPaginationTemporal = [];
            this.pokemonsPagination = []
            
            //For que inserta los pokemones de la lista general al paginador
            for(let i = this.apiOffset; i < (this.apiOffset + this.apiLimit); i++){
                if(this.pokemons[i])
                    pokemonsPaginationTemporal.push(this.pokemons[i])
            }

            //For que agrega los datos al paginador
       
             for( const [i, pokemonPagination] of pokemonsPaginationTemporal.entries()){
                //Si en el store aun no están disponibles los datos de un pokemonSpecie en especifco
                if(typeof(this.getPokemonSpecie(pokemonPagination.pokemon_species.name).url) === 'string' )
                    await this.$store.dispatch('pokemonSpecie/fetchPokemonSpecie', pokemonPagination.pokemon_species.name);
                
                //Agrega los datos de pokemonSpecie a la paginacion de pokemons
                pokemonsPaginationTemporal[i].pokemon_species.url = this.getPokemonSpecie(pokemonPagination.pokemon_species.name).url;
            

                if(typeof(this.getPokemon(pokemonPagination.pokemon_species.url.varieties[0].pokemon.name).url) === 'string' )
                    await this.$store.dispatch('pokemon/fetchPokemon', pokemonPagination.pokemon_species.url.varieties[0].pokemon.name);
                
                //Agrega los datos de pokemonSpecie a la paginacion de pokemons
                pokemonsPaginationTemporal[i].pokemon_species.url.varieties[0].pokemon.url = this.getPokemon(pokemonPagination.pokemon_species.url.varieties[0].pokemon.name).url;
                
                if(pokemonsPaginationTemporal[i].pokemon_species.url.varieties[0].pokemon.url.types.length > 1){
                    this.pokemonsPagination.push(
                        {
                            pokemonName: pokemonsPaginationTemporal[i].pokemon_species.name,
                            pokemonEntry: pokemonsPaginationTemporal[i].entry_number,
                            pokemonTypePrimary: pokemonsPaginationTemporal[i].pokemon_species.url.varieties[0].pokemon.url.types[0].type.name,
                            pokemonTypeSecondary: pokemonsPaginationTemporal[i].pokemon_species.url.varieties[0].pokemon.url.types[1].type.name,
                            pokemonArtwork: pokemonsPaginationTemporal[i].pokemon_species.url.varieties[0].pokemon.url.sprites.other["official-artwork"].front_default
                        }
                    )
                }
                else{
                    this.pokemonsPagination.push(
                        {
                            pokemonName: pokemonsPaginationTemporal[i].pokemon_species.name,
                            pokemonEntry: pokemonsPaginationTemporal[i].entry_number,
                            pokemonTypePrimary: pokemonsPaginationTemporal[i].pokemon_species.url.varieties[0].pokemon.url.types[0].type.name,
                            pokemonArtwork: pokemonsPaginationTemporal[i].pokemon_species.url.varieties[0].pokemon.url.sprites.other["official-artwork"].front_default
                        }
                    )
                }
                
                
            }

            //console.log(this.pokemonsPagination)
        },

        async filterPokedex() {

            let pokedexList;
            let filterPokemonListTemporal = [];
            //Obtiene la pokedex de turno
            if(this.$route.query.pokedex === 'national' ||
            this.$route.query.pokedex === undefined){
                if(typeof(this.getPokedex('national').url) === 'string') {
                    //Pendiente colocar loading0
                    await this.$store.dispatch('pokedex/fetchPokedex', 'national');
                    //Pendiente colocar loading
                }
                pokedexList = this.getPokedex('national').url.pokemon_entries
            } else {
                if(typeof(this.getPokedex(this.$route.query.pokedex).url) === 'string') {
                    //Pendiente colocar loading
                    await this.$store.dispatch('pokedex/fetchPokedex', this.$route.query.pokedex);
                    //Pendiente colocar loading
                }
                pokedexList = this.getPokedex(this.$route.query.pokedex).url.pokemon_entries
            }


            if //Si solo se filtró la pokedex
            (this.$route.query.type === 'all' || this.$route.query.type === undefined)
            {

                //Lógica para filtrar la pokedex
                return(pokedexList);

            } else {//Si tambien se filtraron los tipos 
                let typeList = [];
                let pokedexNameList = [];

                if(typeof(this.getType(this.$route.query.type).url) === 'string')
                    await this.$store.dispatch('type/fetchType', this.$route.query.type);

                for(const typePokemonName of this.getType(this.$route.query.type).url.pokemon){
                    typeList.push(typePokemonName.pokemon.name)
                }

                for(const pokedexPokemonName of pokedexList){
                    pokedexNameList.push(pokedexPokemonName.pokemon_species.name)
                }

                //Se compara typeList con pokedexList y los pokemones que coincidan se agregan a pokemons

                for(const pokemonName of typeList){

                    const typeIsInPokedex = (pokemon) => pokemon === pokemonName
                    if(pokedexNameList.includes(pokemonName)){
                        filterPokemonListTemporal.push(pokedexList[pokedexNameList.findIndex(typeIsInPokedex)])
                    }
                }
                return(filterPokemonListTemporal);
            }
        },

        async getPokemonSpeciesURLs(limit, page){ //Obtiene los datos de la API
            this.apiOffset = limit * (page-1) //Calcula el offset de acuerdo al limite de valores establecidos y la pagina solicitada

            
            await axios.get(`https://pokeapi.co/api/v2/pokemon-species?limit=${limit}&offset=${this.apiOffset}`).then(
                res => {
                    this.pokemonSpeciesURLList = res.data.results
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        setPagination(){ //Determina que valor debe tener la query "page"
            if(!this.$route.query.page){
                //this.$route.query.page = '1'
                this.paginationPage = 1
            } else {
                this.paginationPage = parseInt(this.$route.query.page)
            }
            this.apiOffset = this.apiLimit * (this.paginationPage - 1);

        },

        async nextPage(page) { //Cambia la query de la ruta al cambiar de valor en el paginador
            this.$router.push({
                    name:'Pokedex',
                    query:{
                        type:this.$route.query.type,
                        region:this.$route.query.region,
                        pokedex:this.$route.query.pokedex,
                        groupby:this.$route.query.groupby,
                        order:this.$route.query.order,
                        page:parseInt(page)
                }
            })
        },

        showFilterDialog(){
            this.$router.push({
                query: {
                    type:this.$route.query.type,
                    region:this.$route.query.region,
                    pokedex:this.$route.query.pokedex,
                    groupby:this.$route.query.groupby,
                    order:this.$route.query.order,
                    page:this.$route.query.page
                },
                hash:'filter'
            })
        },

        applyFilter(selectedType, selectedRegion, selectedPokedex, selectedOrder, selectedGroupBy){
            this.$router.push({hash:'',
                query:{
                    type:selectedType,
                    region:selectedRegion,
                    pokedex:selectedPokedex,
                    groupby:selectedGroupBy,
                    order:selectedOrder,
                    page:1
                }
            });
            this.setPagination();
            this.pokemons = this.getPokemonList();

        }
    }
}
</script>

<style lang="scss">

</style>