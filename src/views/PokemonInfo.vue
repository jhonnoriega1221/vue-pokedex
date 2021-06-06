<template>
    <div class="pokemon-info">
        <h1 class="white--text">Bulbasaur</h1>
        <span class="d-block white--text text-right">#001</span>
        <v-chip dark style="height:25px"  class="mr-2 text-center" color="rgba(255, 255, 255, 0.3)">Planta</v-chip>
        <v-chip dark style="height:25px"  class="mr-2 text-center" color="rgba(255, 255, 255, 0.3)">Veneno</v-chip>
        <img class="pokeball-bg" src="../assets/pokeball.svg" alt="">
        <v-img class="text-right" width="200px" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"></v-img>
        <v-card>
        <v-tabs :vertical="!this.$vuetify.breakpoint.mobile">
            <v-tab>Acerca de</v-tab>
            <v-tab>Estadisticas</v-tab>
            <v-tab>Evoluciones</v-tab>
            <v-tab>Movimientos</v-tab>

            <v-tab-item>
                <v-card flat>
                    <v-card-text>Especie: Semilla<br>Altura: 0.7 cm<br>Peso:6.9 kg <br>Habilidades: Clorofita</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>HP: 45 <v-progress-linear value="50"></v-progress-linear><br>Ataque: 60 <v-progress-linear value="50"></v-progress-linear><br>Defensa: 48 <br>Ataque especial: 66  <v-progress-linear value="50"></v-progress-linear>  </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item></v-tab-item>
            <v-tab-item></v-tab-item>

        </v-tabs>

        </v-card>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>    
.pokeball-bg{
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(137deg) brightness(103%) contrast(101%) opacity(.2);
        position: absolute;
        left: 0;
        top: 10%;
        width: 30%;
    }
</style>