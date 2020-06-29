// ----------------------------------------------------------------------
// WEBPACK CONFIG
// ----------------------------------------------------------------------

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	devtool : 'source-map',
	mode : 'development',
	entry : './src/preview.js',
	output : {
		filename : '[name].js',
		path : path.resolve(__dirname, 'dist'),
		publicPath : '/'
	},
	resolve : {
		extensions : ['.js', '.json', '.vue'],
		alias : {
			'vue$' : path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
			'@' : path.resolve(__dirname, 'src'),
			'theme' : path.resolve(__dirname, 'node_modules/remix-css-theme-default'),
			'remix-ui-styles' : path.resolve(__dirname, 'src/styles')
		}
	},
	devServer : {
		contentBase : './dist',
		hot : true,
		port : 3010
	},
	module : {
		rules : [
			{
				test : /\.js$/,
				use : {
					loader : 'babel-loader',
					options : {
						presets : [
							[
								'@babel/preset-env',
								{
									targets : {
										chrome : '52',
										ie : '11',
										safari : '7'
									}, 
									useBuiltIns : 'usage',
									corejs : 3
								}
							]
						]
					}
				},
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
				loader : 'url-loader',
				options : {
					limit : 10000,
					name : '[name].[hash:7].[ext]',
					outputPath : 'assets/img/'
				}
			},
			{
				test : /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader : 'file-loader',
				options: {
					limit : 10000,
					name : '[name].[hash:7].[ext]',
					outputPath : 'assets/fonts/'
				}
			}
		]
	},
	plugins : [
		new VueLoaderPlugin(),
		new HTMLWebpackPlugin({
			template : './src/preview.html'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new BundleAnalyzerPlugin({
			analyzermode : 'static',
			openAnalyzer : false
		})
	]
};
