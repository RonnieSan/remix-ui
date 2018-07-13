// ----------------------------------------------------------------------
// WEBPACK CONFIG
// ----------------------------------------------------------------------

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode : 'production',
	entry : './src/index.js',
	output : {
		filename : 'index.js',
		path : path.resolve(__dirname, 'dist'),
		publicPath : '/'
	},
	resolve : {
		extensions : ['.js', '.json', '.vue'],
		alias : {
			'vue$' : path.resolve(__dirname, 'node_modules/vue/dist/vue.min.js'),
			'@' : path.resolve(__dirname, 'src'),
			'theme' : path.resolve(__dirname, 'node_modules/remix-css-theme-default'),
			'remix-ui-styles' : path.resolve(__dirname, 'src/styles')
		}
	},
	externals : {
		vue : 'vue',
		moment : 'moment'
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				loader : 'babel-loader',
				exclude : file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
				include : [
					path.resolve(__dirname, 'src')
				]
			},
			{
				test : /\.css$/,
				loader : [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test : /\.less$/,
				loader : [
					'vue-style-loader',
					{
						loader : 'css-loader',
						options : {
							sourceMap : true
						}
					},
					{
						loader : 'postcss-loader',
						options : {
							sourceMap : true
						}
					},
					{
						loader : 'less-loader',
						options : {
							sourceMap : true
						}
					}
				]
			},
			{
				test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: '[name].[hash:7].[ext]'
				}
			}
		]
	},
	plugins : [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(['dist']),
		new webpack.NamedModulesPlugin(),
		new BundleAnalyzerPlugin({
			analyzermode : 'static',
			openAnalyzer : false
		})
	]
};