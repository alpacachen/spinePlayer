const path = require('path');
module.exports = {
    entry: {
        SpinePlayer3_7: './src/spinePlayer3.7.js',
        SpinePlayer3_8: './src/spinePlayer3.8.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: '[name]',
        libraryExport: 'default',
        umdNamedDefine: true,
    },
    devServer: {
        host:"0.0.0.0",
        contentBase: path.join(__dirname, 'dev'),
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    // {
                    //     loader: 'eslint-loader',
                    // },
                ],
            },
        ],
    },
};
