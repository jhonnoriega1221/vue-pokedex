<template>
  <div class="home">
    
<h1>¿Que pokémon estás buscando?</h1>
        <p>Puedes usar la barra de búsqueda de arriba para buscar un pokemon en especifico.</p>
        
    <v-row>

      <!--Botones-->
      <v-col>
          
        <v-row class="homeButtons mb-1">
          <v-col v-for="button in buttons" v-bind:key=button.name cols=6>
            <v-card
              
              rounded="xl"
              ripple
              flat
              dark
              :color=button.color
              class="py-7 px-4 "
              :to="{name: button.route}"
            >
              <h3 class="text-">{{button.name}}</h3>
            </v-card>
          </v-col>
          </v-row>
        </v-col>

        <!--Pokemons destacados-->
        <v-col class="mb-10" cols="12" sm="5" md="5" lg="5">
          <v-card
          outlined
          rounded="xl"
          >
            <v-card-title>
              Pokemons destacados
            </v-card-title>
            <v-divider></v-divider>
              <v-list
                two-line
              >
                <v-list-item
                  v-for="pokemon of pokeFeatured"
                  :key="pokemon.name"
                  ripple
                  :to="{ name:'PokemonInfo', params: { pokemon_name: pokemon.name }}"
                >
                  <v-list-item-avatar
                    tile
                  >
                    <v-img
                    :src="pokemon.artwork"
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium text-capitalize">#{{pokemon.number}} · {{pokemon.name}}</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip small class="mr-1">{{pokemon.primaryType}}</v-chip>
                      <v-chip small v-if="pokemon.secondaryType">{{pokemon.secondaryType}}</v-chip>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
          </v-card>
        </v-col>
      </v-row>
      
      <!--Noticias pokimons-->
      <h2 class="mb-6">Noticias pokemon</h2>
      <v-row>
        <v-col v-for="pokeNew in pokeNews" :key="pokeNew.i" cols="12" sm="6" md="6" lg="4">
          <v-card
          outlined
          rounded="xl"
          ripple
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  style="line-height: 1.3em; height: 3.7em; overflow:hidden"
                  class="text-body-1 font-weight-bold"
                  
                >
                    {{pokeNew.title}}

                </v-card-title>

                <v-card-subtitle class=" text-subtitle-2 font-weight-bold mt-1" v-text="pokeNew.date"></v-card-subtitle>
              </div>

              <v-avatar
                class="ma-3"
                tile
                min-width="115"
                height="80"
              >
                <v-img style="border-radius:20px" :src="pokeNew.imageUrl"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>

<!--
    <v-row>
      <v-col cols="6">
        <h2>Pokémons destacados</h2>
        <v-col v-for="button in buttons" v-bind:key=button.id cols=12>
        <v-card
          rounded
          ripple
          flat
          color="#ffffff"
          elevation="6"
          cols=6
          class="pa-5"
        >
          <h3 class="text-">{{button.name}}</h3>
        </v-card>
      </v-col>
      </v-col>
      <v-col cols="6">
        <h2>Noticias pokémon</h2>
        <v-col v-for="button in buttons" v-bind:key=button.id cols=12>
        <v-card
          rounded
          ripple
          flat
          color="#ffffff"
          elevation="6"
          cols=6
          class="pa-5"
        >
          <h3 class="text-">{{button.name}}</h3>
        </v-card>
      </v-col>
      </v-col>
      
    </v-row>
-->
  </div>
</template>

<script>

export default {
  data : () => {
    return {
      buttons: [
        {name: 'Pokedex', route: 'Pokedex', color: '#4fc1a6'},
        {name: 'Movimientos', route: 'NotYet', color: '#f7786b'},
        {name: 'Objetos', route: 'NotYet', color: '#ffce4b'},
        {name: 'Lugares', route: 'NotYet', color: '#58aaf6'},
        {name: 'Tipos', route: 'NotYet', color: '#7c538c  '},
        {name: 'Group Builder', route: 'NotYet', color: '#b1736c'}
      ],
      pokeNews: [
        {title: 'Todo lo que sabemos del personaje adicional que llegaría a Pokémon Unite tras los tres primeros', imageUrl: 'https://picsum.photos/500/300', date:'10 May 2020', link:''},
        {title: 'Niantic, responsable de Pokémon GO, detalla un plan para fusionar el mundo real con el virtual ', imageUrl: 'https://picsum.photos/300/200', date:'10 May 2020', link:''},
        {title: 'Cómo encontrar y capturar a Meowth de Galar shiny en Pokémon GO', imageUrl: 'https://picsum.photos/300/300', date:'10 May 2020', link:''},
        {title: 'Pokémon Unite está usando nombres de cuentas reales para ocultar bots en el modo clasificatorio', imageUrl: 'https://picsum.photos/300/100', date:'10 May 2020', link:''},
        {title: 'Vídeo: Ponen a prueba si Zapdos supone victoria asegurada en Pokémon Unite', imageUrl: 'https://picsum.photos/600/300', date:'10 May 2020', link:''},
        {title: 'Pronto podremos conocer noticias de Leyendas Pokémon: Arceus, afirman desde The Pokémon Company', imageUrl: 'https://picsum.photos/300/200', date:'10 May 2020', link:''}
      ],
      pokeFeatured: [
        {name: 'bulbasaur', artwork:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', number:'1', primaryType:'Grass', secondaryType:'Poison'},
        {name: 'squirtle', artwork:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', number:'7', primaryType:'Water', secondaryType:''},
        {name: 'charmander', artwork:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', number:'4', primaryType:'Fire', secondaryType:''}
      ]
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>
