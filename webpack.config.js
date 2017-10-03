'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
	entry: {
		'textInput': path.resolve(__dirname, 'src/components/textInput.tsx')
	},
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: '[name].js',
		libraryTarget: "commonjs2"
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			'timcowebapps-scss-dir': path.resolve(__dirname, 'node_modules', 'timcowebapps-scss')
		}
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.ts[x]?$/,
				loaders: ["ts-loader"]
			}, {
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {
								modules: true,
								localIdentName: '[name]-[hash:base64:5]',
								discardComments: { removeAll: true },
								minimize: true
							}
						},
						"sass-loader"
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({ filename: '[name].css' }),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true,
			include: /\.min\.js$/,
		})
	]
}

var compiler = webpack(config);
compiler.run(function (err, stats) {
});