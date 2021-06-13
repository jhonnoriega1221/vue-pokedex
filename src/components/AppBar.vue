<template>
    <v-app-bar 
    
      app 
      clipped-left 
      :color = "searchMode && this.$vuetify.breakpoint.mobile ? 'white' : 'primary'"
      dark
      
    >
      <!--Div del titulo y logo-->
      <div
        class="d-flex"
        v-if = "!searchMode || !this.$vuetify.breakpoint.mobile">

        <!--Logo-->
        <v-app-bar-title
          class="text-h6"
        >
          <v-icon>home</v-icon>
        </v-app-bar-title>

        <!--Titulo-->
        <v-app-bar-title 
          class="text-h6 pt-1 ml-3"
          :hidden = "this.$vuetify.breakpoint.mobile"
        >
          Pokedex
        </v-app-bar-title>
      </div>

      <v-spacer></v-spacer>

      <!--Search bar-->
      <v-autocomplete
        v-if="!this.$vuetify.breakpoint.mobile || searchMode"
        flat
        light
        dense 
        label="Buscar" 
        class="mt-6"
        solo
        clearable
        type="text"
        hide-no-data
        v-model="searchSelect"
        :search-input.sync="dataSearch"
        :items="searchSuggestions"
        @click:clear="metodoPrueba"
        append-icon="search"
      >
        <template v-if="$vuetify.breakpoint.mobile" v-slot:prepend-inner>
          <v-btn
            small
            icon
            rounded
            v-on:click="switchSearchMode"
          >
            <v-icon>
              arrow_back
            </v-icon>
          </v-btn>
        </template>

      </v-autocomplete>

      <v-spacer></v-spacer>

      <!--div de los botones a la derecha de la app bar-->
      <div 
        v-if = "!searchMode || !this.$vuetify.breakpoint.mobile">
        
        <!--Search btn-->
        <v-btn
          v-if= "!searchMode && this.$vuetify.breakpoint.mobile"
          v-on:click="switchSearchMode"
          icon
        >
          <v-icon>
            search
          </v-icon>
        </v-btn>

        <!--Login btn-->
        <v-btn 
          v-if= "!logged"
          color="accent" 
          depressed 
          rounded
          v-on:click="switchLogged()"
        >
          Ingresar
        </v-btn>
        
        <!--Avatar -->
        <v-menu 
          v-if="logged"
          bottom
          offset-y
          min-width="200px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              large
              v-on="on"
            >
              <v-avatar
                color="accent"
                size="38"
              >
                <span>JN</span>
              </v-avatar>
            </v-btn>
          </template>

          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-avatar
                  color="accent"
                >
                  <span class="white--text">JN</span>
                </v-avatar>
                <h3 class="mt-3">Jhon Noriega</h3>
                <p class="text-caption mt-1">
                  jhonlex17@gmail.com
                </p>

                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                >
                  Editar cuenta
                </v-btn>

                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  v-on:click="switchLogged()"
                >
                  Cerrar sesión
                </v-btn>

              </div>
            </v-list-item-content>
          </v-card>

        </v-menu>

        <!--Options menu-->
        <v-menu
          nudge-right="2"
          bottom
          left
          offset-y
          offset-x
        >
          <template v-slot:activator="{on}">
            <v-btn
              icon
              large
              v-on="on"
            >
              <v-icon>
                more_vert
              </v-icon>
            </v-btn>
          </template>

          <v-list
            
          >
            <v-list-item 
              link 
              dense
            >
              <v-list-item-title>Opciones</v-list-item-title>
            </v-list-item>

            <v-list-item 
              link 
              dense
            >
              <v-list-item-title>Acerca de</v-list-item-title>
            </v-list-item>
          </v-list>

        </v-menu>
      </div>

    </v-app-bar>
</template>

<script>
import axios from "axios";

export default {
    name: 'AppBar',
    data: () => ({
        logged: false, //PROVISIONAL
        searchMode: false,
        dataSearch:null,
        searchSuggestions:[],
        searchSelect:null
    }),
    watch: {
      dataSearch: function () {
        this.updateSuggestions();
        console.log(this.searchSelect)
        console.log(this.dataSearch)
      }
    },
    methods: {
        switchLogged(){
            this.logged = !this.logged;
        },
        switchSearchMode(){
            this.searchMode = !this.searchMode;
        },
        async updateSuggestions(){
          this.searchSuggestions = []

          await axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=898&offset=0').then(
            res => {
              for(const pokemonResult of res.data.results){
                if(this.dataSearch == '' || this.dataSearch == null)
                  this.searchSuggestions == []
                else if(pokemonResult.name.slice(0,this.dataSearch.length) === this.dataSearch)
                  this.searchSuggestions.push(pokemonResult.name)
              }
            }
          )
        },
        metodoPrueba(){
          console.log('hola')
        }
    }
}
</script>

<style lang="scss">

</style>