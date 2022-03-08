const HtmlWebpack = require("html-webpack-plugin"),
    miniCssExtract = require("mini-css-extract-plugin");
const { loader } = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        js: "./src/index.js",
        /*
        react: "./src/index_react.js",
        ts: "./src/index_ts.js",
        */
    },
    output: {
        filename: "[name].[chunkhash].js"
    },
    module: {
        rules:[
            {
                test: /\.jsx?$/i,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                use:[
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                            
                        }
                    }
                ]
            },
            {
                test:/\.css$/i,
                /*use:[ miniCssExtract.loader, "css-loader"]*/
                use:[
                    {
                        loader: miniCssExtract.loader,
                        options:{
                            publicPath: "./"
                        },
                    },
                    "css-loader",
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                test:/\.(jpe?g|png|gif|svg|webp)$/i,
                use: ["file-loader?name=assets/img/[name].[ext]", "image-webpack-loader"],
            },
            {
                test:/\.(woff)$/i,
                use: ["file-loader?name=assets/[name].[ext]"],
            },
        ],
    },
    plugins: [
        new HtmlWebpack({
            template: "./src/index.html",
            filename: "./index.html",
            chunks: ["js"],
            hash: true,
        }),
        new HtmlWebpack({
            template: "./src/pastelero.html",
            filename: "./pastelero.html",
            hash: true,
        }),
        new HtmlWebpack({
            template: "./src/pedido.html",
            filename: "./pedido.html",
            hash: true,
        }),
        new miniCssExtract(),
    ],
};