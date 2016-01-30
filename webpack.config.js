var webpack = require('webpack');

module.exports = {
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
    resolve: {
        extensions: ['', '.js']
    }
};
