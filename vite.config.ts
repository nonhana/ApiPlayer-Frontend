import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		eslintPlugin({
			include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
		}),
	],
	resolve: {
		// 配置路径别名
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	server: {
		port: 30000,
		host: '0.0.0.0',
	},
});
