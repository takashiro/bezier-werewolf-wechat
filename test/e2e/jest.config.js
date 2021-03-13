module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	globals: {
		'ts-jest': {
			tsconfig: `${__dirname}/tsconfig.json`,
		},
	},
};
