module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	rootDir: 'src/',
	globalSetup: '../node_modules/@shelf/jest-dynamodb/lib/setup.js',
	globalTeardown: '../node_modules/@shelf/jest-dynamodb/lib/teardown.js'
};
