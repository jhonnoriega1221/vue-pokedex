<template>
  <div class="home">
    <h1>¿Que pokémon estás buscando?</h1>
    <p>Puedes usar la barra de búsqueda de arriba para buscar un pokemon en especifico.</p>

    <v-row class="homeButtons mb-3">
      <v-col v-for="button in buttons" v-bind:key=button.id cols=6>
        <v-card
          rounded
          ripple
          dark
          flat
          :color=button.color
          class="pa-5"
          :to="{name: button.route}"
        >
          <h3 class="text-">{{button.name}}</h3>
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
        {name: 'Tipos', route: 'NotYet', color: '#b1736c'}
      ]
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>
