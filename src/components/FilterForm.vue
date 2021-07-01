<template>
	<v-dialog
	v-model="showDialog"
	width="500"
	v-on:click:outside="closeDialog"
	>
		<v-card>
			<v-card-title>
				Filtrar y ordenar
			</v-card-title>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name:'FilterForm',
	data:() => {
		return {
			showDialog: false
		}
	},
	watch: {
		$route: function(){
			if(this.$route.hash == '#filter'){
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