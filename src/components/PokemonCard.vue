<template>
    <div class="pokecard">
        <v-row>
            <v-col class="pa-2" cols="6" sm="4" md="3" lg="3" xl="2" v-for="(pokemon, i) in 12"
                v-bind:key="i">
                <v-card
                class="pa-3"
                style="border-radius: 20px"
                color="#49d0b0"
                flat
                ripple
                dark
                to="pokemon/1"
                >
                    <!--Pokeball background-->
                    <img class="pokeball-bg" src="../assets/pokeball.svg" alt="">

                    <!--Pokemon number-->
                    <v-row>
                        <v-col class="pb-0 pt-2" style="//background:brown" cols="12">
                            <v-card-text style="height:20px" class="pa-0 text-h6 text-right font-weight-black text--disabled black--text">#001</v-card-text>
                        </v-col>
                    </v-row>

                    <!--Pokemon name-->
                    <v-row>
                        <v-col class="py-0 pb-1 pl-1" style="//background:red" cols="12">

                            <v-card-title class="text-body pa-0 pl-2 font-weight-bold  ">Bulbasaur</v-card-title>

                        </v-col>

                    </v-row>

                    <v-row>
                        <!--Pokemon Types-->
                        <v-col class="pb-0 pr-0 pt-0" style="//background:green" cols="6">
                            
                            <v-chip style="height:25px" class="mb-1 d-block text-center" color="rgba(255, 255, 255, 0.2)">
                                <span class=" text-caption">Planta</span>
                            </v-chip>
                            <v-chip style="height:25px"  class="mb-1 d-block text-center" color="rgba(255, 255, 255, 0.2)">
                                <span class="text-caption">Veneno</span>
                            </v-chip>

                        </v-col>

                        <!--Pokemon artwork-->
                        <v-col class="pa-0" style="//background:blue" cols="6">
                            
                            <v-img  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"></v-img>

                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

    </div>
</template>

<script>
export default {
    name: 'Pokecard'
}
</script>

<style lang="scss">
    .pokeball-bg{
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(137deg) brightness(103%) contrast(101%) opacity(.2);
        position: absolute;
        left: 35%;
        top: 43%;
        width: 68%;
    }
</style>