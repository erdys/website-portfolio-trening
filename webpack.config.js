const path = require("path");
const dotenv = require("dotenv-webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["./src/main.js", "./src/scss/main.scss"],
    output: {
        filename: "js/scripts.js",
        path: path.resolve(process.cwd(), "./public")
    },
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },

    resolve: {
        extensions: ["*", ".js"]
    },

    plugins: [
        new ESLintPlugin(),
        new dotenv({
            path: "./.env"
        }),
        new MiniCssExtractPlugin({
            filename: "css/styles.css"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(process.cwd(), "index.html")
        })
    ],

    devServer: {
        static: {
            directory: path.resolve(process.cwd(), "public")
        },
        watchFiles: [path.resolve(process.cwd(), "index.html")],
        compress: true,
        port: 9090,
        hot: true
    },

    performance: {
        hints: false
    }
};
