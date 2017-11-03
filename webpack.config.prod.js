const path = require("path");
const webpack = require("webpack");
const Config = require("./webpack.config.js");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

Config.output.publicPath = "/assets"
// Config.output.path = path.resolve(__dirname, "assets");
Config.devtool = "cheap-module-source-map";
Config.plugins = (Config.plugins || []).concat([
	new webpack.DefinePlugin({
		"process.env": {
			NODE_ENV: '"production"'
		}
	}),
	new UglifyJsPlugin(),
	new ExtractTextPlugin({
		filename: "css/[name].css"
	}),
	// new CopyWebpackPlugin([
	// 	{
	// 		from: path.resolve(__dirname, "./assets/"),
	// 		to: path.resolve(__dirname, "../app/assets/")
	// 	}
	// ]),
	new HtmlWebpackPlugin({
		// Also generate a test.html
		filename: path.resolve(__dirname, "./dist/index.html"),
		template: path.resolve(__dirname, './_index.html')
	})
]);

module.exports = Config;
