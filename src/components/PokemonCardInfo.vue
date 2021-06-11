<template>
    <div class="pokemon-card-info">
        <v-card class="mt-0">
            <v-tabs show-arrows >
                <v-tab>Acerca</v-tab>
                <v-tab>Estadisticas</v-tab>
                <v-tab>Evolución</v-tab>
                <v-tab>Otros</v-tab>

                <!--Acerca de-->
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <p class="black--text">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                            <v-row>

                                <v-col cols="12" lg="5">

                                    <!--Tarjeta que muestra tamaño y peso-->
                                    <v-card elevation="5" class="pa-4">
                                        <v-row class="mb-m1 grey--text">
                                            <v-col cols=6>Altura</v-col>
                                            <v-col cols=6>Peso</v-col>
                                        </v-row>
                                        <v-row class="mt-0">
                                            <v-col cols=6>0.7 cm</v-col>
                                            <v-col cols=6>6.9 kg</v-col>
                                        </v-row>
                                    </v-card>

                                </v-col>

                                <v-col cols="12" lg="7">

                                    <!--Información de crianza-->
                                    <h3 class="black--text pb-7">Crianza</h3>
                                    <v-row>

                                        <v-col class="grey--text py-0" cols=5>
                                            <p>Genero</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=3>
                                            <p class="pink--text d-inline font-weight-bold">F </p>
                                            <p class="d-inline">12%</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=4>
                                            <p class="blue--text d-inline font-weight-bold">M </p>
                                            <p class="d-inline">12%</p>
                                        </v-col>

                                    </v-row>

                                    <v-row>

                                        <v-col class="grey--text py-0" cols=5>
                                            <p>Grupo Huevo</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=7>
                                            <p>Monstruo</p>
                                        </v-col>

                                    </v-row>

                                    <v-row>

                                        <v-col class="grey--text py-0" cols=5>
                                            <p>Ciclo Huevo</p>
                                        </v-col>
                                        <v-col class="black--text py-0" cols=7>
                                            <p>Hierba</p>
                                        </v-col>

                                    </v-row>

                                </v-col>

                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <!--Estadisticas base-->
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class=pb-0>
                                    PS
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    60
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    value="25"
                                    >
                                        
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class=pb-0>
                                    Ataque
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    60
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    value="25"
                                    >
                                        
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class="pb-0 pr-0">
                                    Defensa
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    60
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    value="25"
                                    >
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class="pb-0 pr-0">
                                    Atq. Es
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    60
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    value="25"
                                    >
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row>
                                <v-col cols=3 class="pb-0 pr-0">
                                    Dfns. Es
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    60
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    value="25"
                                    >
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Info-->
                            <v-row class="mb-4">
                                <v-col cols=3 class="pb-0 pr-0">
                                    Agilidad
                                </v-col>
                                <v-col cols=2 class="black--text pb-0">
                                    60
                                </v-col>
                                <v-col cols=7 class="pt-5 pb-0">
                                    <v-progress-linear 
                                    value="25"
                                    >
                                    </v-progress-linear>
                                </v-col>
                            </v-row>

                            <!--Defensas de tipos-->
                            <h3 class="black--text pb-2">Defensas de tipos</h3>
                            <p>La efectividad de cada tipo en bulbasaur.</p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <!--Cadena evolutiva-->
                <v-tab-item>
                    
                </v-tab-item>
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
        color: grey;
    }

    .card-info-text{
        color: black;
    }

</style>