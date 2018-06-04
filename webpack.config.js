require("babel-polyfill");
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, "src"),
	entry: {
		common: ["./scss/common.scss", "babel-polyfill", "./js/common"]
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: `js/pages/[name]/[name].js`
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			vue$: "vue/dist/vue.common.js"
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components|.min.js)/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.vue$/,
				use: {
					loader: "vue-loader",
					options: {
						postcss: [
							require("autoprefixer")({
								remove: false,
								browsers: ["last 50 versions"]
							})
						]
					}
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: "css-loader",
							options: {minimize: true}
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: [
									require("autoprefixer")({
										browsers: ["ie >= 10", "last 50 version"]
									})
								],
								sourceMap: true
							}
						},
						{
							loader: "sass-loader"
						}
					],
					// use style-loader in development
					fallback: "style-loader"
				})
			},
			{
				test: /\.(woff|woff2|eot|ttf)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 10,
						name: `[path][name].[ext]`
					}
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 8192,
						name: `[path][name].[ext]`
					}
				}
			},
			{
				test: /\.svg$/,
				loader: 'vue-svg-loader',
				options: {
					svgo: {
						plugins: [
							{removeDoctype: true},
							{removeComments: true}
						]
					}
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};
