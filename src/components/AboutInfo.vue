<template>
	<v-dialog
	v-model="showDialog"
	width="500"
	v-on:click:outside="closeDialog"
	>
		<v-card>
			<v-card-title class="">
				Pokedex
			</v-card-title>
			<div class="d-flex">
				<v-img src="../assets/logo.png" width="30" class="ma-8"></v-img>
				<v-img src="../assets/logo2.png" width="70" class="ma-1"></v-img>
			</div>
			<v-card-text class="text-center">Creado con <a href="https://vuejs.org/" target="_blank">Vue</a> y <a href="https://vuetifyjs.com/en/" target="_blank">Vuetify</a></v-card-text>

			<v-img src="../assets/person.png" width="100" class="ma-auto"></v-img>

			<v-card-text class="text-center">
				Creado por
				Jhon Noriega <br>
				<a href="https://github.com/" target="_blank">GitHub</a>
				<br>
			</v-card-text>
			<v-card-text class="text-right">
				v1.0
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'AboutInfo',
	props: {
	},
	data:() => {
		return{
			showDialog: false
		}
	},
	watch: {
		$route: function(){
			console.log('entra')
			if(this.$route.hash == '#dialog'){
				this.showDialog = true;
			} else {
				this.showDialog = false;
			}
		}
	},
	methods:{
		closeDialog(){
			this.$router.back()
		}
	}
	
}
</script>

<style lang="scss">

</style>