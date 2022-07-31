import { resolve } from 'path';
import { merge } from 'webpack-merge';
import { HotModuleReplacementPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import commonConfig from './webpack.common';
import { PROJECT_ROOT } from '../utils/constants';

const devConfig = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                memoryLimit: 1024,
                configFile: resolve(PROJECT_ROOT, './src/tsconfig.json'),
            },
        }),
        new HotModuleReplacementPlugin(),
    ],
});

export default devConfig;