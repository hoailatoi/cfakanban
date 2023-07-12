const path = require('path');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = {
    mode: 'development',
    entry: {
        main: './app/main/main.ts',
        preload: './app/main/preload.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'electron-main',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        // Copy file index.html từ thư mục gốc vào thư mục dist
        new CopyWebpackPlugin({
            patterns: [
                { from: './app/renderer/dist', to: path.join(__dirname, 'dist') }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                },
            },
        ],
    },
};

const mainConfig = merge(commonConfig, {
    name: 'main',
    entry: {
        main: './app/main/main.ts',
    },
    target: 'electron-main',
});

const preloadConfig = merge(commonConfig, {
    name: 'preload',
    entry: {
        preload: './app/main/preload.ts',
    },
    target: 'electron-preload',
});

module.exports = [mainConfig, preloadConfig];