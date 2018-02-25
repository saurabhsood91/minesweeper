var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        // using the script-loader module here
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery' //so that foundation can attach it's method
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery', //Whenever we encounter $, replace with 'jquery' module,
            'jQuery': 'jquery'
        })
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        alias: {
            // Put aliases for components here
            applicationStyles: 'app/styles/app.scss'
        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
    },
    devtool: 'cheap-module-eval-source-map'
};
