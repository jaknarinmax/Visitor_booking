import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/app.css';
import BackToTop from 'vue-backtotop';
import { createVuetify } from 'vuetify'; // Import createVuetify from Vuetify package
import 'vuetify/dist/vuetify.min.css';
import 'vuetify/styles'; // Ensure you're importing Vuetify styles
import i18n from './i18n';

const vuetify = createVuetify(); // Create Vuetify instance

const app = createApp(App)
  .use(router)
  .use(BackToTop)
  .use(vuetify) // Use Vuetify plugin
  .use(i18n) // Use Vue I18n plugin

app.mount('#app');

const appTheme = localStorage.getItem('theme');

if (
  appTheme === 'dark' &&
  document.querySelector('body').classList.contains('app-theme')
) {
  document.querySelector('body').classList.add('bg-primary-dark');
} else {
  document.querySelector('body').classList.add('bg-secondary-light');
}
