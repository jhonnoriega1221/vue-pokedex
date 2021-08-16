<template>
	<div class="text-center ">
		<h1 class="display-4">404</h1>
		<div v-if="getRandom == 3">
			<h1 class="mb-5">¿Que tienen en común esta página y tu dignidad?</h1>
			<h2 class="mb-5 ">que ninguna de las dos existen</h2>
		</div>
		<div v-else>
			<h1 class="mb-5">Oh no, parece que te has perdido</h1>
		</div>
		<v-btn color="accent" :to="{name: 'Home'}">Volver al inicio</v-btn>
	</div>
</template>

<script>
export default {
	data : () => {
		return {
			RN : 0
		}
	},
	computed: {
		getRandom(){
			const n = Math.random() * (10 - 0) + 0
			Math.round()
			return Math.round(n);
		}
	},
	mounted() {

	}
}
</script>