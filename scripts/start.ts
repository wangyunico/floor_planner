import chalk from 'chalk';
import express from 'express';
import webpack from 'webpack';

import devConfig from './configs/webpack.dev';
import { HOST, DEFAULT_PORT} from './utils/constants';
import setupMiddlewares from './middlewares';

async function start() {
    const PORT = DEFAULT_PORT;
    const address = `http://${HOST}:${PORT}`;
    // ENABLE_OPEN 参数值可能是 true 或者是一个指定的 URL
    // if (ENABLE_OPEN) {
    //     let openAddress = ENABLE_OPEN as string;
    //     if (ENABLE_OPEN === true) {
    //         openAddress = address;
    //         let publicPath = devConfig.output?.publicPath;
    //         // 未设置和空串都视为根路径
    //         publicPath = publicPath == null || publicPath === '' ? '/' : publicPath;
    //         if (publicPath !== '/') {
    //             // 要注意处理没有带 '/' 前缀和后缀的情况
    //             openAddress = `${address}${publicPath.startsWith('/') ? '' : '/'}${publicPath}${
    //                 publicPath.endsWith('/') ? '' : '/'
    //             }index.html`;
    //         }
    //     }
    //     devConfig.plugins!.push(new WebpackOpenBrowser({ url: openAddress }));
    // }

    const devServer = express();
    // 加载 webpack 配置，获取 compiler
    const compiler = webpack(devConfig);
    setupMiddlewares(devServer, compiler);

    const httpServer = devServer.listen(PORT, HOST, () => {
        console.log(
             `DevServer is running at ${chalk.magenta.underline(address)} ${chalk.green('✔')}`,

        );
    });

    ['SIGINT', 'SIGTERM'].forEach((signal: any) => {
        process.on(signal, () => {
            httpServer.close();
            console.log(
                chalk.greenBright.bold(`\n${Math.random() > 0.5 ? 'See you again' : 'Goodbye'}!`),
            );
            process.exit();
        });
    });
}


if (require.main === module) {
    start();
}