const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const context = resolve(__dirname, '..');

/** @type {import('webpack').Configuration} */
module.exports = {
	context,
	entry: join(context, 'src/app/index.jsx'),
	output: {
		filename: '[name].[contenthash].js',
		path: join(context, 'build'),
		chunkFilename: '[name].[contenthash].chunk.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					presets: ['@babel/env', '@babel/react'],
					plugins: [['@babel/transform-runtime', { regenerator: true }]],
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({ template: join(context, 'public/index.html') }),
		new CopyWebpackPlugin({ patterns: [{ from: 'public/' }] }),
		new CleanWebpackPlugin(),
	],
};
