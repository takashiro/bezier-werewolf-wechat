module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			tsconfig: `${__dirname}/tsconfig.json`,
		},
	},
	testTimeout: process.env.CI ? 30000 : 5000,
};
