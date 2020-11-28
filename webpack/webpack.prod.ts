import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [new webpack.optimize.SplitChunksPlugin()],
});
