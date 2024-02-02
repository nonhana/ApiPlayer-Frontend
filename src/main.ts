import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

/* ----------Element组件库相关---------- */
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

/* ----------JsonSchemaEditor相关---------- */
import JsonSchemaEditor from 'json-schema-editor-vue3';
import 'json-schema-editor-vue3/lib/json-schema-editor-vue3.css';

/* ----------Pinia相关---------- */
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn }).use(router).use(store).use(JsonSchemaEditor);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.mount('#app');
