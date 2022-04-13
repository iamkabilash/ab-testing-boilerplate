const fs = require("fs");
const path = require("path");
const entry = require("webpack-glob-entry");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = (env, argv) => {
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
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
      "postcss-loader",
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          sassOptions: {
            outputStyle: argv.mode === "production" ? "expanded" : "compressed",
          },
        },
      },
    ],
  };

  const srcFullPath = String.raw`${fs.readFileSync("./src-path.txt", "utf8")}`;
  const srcPath = path.resolve(srcFullPath).split(path.sep).join("/");

  const distPath = path
    .resolve(srcPath, "..", "dist")
    .split(path.sep)
    .join("/");

  // Global config
  const config = {
    entry: entry(`${srcPath}/**/*.js`),
    output: {
      filename: "[name].js",
      path: distPath,
      clean: true,
    },
    module: {
      rules: [cssConfig],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new LiveReloadPlugin({
        protocol: "https",
        port: 35729,
        // liveCSS: false,
        // liveImg: false,
        applyCSSLive: true,
        //useSourceHash: true,
        //ignore: /css|scss/,
        key: fs.readFileSync(path.join(__dirname, "livereload.key"), "utf-8"),
        cert: fs.readFileSync(path.join(__dirname, "livereload.crt"), "utf-8"),
      }),
    ],
    devServer: {
      https: true,
    },
  };

  // Dev specific config
  if (argv.mode === "development") {
    config.devtool = "source-map";
  }

  // Prod specific config
  if (argv.mode === "production") {
    config.module.rules.unshift(jsConfig);
    config.optimization = {
      minimize: false,
    };
  }

  return config;
};
