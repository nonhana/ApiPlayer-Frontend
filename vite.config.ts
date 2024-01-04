import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, __dirname);
	return {
		plugins: [
			vue(),
			AutoImport({
				resolvers: [
					ElementPlusResolver(),
					IconsResolver({
						prefix: 'Icon',
					}),
				],
				dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
			}),
			Components({
				resolvers: [
					ElementPlusResolver(),
					IconsResolver({
						enabledCollections: ['ep'],
					}),
				],
				dts: path.resolve(pathSrc, 'components.d.ts'),
			}),
			Icons({
				autoInstall: true,
			}),
		],
		resolve: {
			// 配置路径别名
			alias: {
				'@': resolve(__dirname, './src'),
			},
		},
		server: {
			port: env.VITE_PORT as unknown as number,
			host: '0.0.0.0',
		},
	};
});
