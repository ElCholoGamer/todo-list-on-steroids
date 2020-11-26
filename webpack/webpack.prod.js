const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [new webpack.optimize.SplitChunksPlugin()],
});
