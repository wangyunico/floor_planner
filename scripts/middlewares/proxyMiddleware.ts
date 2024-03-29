import { Express } from 'express';
import chalk from 'chalk';
import { createProxyMiddleware } from 'http-proxy-middleware';


function link(str: string): string {
    return chalk.magenta.underline(str);
}

export default function proxyMiddleware(server: Express): void {
    // Object.entries(proxyTable).forEach(([path, options]) => {
    //     const from = path;
    //     const to = options.target as string;
    //     console.log(`proxy ${link(from)} ${chalk.green('->')} ${link(to)}`);

    //     if (!options.logLevel) options.logLevel = 'warn';
    //     server.use(path, createProxyMiddleware(options));
    // });
    process.stdout.write('\n');
}