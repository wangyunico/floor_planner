import { Compiler } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import devConfig from '../configs/webpack.dev';
import { HMR_PATH } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function webpackMiddleware(compiler: Compiler) {
    const publicPath = devConfig.output!.publicPath!;

     
    const devMiddlewareOptions: webpackDevMiddleware.Options<any,any> = {
        publicPath,
        stats: 'minimal',
    };

    const hotMiddlewareOptions: webpackHotMiddleware.MiddlewareOptions = {
        path: HMR_PATH,
    };

    return [
        webpackDevMiddleware(compiler, devMiddlewareOptions),
        webpackHotMiddleware(compiler, hotMiddlewareOptions),
    ];
}