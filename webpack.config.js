const path = require('path')

module.exports = {
	entry: './project/drag-and-drop-proj/src/app.ts',
	output: {
		filename: 'bundle.js',
    // webpack wants absolute path (had to tweak the string path 
    //cause I wanted to put webpack separate from the root project folder 
    // -- fit all project in one repo, yeah)
		path: path.resolve(__dirname, '/project/drag-and-drop-proj/dist')
	},
	// tell webpack there will be source files included and to wire them up
	// to the bundle it generates
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				// help webpack look for files
				test: /\.ts$/,
				// tell webpack what to do with those files
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	}
}
