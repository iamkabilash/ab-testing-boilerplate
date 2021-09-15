var LiveReload = require("livereload");

const extensionsToWatch = ["js", "css", "scss"];

const liveReloadServer = LiveReload.createServer({
  port: 35729,
  debug: true,
  exts: extensionsToWatch,
  applyCSSLive: true,
});

liveReloadServer.watch(__dirname);
