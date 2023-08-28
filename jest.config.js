export default {
	preset: 'ts-jest',
	roots: ['<rootDir>/tests/'],
	clearMocks: true,
	moduleDirectories: ['node_modules', 'src'],
	moduleFileExtensions: ['js', 'ts', 'vue', 'tsx', 'jsx', 'json', 'node'],
	modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
	testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)', '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$'],
	testPathIgnorePatterns: ['<rootDir>/tests/server/', '<rootDir>/tests/__mocks__/', '/node_modules/'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
		'^.+\\.vue$': '@vue/vue3-jest', // 使用 vue-jest 帮助测试 .vue 文件
		'^.+\\.(js|jsx)?$': 'babel-jest', // 遇到 js jsx 等转成 es5
		'.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub', // 遇到 css 等转为字符串 不作测试
	},
	transformIgnorePatterns: ['<rootDir>/tests/__mocks__/', '/node_modules/'],
	// A map from regular expressions to module names that allow to stub out resources with a single module
	moduleNameMapper: {
		'\\.(vs|fs|vert|frag|glsl|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/tests/__mocks__/fileMock.ts',
		'\\.(sass|s?css|less)$': '<rootDir>/tests/__mocks__/styleMock.ts',
		'\\?worker$': '<rootDir>/tests/__mocks__/workerMock.ts',
		'^/@/(.*)$': '<rootDir>/src/$1',
	},
	testEnvironment: 'jest-environment-jsdom',
	testEnvironmentOptions: {
		customExportConditions: ['node', 'node-addons'],
	},
	verbose: true,
	collectCoverage: false,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{js,ts,vue}'],
	coveragePathIgnorePatterns: ['^.+\\.d\\.ts$'],
};
