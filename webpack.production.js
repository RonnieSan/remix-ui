// ----------------------------------------------------------------------
// WEBPACK CONFIG
// ----------------------------------------------------------------------

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode : 'production',
	entry : './src/index.js',
	output : {
		filename : 'index.js',
		path : path.resolve(__dirname, 'dist'),
		publicPath : '/',
		library : 'RemixUI',
		libraryTarget : 'umd'
	},
    target : 'web',
	resolve : {
		extensions : ['.js', '.json', '.vue'],
		alias : {
			'vue$' : path.resolve(__dirname, 'node_modules/vue/dist/vue.min.js'),
			'@' : path.resolve(__dirname, 'src')
		}
	},
	externals : {
		'vue' : 'vue',
		'moment-timezone' : 'moment',
		'brace' : 'brace'
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
			}
		]
	},
	plugins : [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(['dist']),
		new LodashModuleReplacementPlugin,
		new webpack.NamedModulesPlugin(),
		new BundleAnalyzerPlugin({
			analyzermode : 'static',
			openAnalyzer : true
		})
	]
};