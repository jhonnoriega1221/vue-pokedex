import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false, 
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#dc0a2d',
        secondary: '#1f1f1f',
        accent: '#00ABC7',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',

        appbar: '#fff',
        background: '#f9f9f9',
        grass: '#49d0b0',
        fire: '#fb6c6c',
        water: '#76bdfe',
        bug: '#A8B820',
        normal: '#A8A878',
        poison: '#A040A0',
        electric: '#ffce4b',
        ground: '#E0C068',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        ghost: '#705898',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        flying: '#A890F0'
      },
      dark: {
        primary: '#00ABC7',
        secondary: '#00ABC7',
        accent: '#00ABC7',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',

        appbar: '#363636',
        background: '#424242',
        grass: '#49d0b0',
        fire: '#fb6c6c',
        water: '#76bdfe',
        bug: '#A8B820',
        normal: '#A8A878',
        poison: '#A040A0',
        electric: '#ffce4b',
        ground: '#E0C068',
        fairy: '#EE99AC',
        fighting: '#C03028',
        psychic: '#F85888',
        rock: '#B8A038',
        ghost: '#705898',
        ice: '#98D8D8',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        flying: '#A890F0'
      }
    },
  },
  lang: {
    locales: { es },
    current: 'es',
  },
  icons: {
    iconfont: 'md',
  },
});
