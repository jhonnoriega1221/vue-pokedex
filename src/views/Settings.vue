<template>
	<div>
		<h1>Ajustes</h1>
		<v-list
		color="background"
		>
			<v-list
			:width="this.$vuetify.breakpoint.mobile ? '' : '200'"
			color="background"
			>
				<label>Tema</label>
				<v-select
				@change="changeTheme()"
				outlined
				dense
				:items="themes"
				v-model="themeSelected"
				item-text="name"
				item-value="value"
				>
					
				</v-select>

				<label>Idioma</label>
				<v-select
				outlined
				dense
				:items="languages"
				v-model="languageSelected"
				item-text="name"
				item-value="value"
				>
					
				</v-select>

			</v-list>
		</v-list>
	</div>
</template>

<script>
export default {
	data: () => {
        return {
            themes: [{name: 'Claro', value:'light'},
            		{name: 'Oscuro', value:'dark'}
            ],
            languages: [{name: 'Español', value: 'es'}],
            themeSelected: 'light',
            languageSelected: 'es'
        }
    },
    mounted () {
    	if(this.$vuetify.theme.dark)
    		this.themeSelected = "dark"
    	else
    		this.themeSelected = "light"
    },
    methods: {
    	changeTheme(){
    		if(this.themeSelected == 'dark'){
    			this.$vuetify.theme.dark = true
    			localStorage.setItem('dark', true);
    		} else {
    			this.$vuetify.theme.dark = false	
    			localStorage.setItem('dark', false);
    		}

    	}
    }
}
</script>

<style lang="scss">

</style>