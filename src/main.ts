import { createApp } from 'vue';

// Styles
import '@/assets/css/style.css';

// Components
import App from '@/App.vue';

// Core
import { createPinia } from 'pinia';
import i18n from '@/includes/i18n';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);

app.mount('#app');
