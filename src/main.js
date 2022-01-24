import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

// axios.defaults.baseURL = 'http://localhost:3000/cats';

app.mount('#app');
