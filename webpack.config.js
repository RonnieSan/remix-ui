// ----------------------------------------------------------------------
// WEBPACK CONFIG
// ----------------------------------------------------------------------

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const webpack = require('webpack');

const dev = (process.env.NODE_ENV !== 'production');

module.exports = {
	mode : process.env.NODE_ENV || 'development',
	entry : './src/preview.js',
	output : {
		filename : '[name].js',
		path : path.resolve(__dirname, 'dist'),
		publicPath : '/'
	},
	resolve : {
		extensions : ['.js', '.json', '.vue'],
		alias : {
			'vue$' : path.resolve(__dirname, 'node_modules/vue/dist/vue.min.js'),
			'@' : path.resolve(__dirname, 'src'),
			'theme' : path.resolve(__dirname, 'src/theme.less'),
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
				loader : 'babel-loader',
				exclude : file => (/node_modules/.test(file) && !/\.vue\.js/.test(file)),
				include : [
					path.resolve(__dirname, 'src')
				]
			},
			{
				test : /\.css$/,
				loader : [
					(dev ? 'style-loader' : MiniCSSExtractPlugin.loader),
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
					(dev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader),
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
					name: '/assets/img/[name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: '/assets/fonts/[name].[hash:7].[ext]',
					outputPath : 'fonts/'
				}
			}
		]
	},
	plugins : [
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(['dist']),
		new HTMLWebpackPlugin({
			template : './src/preview.html'
		}),
		new MiniCSSExtractPlugin({
			filename : (dev ? '[name][contenthash].css' : '[name].css')
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
};