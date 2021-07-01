<template>
	<v-dialog
	v-model="showDialog"
	width="500"
	v-on:click:outside="closeDialog"
	>
		<v-card>
			<v-card-title class="">
				Acerca de Pokédex
			</v-card-title>
			<div class="d-flex">
				<v-img transition=none src="../assets/logo.png" width="10" class="ma-8"></v-img>
				<v-img transition=none src="../assets/logo2.png" width="60" class="ma-1"></v-img>
			</div>
			<v-card-text class="text-center">Creado con <a href="https://vuejs.org/" target="_blank">Vue</a> y <a href="https://vuetifyjs.com/en/" target="_blank">Vuetify</a></v-card-text>

			<v-img transition=none src="../assets/person.png" width="50" class="ma-auto"></v-img>

			<v-card-text class="text-center">
				Creado por
				Jhon Noriega <br>
				<a href="https://github.com/jhonnoriega1221/vue-pokedex" target="_blank">GitHub</a>
				<br>
			</v-card-text>
			<v-card-text class="text-right">
				v0.1 | 2021
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