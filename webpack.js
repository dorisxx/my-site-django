const TerserPlugin = require("terser-webpack-plugin");

const path = require("path"),
  root = path.resolve(__dirname, "./"),
  devServerPath = "http://localhost:3000/hmr",
  sourcesPath = `${root}/front_end/src/js`,
  outputPath = `${root}/front_end/dist/`;

const mode = process.env.NODE_ENV,
  isDev = mode === "development";

module.exports = {
  mode,
  devtool: isDev ? "eval-source-map" : "nosources-source-map",
  entry: {
    "js/index": `${sourcesPath}/index.js`
  },

  output: {
    filename: `[name]${isDev ? "" : ".min"}.js`,
    path: isDev ? `${root}/bundles` : outputPath,
    publicPath: isDev ? devServerPath : "./"
  },

  devServer: {
    publicPath: devServerPath,
    hot: true,
    host: "localhost",
    port: "3000",
    clientLogLevel: "info",
    overlay: true,
    headers: { "Access-Control-Allow-Origin": "*" }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              sourceType: "unambiguous",
              presets: ["@babel/preset-env", "@babel/react"],
              plugins: ["transform-class-properties"]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: isDev
              ? {}
              : {
                  outputPath: "images/",
                  publicPath: "/static/images"
                }
          }
        ]
      }
    ]
  },

  optimization: isDev
    ? {}
    : {
        minimize: true,
        runtimeChunk: false,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              ECMA: 6
            }
          })
        ]
      }
};
