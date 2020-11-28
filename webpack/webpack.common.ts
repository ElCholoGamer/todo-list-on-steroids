import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join, resolve } from 'path';
import webpack from 'webpack';

const context = resolve(__dirname, '../');

const config: webpack.Configuration = {
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
							configFile: resolve(
								__dirname,
								'../tsconfig/tsconfig.webpack.json'
							),
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(gif|png|jpe?g|svg|ico|mp4)$/i,
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

export default config;
