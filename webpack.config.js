const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");
const { readFileSync } = require("fs");


const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const pages = JSON.parse(readFileSync("pages.json", "utf-8"));

module.exports = () => {
    const isProduction = process.env.NODE_ENV === "production";
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isProduction === isDevelopment) {
        throw Error('Set node environment to "production" or "development"');
    }

    const env = dotenv.config().parsed;
    
    const envKeys = env ? Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {}) : {};

    return {
        devtool: isDevelopment && "inline-cheap-module-source-map",
        entry: pages.reduce((config, page) => {
            config[page] = `./src/${page}/index.tsx`;
            return config;
        }, {}),
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "assets/js/[name].[contenthash:8].js",
            assetModuleFilename: "static/media/[name].[contenthash:8].[ext]",
            publicPath: "/",
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            envName: isProduction ? "production" : "development",
                        }
                    },
                },
                {
                    test: /\.module\.(sa|sc|c)ss$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: (isProduction) ? "[contenthash:8]" : "[local]",
                                },
                                importLoaders: 3,
                            },
                        },
                        "resolve-url-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /(?<!\.module)\.(sa|sc|c)ss$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 3,
                            }
                        },
                        "resolve-url-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.svg$/i,
                    type: "asset/inline",
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/i,
                    type: "asset/resource",
                },
            ],
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            alias: {
                "@components": path.resolve(__dirname, "src/common/components"),
                "@utils": path.resolve(__dirname, "src/common/utils"),
            }
        },
        plugins: [
            isProduction &&
                new MiniCssExtractPlugin({
                    filename: "assets/css/[name].[contenthash:8].css",
                    chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
                }),
            new ForkTsCheckerWebpackPlugin({
                async: false,
            }),
            new webpack.DefinePlugin(envKeys),
        ].concat(
            pages.map(
                (page) => new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, `./src/${page}/index.html`),
                    filename: `${page}.html`,
                    chunks: [`${page}`],
                    inject: true,
                })
            )
        ).filter(Boolean),
        optimization: {
            minimize: isProduction,
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: {
                        compress: {
                            comparisons: false,
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ascii_only: true,
                        },
                        warnings: false,
                    },
                    extractComments: false
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: "all",
                minSize: 0,
                maxInitialRequests: 20,
                maxAsyncRequests: 20,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module, chunks, cacheGroupKey) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            )[1];
                            return `${cacheGroupKey}.${packageName.replace("@", "")}`;
                        },
                    },
                    common: {
                        minChunks: 2,
                        priority: -10,
                    },
                },
            },
            runtimeChunk: "single",
        },
        devServer: {
            compress: true,
            historyApiFallback: true,
            client: {
                overlay: {
                    errors: false,
                    warnings: false,
                },
            },
        },
    };
}