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
import Pokecard from '@/components/PokemonCard.vue'
import FilterForm from '@/components/FilterForm.vue'

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
            apiLimit: 12, //Limite de consulta de la API
            apiOffset: 0, //Offset de la consulta de la API
            paginationPage: 0, //Posición del paginador
            paginationLimit: 0 //Limite del paginador
        }
    },
    computed: {

    },
    async mounted() {
        this.setPagination(); //Metodo que determina la paginación de acuerdo la query en el router
        this.getPokemonList(); //METODO QUE ME OBTIENE LOS POKIMONS (NUEVO)
    },
    watch: {
        $route (newVal, oldVal) { //Actualiza la lista de pokemons al cambiar la ruta
            if( oldVal.hash == newVal.hash ) {
                this.setPagination();
                window.scrollTo(0,0);
                this.getPokemonList();
            }
        }
    },
    methods: {

        //Verifica si está activado algún filtro
        async getPokemonList(){
            if(this.pokemons.length === 0) { //Si la variable pokemons está vacia
                if( //Si no se ha seleccionado ningun filtro
                (this.$route.query.pokedex === 'national' || this.$route.query.pokedex === undefined) && 
                (this.$route.query.type === 'all' || this.$route.query.type === undefined)
                ){
                    //Obtiene los pokemons de la pokedex nacional
                    const response = await this.$store.dispatch('pokedex/fetchPokedex', 'national');
                    this.pokemons = response.pokemon_entries;
                } else //Si hay filtros activados
                    //Filtra la pokedex de acuerdo a los filtros colocados
                    this.pokemons = await this.filterPokedex();
            }

            this.paginationLimit = Math.round(this.pokemons.length / this.apiLimit)//Se calcula la cantidad de paginas del paginador
            await this.setPokemonPagination(); //Se dividen los pokemons por pagina

        },

        async setPokemonPagination(){
            let pokemonsPaginationTemporal = [];
            this.pokemonsPagination = [] //Vacia la variable de la paginacion de pokemons
            
            //For que inserta los pokemones de la lista general al paginador
            for(let i = this.apiOffset; i < (this.apiOffset + this.apiLimit); i++){
                if(this.pokemons[i])
                    pokemonsPaginationTemporal.push(this.pokemons[i])
            }


            //For que agrega los datos al paginador
       
             for( const [i, pokemonPagination] of pokemonsPaginationTemporal.entries()){
                const pokemonSpecieResponse = await this.$store.dispatch('pokemonSpecie/fetchPokemonSpecie', pokemonPagination.pokemon_species.name);
                pokemonsPaginationTemporal[i].pokemon_species.url = pokemonSpecieResponse;
                
                const pokemonResponse = await this.$store.dispatch('pokemon/fetchPokemon', pokemonPagination.pokemon_species.url.varieties[0].pokemon.name);
                
                //Agrega los datos de pokemonSpecie a la paginacion de pokemons
                pokemonsPaginationTemporal[i].pokemon_species.url.varieties[0].pokemon.url = pokemonResponse;
                
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

            let pokedexPokemons; //Variable que almacena los pokemons de la pokedex seleccionada
            let filterPokedexPokemonsTemporal = []; //Variable que almacena los pokemons filtrados temporalmente

            //Obtiene la pokedex solicitad
            if(this.$route.query.pokedex === 'national' ||
            this.$route.query.pokedex === undefined){ //Si la pokedex es nacional
                pokedexPokemons = await this.$store.dispatch('pokedex/fetchPokedex', 'national');
            } else { //Si la pokedex es otra
                pokedexPokemons = await this.$store.dispatch('pokedex/fetchPokedex', this.$route.query.pokedex);
            }

            if //Si solo se filtró la pokedex
            (this.$route.query.type === 'all' || this.$route.query.type === undefined)
            {

                //Lógica para filtrar la pokedex
                return(pokedexPokemons.pokemon_entries);

            } else {//Si tambien se filtraron los tipos 
                let pokemonsNamesTypeList = []; //Variable que almacena los nombres de los pokemons de un tipo
                let pokemonsNamesPokedexList = []; //Variable que me almacena los nombres de los pokemons de una pokedex

                const pokemonsTypeList = await this.$store.dispatch('type/fetchType', this.$route.query.type);

                for(const typePokemonName of pokemonsTypeList.pokemon){
                    pokemonsNamesTypeList.push(typePokemonName.pokemon.name)
                }

                for(const pokedexPokemonName of pokedexPokemons.pokemon_entries){
                    pokemonsNamesPokedexList.push(pokedexPokemonName.pokemon_species.name)
                }

                //Se compara pokemonsNamesTypeList con pokedexPokemons y los pokemones que coincidan se agregan a pokemons
                for(const pokemonName of pokemonsNamesTypeList){

                    const typeIsInPokedex = (pokemon) => pokemon === pokemonName

                    if(pokemonsNamesPokedexList.includes(pokemonName)){
                        filterPokedexPokemonsTemporal.push(pokedexPokemons.pokemon_entries[pokemonsNamesPokedexList.findIndex(typeIsInPokedex)])
                    }
                }
                console.log(filterPokedexPokemonsTemporal)
                return(filterPokedexPokemonsTemporal);
            }
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

        async applyFilter(selectedType, selectedRegion, selectedPokedex, selectedOrder, selectedGroupBy){
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
            this.pokemons = [];
            await this.getPokemonList();

        }
    }
}
</script>

<style lang="scss">

</style>