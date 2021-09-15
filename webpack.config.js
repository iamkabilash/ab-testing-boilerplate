const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const jsConfig = {
  test: /\.m?js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
  },
};

const cssConfig = {
  test: /\.(scss|css)$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
    {
      loader: "sass-loader",
      options: {
        sassOptions: {
          outputStyle: "expanded",
        },
      },
    },
  ],
};

const config = {
  entry: {
    "variation-1": "./src/variation-1/variation-1.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [cssConfig],
  },
  plugins: [new MiniCssExtractPlugin()],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }

  if (argv.mode === "production") {
    config.module.rules.unshift(jsConfig);
    config.optimization = {
      minimize: false,
    };
  }

  return config;
};
