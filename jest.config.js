module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			tsconfig: 'test/tsconfig.json',
		},
	},
	testMatch: [
		'**/test/**/*.spec.ts',
	],
	testPathIgnorePatterns: process.env.CI === 'true' ? ['/e2e/'] : [],
};
