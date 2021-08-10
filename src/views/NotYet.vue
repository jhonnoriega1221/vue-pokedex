<template>
	<div class="text-center ">
		<h1 class="display-3">Aún sin implementar</h1>
		<h1 class="mb-5">Oh no, parece esta funcionalidad aún no está implementada</h1>
		<v-btn color="accent" v-on:click="goBack">Volver atrás</v-btn>
	</div>
</template>
<script>
export default {
	methods: {
		goBack(){
			this.$router.back();
		}
	}
}
</script>