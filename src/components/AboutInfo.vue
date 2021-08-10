<template>
	<v-dialog
	v-model="showDialog"
	width="500"
	v-on:click:outside="closeDialog"
	scrollable
	>
		<v-card>
			<v-card-title>
				Acerca de Pokédex
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text class="text-center">
				<p class="text-subtitle-2 mt-4">Tecnologías usadas: </p>

				<v-img class="d-inline-block " transition=none src="../assets/logo.png" width="40" ></v-img>
				<a href="https://vuejs.org/" target="_blank" class="d-inline-block mr-6">Vue</a>
				
				<v-img class="d-inline-block " transition=none src="../assets/logo2.png" width="40" ></v-img>
				<a href="https://vuetifyjs.com/" target="_blank" class="d-inline-block mr-4">Vuetify</a>
				

				<v-img class="d-inline-block mr-2" transition=none src="../assets/logo3.png" width="80" ></v-img>
				<a href="https://pokeapi.co/" target="_blank" class="d-inline-block">PokéAPI</a>
				
				<br>
				<v-img transition=none src="../assets/person.png" width="50" class="ma-auto mt-10"></v-img>

				<p class="text-center text-subtitle-2">
					Creado por
					Jhon Noriega <br>
					<a href="https://github.com/jhonnoriega1221/vue-pokedex" target="_blank">GitHub</a>
					<br>
				</p>
				<p class="text-right">
					v0.3 | 2021
				</p>
			</v-card-text>
			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					text
					v-on:click="closeDialog"
				>
					Cerrar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'AboutInfo',
	data:() => {
		return{
			showDialog: false
		}
	},
	watch: {
		$route: function(){
			if(this.$route.hash == '#dialog'){
				this.showDialog = true;
			} else {
				this.showDialog = false;
			}
		}
	},
	methods: {
		closeDialog(){
			this.$router.back();
		}
	}
	
}
</script>

<style lang="scss">

</style>