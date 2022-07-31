import { resolve } from "path";
import { Configuration } from "webpack";
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackBar from 'webpackbar';
const FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin');
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { loader as MiniCssExtractLoader } from 'mini-css-extract-plugin';


import { __DEV__,  PROJECT_NAME, PROJECT_ROOT, HMR_PATH } from "../utils/constants";

function getCssLoaders(importLoaders: number) {
    return [
        __DEV__ ? 'style-loader' : MiniCssExtractLoader,
        {
            loader: 'css-loader',
            options: {
                modules: false,
                sourceMap: true,
                importLoaders,
            },
        },
        {
            loader: 'postcss-loader',
            options: { sourceMap: true },
        },
    ];
}


const commonConfig: Configuration = {
    cache: true,
    context: PROJECT_ROOT,
    entry: [resolve(PROJECT_ROOT,'./src/index.tsx')],
    output: {
        publicPath: '/',
        path: resolve(PROJECT_ROOT,'./dist'),
        filename: 'js/[name]-[hash].bundle.js',
        hashSalt: PROJECT_NAME
    },
    resolve:{
        extensions: ['.js','.tsx','.ts','.json']
    },
    plugins: [
        new WebpackBar({
            name:'floor-design',
            color: '#61dafb',
        }),
         new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['You application is running here http://localhost:3000'],
                notes: ['Floor Planner 编译成功']
              },
         }   
         ),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                 from: '*',
                 context: resolve(PROJECT_ROOT, './public'),
                 to: resolve(PROJECT_ROOT,'./dist'),
                 toType: 'dir',
                 globOptions: {
                    ignore: ['index.html']
                 },
                },
            ],
        }),
        new HtmlWebpackPlugin()
    ],
    module: {
        rules:[  
            {
                test: /\.(j|t)sx?$/,
                use: 'babel-loader',
                // options: { cacheDirectory: true },
                exclude:/node_modules/,
            },
            {
                test: /\.css$/,
                use: getCssLoaders(0),
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg|tga|glb|babylon|mtl|pcb|pcd|prwm|obj|mat|mp3|ogg)$/i,
                use: 'file-loader',
                exclude: resolve(PROJECT_ROOT, './node_modules/')
              } 
        ]
    }
};

if (__DEV__) {
    (commonConfig.entry as string[]).unshift(
        `webpack-hot-middleware/client?path=${HMR_PATH}&reload=true&overlay=true`,
    );
}

export default commonConfig