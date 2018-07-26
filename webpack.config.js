const { resolve } = require("path");

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = env => {
  return {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: [
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      "./main.js"
    ],

    output: {
      filename: "bundle.js",
      path: resolve(__dirname, "dist"),
      publicPath: ""
    },

    context: resolve(__dirname, "app"),

    devServer: {
      hot: true,
      contentBase: resolve(__dirname, "build"),
      historyApiFallback: true,
      publicPath: "/"
    },

    resolve: {
      extensions: [".js", ".jsx"]
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loaders: ["babel-loader"],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ["css-hot-loader"].concat(
            ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 2
                  }
                },
                {
                  loader: "@umu-team/preprocess-loader",
                  options: {
                    context: {
                      IS_PRODUCTION: !!(env && env.IS_PRODUCTION)
                    }
                  }
                },
                "sass-loader"
              ],
              publicPath: "../"
            })
          )
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin({
        filename: "./styles/style.css",
        disable: false,
        allChunks: true
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};
