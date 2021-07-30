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

						<!--Tipos -->
						<v-col
						cols="12"
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

						<!--Pokedexes-->
						<v-col
						cols="12"
						md="6"
						>
							<v-select
							:loading=isLoadingPokedexes
							:disabled=isLoadingPokedexes
							outlined
							v-model="selectedPokedex"
		                  	name="pokedexes"
		                  	label="Pokedex"
		                  	required
		                  	:items="pokedexes"
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
					
					v-on:click="$emit('applyFilter', selectedType, selectedRegion, selectedPokedex, selectedOrder, selectedGroupBy)" 

				>
					Aplicar
				</v-btn> <!--Por ahora paso los valores asi en el v-on:click, pero hay que considerar una mejor forma-->
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name:'FilterForm',
	data:() => {
		return {
			isLoadingPokedexes:false,

			//Tipos
			selectedType:'all',
			types: [{name: 'Todos', value: 'all'}],

			//Regiónes
			selectedRegion: 'all',
			regions: [{name: 'Todas', value: 'all'}],

			//Pokedexes
			selectedPokedex: 'national',
			pokedexes: [{name: 'Nacional', value: 'national'}],

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
	computed: {
		...mapGetters('region', ['getRegions', 'getRegion']),
		...mapGetters('type', ['getTypes', 'getType'])
	},
	watch: {
		$route: function(){
			if(this.$route.hash == '#filter'){
				this.showDialog = true;
			} else {
				this.showDialog = false;
			}
		},

		selectedRegion: async function(newValue, oldValue){ //Considerar la opción de colocar esto en un update()
			if(newValue !== oldValue){
				if(this.selectedRegion === 'all'){
					this.pokedexes = [];
					this.pokedexes = [{name: 'Nacional', value: 'national'}]
					this.selectedPokedex = this.pokedexes[0].value
				} else {
					if(typeof(this.getRegion(newValue).url) === 'string'){
						this.isLoadingPokedexes = true;
						await this.$store.dispatch('region/fetchRegion', newValue);
						this.isLoadingPokedexes = false;
					}
					this.pokedexes=[];
					for(const pokedexes of this.getRegion(newValue).url.pokedexes){
						this.pokedexes.push(pokedexes.name)
					}
					this.selectedPokedex = this.pokedexes[0]

				}
			}
		}
	},
	async mounted(){

		if( this.getRegions.length === 0)  {
			await this.$store.dispatch('region/fetchRegions')
		}

		if( this.getTypes.length === 0) {

			await this.$store.dispatch('type/fetchTypes')

		}
		for(const region of this.getRegions){
			this.regions.push({name: region.name, value: region.name})
		}

		for(const type of this.getTypes){
			this.types.push({name: type.name, value: type.name})
		}

		this.restartData();
	},
	methods: {

		restartData(){
			if(this.$route.query.type === undefined)
				this.selectedType = 'all'
			else
				this.selectedType = this.$route.query.type

			if(this.$route.query.region === undefined)
				this.selectedRegion = 'all'
			else
				this.selectedRegion = this.$route.query.region

			if(this.$route.query.pokedex === undefined)
				this.selectedPokedex = 'national'
			else
				this.selectedPokedex = this.$route.query.pokedex

			if(this.$route.query.groupby === undefined)
				this.selectedGroupBy = 'number'
			else
				this.selectedGroupBy = this.$route.query.groupby

			if(this.$route.query.order === undefined)
				this.selectedOrder = 'asc'
			else
				this.selectedOrder = this.$route.query.order
		},

		closeDialog(){
			this.restartData();
			this.$router.back();
		}
	}
}
</script>

<style lang="scss">

</style>