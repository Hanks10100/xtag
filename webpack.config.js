var webpack = require('webpack');

module.exports = {
    output: {
        filename: 'xtag.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js']
    }
};
