import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import { createPinia } from 'pinia';
import '../public/global.css'; // 全局样式
import App from './App.vue';
import JsonSchemaEditor from 'json-schema-editor-vue3';
import 'json-schema-editor-vue3/lib/json-schema-editor-vue3.css';

const app = createApp(App);
const store = createPinia();

app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(JsonSchemaEditor);

app.mount('#app');
