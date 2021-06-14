<template>
  <v-app v-cloak>
      <!--Navigation-->
      
    <Navigation/>

    <!--App bar-->
    <AppBar/>


    <!--Main content-->

    <v-main :class="styleBackground">
       
      <v-container >
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
  computed:{
    styleBackground(){
      return this.$route.name=='PokemonInfo' ? 'normal' : 'white';
    }
  },
  methods:{
    prueba(){
      console.log('jola')
    }
  }

}
</script>

<style lang="scss" scoped>


</style>
