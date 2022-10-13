const fs = require("fs");
const path = require("path");
const entry = require("webpack-glob-entry");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const { URL } = require("url");

// Project path
const projectPath = String.raw`${fs.readFileSync(
  "./_project-path.txt",
  "utf8"
)}`;

// Project src path
const projectSrcPath = path.resolve(
  path.resolve(projectPath).split(path.sep).join("/"),
  "code/src"
);

// Project dist path
const projectDistPath = path
  .resolve(projectSrcPath, "..", "dist")
  .split(path.sep)
  .join("/");

// URL to open when `npm run dev` command runs
let targetURL;
try {
  targetURL = String.raw`${fs.readFileSync(
    path.resolve(`${projectPath}`, "target-url.txt"),
    "utf8"
  )}`;

  const url = new URL(targetURL);
  if (url.search) {
    url.searchParams.append("abtest", "true");
    targetURL = url.href;
  } else {
    targetURL = targetURL + "?abtest=true";
  }
} catch (e) {
  targetURL = "http://localhost:8080/";
}

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
          // Prefer `dart-sass`
          implementation: require("sass"),
          sourceMap: true,
          sassOptions: {
            outputStyle: argv.mode === "production" ? "expanded" : "compressed",
          },
        },
      },
    ],
  };

  // Global config
  const config = {
    entry: entry(`${projectSrcPath}/**/*.js`),
    output: {
      filename: "[name].js",
      path: projectDistPath,
      clean: true,
      publicPath: "/",
    },
    module: {
      rules: [cssConfig],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new LiveReloadPlugin({
        protocol: "http",
        port: 35729,
        // liveCSS: false,
        // liveImg: false,
        applyCSSLive: true,
        //useSourceHash: true,
        //ignore: /css|scss/,
      }),
    ],
    devServer: {
      //https: true,
      historyApiFallback: true,
      allowedHosts: "all",
      host: "localhost",
      liveReload: true,
      open: {
        target: [targetURL],
      },
      compress: true,
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
    },
    externals: {
      // require("jquery") is external and available
      //  on the global var jQuery
      jquery: "jQuery",
    },
    resolve: {
      alias: {
        utils: path.resolve(__dirname, "utils"),
      },
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
