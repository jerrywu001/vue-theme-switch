const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'production', // development
    entry: {
        default: './src/themes/default/index.js',
        dark: './src/themes/dark/index.js',
    },
    output: {
        path: path.join(__dirname, 'static/themes'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'static/images/[name].[hash:7].[ext]',
                },
            },
            { // 字体
                test: /\.((ttf|eot|woff|svg)(\?t=[0-9]\.[0-9]\.[0-9]))|(ttf|eot|woff|svg)\??.*$/,
                loader: 'url-loader',
                options: {
                    name: 'static/font/[name].[ext]',
                },
            },
        ],
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin({})],
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true,
        }),
    ],
};
