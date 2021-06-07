<template>
    <div class="pokemon-card-info">
        <v-card>
            <v-tabs show-arrows >
                <v-tab>Acerca de</v-tab>
                <v-tab>Estadisticas</v-tab>
                <v-tab>Evoluciones</v-tab>
                <v-tab>Movimientos</v-tab>

                <!--Acerca de-->
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            
                        </v-card-text>
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

<style lang="scss">

    

    .card-info-title{
        padding:5px 12px;
    }

    .card-info-info{
        padding:5px 12px;
        color: black;
    }

</style>