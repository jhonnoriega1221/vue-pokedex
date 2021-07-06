<template>
	<v-dialog
	scrollable
	v-model="showDialog"
	width="500"
	v-on:click:outside="closeDialog"
	>
		<v-card>
			<v-card-title>
				Filtrar y ordenar
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-container>
					<v-row>

						<!--Agrupar por-->
						<v-col
						cols="12"
						md="6"
						>
							<v-select
							
							outlined
							v-model="selectedGroupBy"
							name="groupBy"
		                  	label="Agrupar por"
		                  	required
		                  	:items="groupBy"
		                  	item-text="name"
		                  	item-value="value"
		                  	>
		                  			
		                  	</v-select>
						</v-col>

						<!--Orden de agrupación-->
						<v-col
						cols="12"
						md="6"
						>
							<v-select
							
							outlined
							v-model="selectedOrder"
							name="order"
		                  	label="Orden"
		                  	required
		                  	:items="order"
		                  	item-text="name"
		                  	item-value="value"


		                  	>
		                  			
		                  	</v-select>
						</v-col>

					</v-row>

					<v-row>
						<v-divider class="mb-6"></v-divider>
					</v-row>

					<v-row>

						<!--Regiones-->
						<v-col
						cols="12"
						md="6"
						>
							<v-select
							outlined
							v-model="selectedRegion"
		                  	name="regions"
		                  	label="Región"
		                  	required
		                  	:items="regions"
		                  	item-text="name"
		                  	item-value="value"
		                  	>
		                  			
		                  	</v-select>
						</v-col>

						<!--Tipos -->
						<v-col
						cols="12"
						md="6"
						>
							<v-select
							
							outlined
		                  	v-model="selectedType"
		                  	name="types"
		                  	label="Tipo"
		                  	required
		                  	:items="types"
		                  	item-text="name"
		                  	item-value="value"
		                  	>
		                  			
		                  	</v-select>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions

			>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					text
					v-on:click="closeDialog"
				>
					Cerrar
				</v-btn>
				<v-btn
					color="primary"
					
					v-on:click="applyFilter"
				>
					Aplicar
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name:'FilterForm',
	data:() => {
		return {
			//Tipos
			selectedType:'all',
			types: [{name: 'Todos', value: 'all'},
					{name: 'Planta', value: 'grass'},
					{name: 'Fuego', value: 'fire'},
					{name: 'Agua', value: 'water'},
					{name: 'Bicho siuuuu', value: 'bug'},
					{name: 'Normal', value: 'normal'},
					{name: 'Veneno', value: 'poison'},
					{name: 'Eléctrico', value: 'electric'},
					{name: 'Tierra', value: 'ground'},
					{name: 'Hada', value: 'fairy'},
					{name: 'Lucha', value: 'fighting'},
					{name: 'Psiquico', value: 'psychic'},
					{name: 'Roca', value: 'rock'},
					{name: 'Fantasma', value: 'ghost'},
					{name: 'Hielo', value: 'ice'},
					{name: 'Dragón', value: 'dragon'},
					{name: 'Oscuro', value: 'dark'},
					{name: 'Hierro', value: 'steel'},
					{name: 'Volador', value: 'flying'}],

			//Regiónes
			selectedRegion: 'national',
			regions: [{name: 'Nacional', value: 'national'},
					{name: 'Kanto (I)', value: 'kanto'},
					{name: 'Johto (II)', value: 'johto'},
					{name: 'Hoenn (III)', value: 'hoenn'},
					{name: 'Sinnoh (IV)', value: 'sinnoh'},
					{name: 'Teselia (V)', value: 'unova'},
					{name: 'Kalos (VI)', value: 'kalos'},
					{name: 'Alola (VII)', value: 'alola'},
					{name: 'Galar (VIII)', value: 'galar'}],

			//Agrupar por
			selectedGroupBy:'number',
			groupBy:[{name: 'Número', value:'number'},
					{name:'Nombre', value: 'name'}],

			//Orden de agrupación
			selectedOrder:'asc',
			order: [{name: 'Ascendente ↓', value: 'asc'},
						{name: 'Descendente ↑', value: 'des'}],

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
	mounted(){
		this.selectedType = this.$route.query.type
		this.selectedRegion = this.$route.query.region
		this.selectedOrder = this.$route.query.order
		this.selectedGroupBy = this.$route.query.groupby

		if(this.$route.query.type === undefined)
			this.selectedType = 'all'
		else
			this.selectedType = this.$route.query.type

		if(this.$route.query.region === undefined)
			this.selectedRegion = 'national'
		else
			this.selectedRegion = this.$route.query.region

		if(this.$route.query.groupby === undefined)
			this.selectedGroupBy = 'number'
		else
			this.selectedGroupBy = this.$route.query.groupby

		if(this.$route.query.order === undefined)
			this.selectedOrder = 'asc'
		else
			this.selectedOrder = this.$route.query.order
	},
	methods: {
		closeDialog(){
			if(this.$route.query.type === undefined)
				this.selectedType = 'all'
			else
				this.selectedType = this.$route.query.type

			if(this.$route.query.region === undefined)
				this.selectedRegion = 'national'
			else
				this.selectedRegion = this.$route.query.region

			if(this.$route.query.groupby === undefined)
				this.selectedGroupBy = 'number'
			else
				this.selectedGroupBy = this.$route.query.groupby

			if(this.$route.query.order === undefined)
				this.selectedOrder = 'asc'
			else
				this.selectedOrder = this.$route.query.order
			
			this.$router.back();
		},
		applyFilter(){
			this.$router.push({hash:'',
				query:{
					type:this.selectedType,
					region:this.selectedRegion,
					groupby:this.selectedGroupBy,
					order:this.selectedOrder,
					page:this.$route.query.page
				}	
			})
		}
	}
}
</script>

<style lang="scss">

</style>