const Dotenv = require('dotenv-webpack');

module.exports = {
	// Your webpack configuration options
	plugins: [
		new Dotenv({
			path: './.env', // Path to your .env file
			safe: true, // If true, load .env.example (defaults to "false")
			systemvars: true, // Load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // Hide any errors
		}),
		// Other plugins...
	],
	// Other webpack configuration...
};

