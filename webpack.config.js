const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    mode: 'production',
    entry: {
        sagiri: './src/sagiri.less'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'string-replace-loader',
                        options: {
                            search: '../tt-rss',
                            replace: '..',
                            flags: 'g'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            import: (parsedImport) => {
                                return parsedImport.url.includes('css');
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({}),
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new WebpackShellPlugin({
            onBuildEnd: ['rm dist/sagiri.js']
        })
    ]
}