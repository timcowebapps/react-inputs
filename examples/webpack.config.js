'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'bundle': path.resolve(__dirname, 'index.tsx')
	},
	output: {
		path: path.resolve(__dirname, '../docs'),
		filename: '[name].js?[hash]'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			'timcowebapps-scss-dir': path.resolve(__dirname, '..', 'node_modules', 'timcowebapps-scss')
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
		}),
		new HtmlWebpackPlugin({
			filename: '../docs/index.html',
			template: 'index.html'
		})
	],
	devServer: {
		noInfo: false,
		lazy: false,
		watchOptions: {
			poll: true,
			ignored: /node_modules/
		}
	}
}
