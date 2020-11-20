const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
	entry: './src/app.ts',
	output: {
		filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
	},
  // devtool: 'none',
  // per file level
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
  },
  // added for prod: global level
  plugins: [
    // with this, webpack will clean up the dist folder every time before writing something there
    new CleanPlugin.CleanWebpackPlugin()

  ]
}
