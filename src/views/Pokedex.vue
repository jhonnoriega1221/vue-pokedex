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
                    <div v-if="pokemonSpeciesURLList">
                        <Pokecard v-bind:pokemonSpecieURL="pokemonSpeciesURLList[i]"/>
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
        :length="75"
        :total-visible="8"
        circle
        v-model="paginationPage"
        @input="nextPage"
        >

        </v-pagination>

        <!--Form de filtros-->
        <FilterForm/>

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
            pokemonSpeciesURLList: '', //Lista de las especies de pokemon obtenidas de la API
            apiLimit: 12, //Limite de consulta de la API
            apiOffset: 0, //Offset de la consulta de la API
            paginationPage: 0 //Posición del paginador
        }
    },
    computed: {
        ...mapGetters('pokedex', ['getPokedexes', 'getPokedex']),
        ...mapGetters('type', ['getTypes', 'getType'])
    },
    async mounted() {
        if( this.getPokedexes.length === 0 ) {
            //loadingScreen
            this.isLoading = true;                       
            await this.$store.dispatch('pokedex/fetchPokedexes')

            this.isLoading = false;
        }
        this.setPagination(); //Metodo que determina la paginación de acuerdo la query en el router

        this.getPokemonSpecies();


        this.getPokemonSpeciesURLs(this.apiLimit, this.paginationPage) //Metodo que obtiene los datos de la API
    },
    watch: {
        $route (newVal, oldVal) { //Actualiza la lista de pokemons al cambiar la ruta
            if( oldVal.hash == newVal.hash ) {
                this.setPagination();
                this.pokemonSpeciesURLList=''
                window.scrollTo(0,0)
                this.getPokemonSpeciesURLs(this.apiLimit, this.paginationPage)
            }
        }
    },
    methods: {

        //Verifica si está activado algún filtro
        async getPokemonSpecies(){
            if(
            (this.$route.query.pokedex === 'national' || this.$route.query.pokedex === undefined) && 
            (this.$route.query.typeone === 'all' || this.$route.query.typeone === undefined) && 
            (this.$route.query.typetwo === 'all' || this.$route.query.typetwo === undefined)
            ){
                //Si No hay ningún filtro activado entonces obtiene la lista de pokemons en la pokedex nacional
                if(typeof(this.getPokedex('national').url) === 'string') {
                    //Pendiente colocar loading
                    await this.$store.dispatch('pokedex/fetchPokedex', 'national');
                    //Pendiente colocar loading
                }
                this.pokemons = this.getPokedex('national').url.pokemon_entries;
            } else 
                await this.filterPokedex();

            this.setPokemonPagination();


        },

        setPokemonPagination(){
            let initPosition = this.apiOffset * (this.paginationPage-1);
            let endPosition = this.apiLimit * this.paginationPage;

            if(this.pokemonsPagination.length > 0)
                this.pokemonsPagination = []

            for(let i = 0; initPosition < endPosition; i++){
                this.pokemonsPagination.push(this.pokemons[initPosition])
                initPosition++;
            }
            console.log(this.pokemonsPagination)
        },

        async filterPokedex() {
            

            if( //Si solo se filtró la pokedex
            (this.$route.query.typeone === 'all' || this.$route.query.typeone === undefined) &&
            (this.$route.query.typetwo === 'all' || this.$route.query.typetwo === undefined)
            ) {

                //Lógica para filtrar la pokedex

                //Si el state está vacio
                if(typeof(this.getPokedex(this.$route.query.pokedex).url) === 'string') {
                    //Pendiente colocar loading
                    await this.$store.dispatch('pokedex/fetchPokedex', this.$route.query.pokedex);
                    //Pendiente colocar loading
                }
                this.pokemons = this.getPokedex(this.$route.query.pokedex).url.pokemon_entries;

            } else if( //Si solo se filtraron los tipos
            this.$route.query.pokedex === 'national' ||
            this.$route.query.pokedex === undefined
            ) {

                //Lógica para filtrar los tipos

                //Si el state está vacío
                                

            } else { //Si se filtran ambos
                const pokedexEntries = [];
                const typeEntries = [];
                console.log('Else')
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
        },

        nextPage(page) { //Cambia la query de la ruta al cambiar de valor en el paginador
            this.$router.push({
                    name:'Pokedex',
                    query:{
                        typeone:this.$route.query.typeone,
                        typetwo:this.$route.query.typetwo,
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
                    typeone:this.$route.query.typeone,
                    typetwo:this.$route.query.typetwo,
                    region:this.$route.query.region,
                    pokedex:this.$route.query.pokedex,
                    groupby:this.$route.query.groupby,
                    order:this.$route.query.order,
                    page:this.$route.query.page
                },
                hash:'filter'
            })
        }
    }
}
</script>

<style lang="scss">

</style>