const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const context = resolve(__dirname, '..');

/** @type {import('webpack').Configuration} */
module.exports = {
	context,
	entry: join(context, 'src/app/index.tsx'),
	devtool: 'eval-source-map',
	output: {
		filename: 'js/[name].[contenthash].js',
		path: join(context, 'build'),
		chunkFilename: 'js/[name].[contenthash].chunk.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ['@babel/env', '@babel/react', '@babel/typescript'],
							plugins: [['@babel/transform-runtime', { regenerator: true }]],
						},
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							configFile: resolve(context, 'tsconfig/tsconfig.webpack.json'),
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.gif$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
		new HtmlWebpackPlugin({ template: join(context, 'public/index.html') }),
		new CopyWebpackPlugin({ patterns: [{ from: 'public/' }] }),
		new CleanWebpackPlugin(),
		new ForkTsCheckerPlugin({ async: false }),
	],
};
