const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {DefinePlugin} = require('webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            background: './src/background/index.ts',
            content: './src/content/index.tsx',
            popup: './src/popup/index.tsx',
            options: './src/options/index.tsx'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    // 如果不设置为false，那么在使用css模块化的时候只能采用 import { button, text } from './styles.module.css';
                                    namedExport: false,
                                    localIdentName: isProduction
                                        ? '[hash:base64:8]'            // 生产环境：短哈希，如 a1b2c3d4
                                        : '[path][name]__[local]--[hash:base64:5]', // 开发环境：可读性强，如 src/popup/index__title--3j4k5
                                },
                                sourceMap: !isProduction,
                            },
                        },
                        'less-loader',
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource'
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@components': path.resolve(__dirname, 'src/components'),
                '@utils': path.resolve(__dirname, 'src/utils')
            }
        },
        plugins: [
            // 添加环境变量标记到项目中
            new DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(argv.mode),
                'process.env.WS_SERVER_URL': JSON.stringify('ws://localhost:8080'),
            }),

            // 开发模式下添加热更新插件
            ...(isProduction ? [] : [
                {
                    apply(compiler) {
                        compiler.hooks.afterEmit.tap('ExtensionHotReloader', () => {
                            // 生成标记文件触发更新
                            require('fs').writeFileSync(
                                path.join(__dirname, 'dist', 'ws-server'),
                                Date.now().toString()
                            );
                        });
                    }
                }
            ]),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static', // 生成静态HTML报告
                reportFilename: 'bundle-report.html',
                openAnalyzer: false,   // 不自动打开浏览器
                generateStatsFile: false, // 生成stats.json
                statsFilename: 'stats.json'
            }),
            new HtmlWebpackPlugin({
                template: './src/popup/index.html',
                filename: 'popup.html',
                chunks: ['popup']
            }),
            new HtmlWebpackPlugin({
                template: './src/options/index.html',
                filename: 'options.html',
                chunks: ['options']
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'public/manifest.json',
                        to: path.resolve(__dirname, 'dist'),
                        toType: 'dir'
                    },
                    // 添加开发用的热更新脚本
                    ...(isProduction ? [] : [{
                        from: path.resolve(__dirname, 'scripts/ws-server.js'),
                        to: path.resolve(__dirname, 'dist')
                    }])
                ]
            }),
        ],
        devtool: isProduction ? false : 'source-map',
        optimization: {
            minimize: isProduction
        }
    };
};