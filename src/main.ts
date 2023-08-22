import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import { createPinia } from 'pinia';
// import piniaPluginPersist from 'pinia-plugin-persist';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import JsonSchemaEditor from 'json-schema-editor-vue3';
import 'json-schema-editor-vue3/lib/json-schema-editor-vue3.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);
const store = createPinia();
store.use(piniaPluginPersistedstate);

app.use(ElementPlus, { locale: zhCn });
app.use(router);
app.use(store);
app.use(JsonSchemaEditor);
store.use(piniaPluginPersistedstate);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.mount('#app');
