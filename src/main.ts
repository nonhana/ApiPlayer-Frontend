import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import { createPinia } from 'pinia';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import JsonSchemaEditor from 'json-schema-editor-vue3';
import 'json-schema-editor-vue3/lib/json-schema-editor-vue3.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import mitt from 'mitt';

const app = createApp(App);
const store = createPinia();

app.use(ElementPlus, { locale: zhCn }).use(router).use(store).use(JsonSchemaEditor);
store.use(piniaPluginPersistedstate);

const bus = mitt();
app.config.globalProperties.$bus = bus;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.mount('#app');
