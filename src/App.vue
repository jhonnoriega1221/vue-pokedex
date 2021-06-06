<template>
  <v-app>
      <!--Navigation-->
    <Navigation/>

    <!--App bar-->
    <AppBar/>

    <!--Main content-->
    <v-main>
      <v-container :style="styleBackground">
        <router-view/>        
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>

import AppBar from '@/components/AppBar.vue'
import Navigation from '@/components/Navigation.vue'

export default {
    components: {
        AppBar,
        Navigation
    },
  data: () => ({
    logged: false, //PROVISIONAL
    searchMode: false
  }),
  methods:{
    changeLogged(){
      this.logged = !this.logged;
    },
    switchSearchMode(){
      this.searchMode = !this.searchMode;
      
    }
  },
  computed:{
    styleBackground(){
      return this.$route.name=='PokemonInfo' ? 'background-color:#49d0b0' : 'background-color:white';
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
