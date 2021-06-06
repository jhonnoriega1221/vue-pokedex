<template>
    <div class="pokemon-card-info">
        <v-card>
            <v-tabs show-arrows :vertical="!this.$vuetify.breakpoint.mobile">
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
    name: 'PokemonCardInfo'
}
</script>

<style lang="scss">

</style>