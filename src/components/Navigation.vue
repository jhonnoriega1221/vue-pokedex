<template>
    <div class="navigation">
        <!--Navigation (Desktop)-->
        <v-navigation-drawer 
        app 
        clipped
        >
            <v-list shaped dense>
                <v-list-item-group
                color="accent"
                >
                    <!--Home-->
                    <v-list-item to="/">
                        <v-list-item-icon>
                            <v-icon>home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Inicio</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!--Pokedex-->
                    <v-list-item :to="{ name:'Pokedex'}">
                        <v-list-item-icon>
                            <v-icon>view_list</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Pokédex</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <!--Favoritos-->
                    <!--v-list-item to="/lorem">
                        <v-list-item-icon>
                            <v-icon>star</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Favoritos</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item-->

                </v-list-item-group>
            </v-list>

        </v-navigation-drawer>

        <!--Bottom navigation (Mobile)-->
        <v-bottom-navigation 
        app 
        color="accent"         
        v-if="$vuetify.breakpoint.mobile"
        >
            <v-btn to="/">
                <span>Inicio</span>
                <v-icon>home</v-icon>
            </v-btn>

            <v-btn :to="{ name:'Pokedex'}">
                <span>Pokedex</span>
                <v-icon>view_list</v-icon>
            </v-btn>

            <!--v-btn to="/lorem">
                <span>Favoritos</span>
                <v-icon>star</v-icon>
            </v-btn-->
        </v-bottom-navigation>
    </div>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style lang="scss">

</style>