const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { resolve } = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		hot: true,
		historyApiFallback: true,
		port: 3000,
		open: true,
		contentBase: resolve(__dirname, '../build'),
		proxy: {
			'/': {
				target: 'http://localhost:8080',
				bypass: req =>
					req.method === 'GET' &&
					req.headers.accept?.indexOf('text/html') !== -1
						? false // Skip proxy
						: null, // Continue with proxy
			},
		},
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});
