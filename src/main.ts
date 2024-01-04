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

/* ----------事件总线相关---------- */
import mitt from 'mitt'; // mitt是一个小巧的事件总线库，只有200多行代码，支持事件的订阅、发布、移除等操作

const store = createPinia();
store.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn }).use(router).use(store).use(JsonSchemaEditor);

const bus = mitt();
app.config.globalProperties.$bus = bus;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.mount('#app');
