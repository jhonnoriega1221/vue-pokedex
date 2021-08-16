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
  data: () => {
        return{
        }
    },
  mounted(){
    const theme = localStorage.getItem('dark')
    if(theme) {
      if(theme == 'true') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    }
  },
  computed:{
    styleBackground(){
      return this.$route.name=='PokemonInfo' ? this.$store.getters.getMainBackground : 'background';
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
