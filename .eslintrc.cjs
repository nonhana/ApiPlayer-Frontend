module.exports = {
	root: true, // root为true，ESLint停止在父级目录中查找配置文件
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }], //变量声明未使用
		'@typescript-eslint/no-explicit-any': 'off', // 允许ts使用any
		'vue/multi-word-component-names': [
			'warn',
			{
				ignores: ['index', 'dialog'], //需要忽略的组件名
			},
		],
		eqeqeq: ['error', 'always'],
	},
};
