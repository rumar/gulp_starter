var path = require('path');
var webpack = require('webpack');
var Config = require('./webpack.config.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

Config.devtool = 'cheap-module-source-map';

function addPlugins(env) {
	Config.plugins = (Config.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"development"',
			}
		}),
		new ExtractTextPlugin({
			disable: true
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, './_index.html')
		})
	]);
}

Config.watch = true;

Config.devtool = 'cheap-eval-source-map';

Config.devServer = {
	contentBase: __dirname,
	publicPath: "/",
	hot: true,
	open: true
};

module.exports = function (env) {
	env = env || {};
	addPlugins(env);
	return Config;
};