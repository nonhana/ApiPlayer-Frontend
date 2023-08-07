import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import { createPinia } from 'pinia';
import '../public/global.css'; // 全局样式
import App from './App.vue';

const app = createApp(App);
const store = createPinia();

app.use(ElementPlus);
app.use(router);
app.use(store);

app.mount('#app');
