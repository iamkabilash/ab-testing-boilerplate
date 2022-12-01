// Set which variation to show to the page
const variation = 1;

// Set `abtest` cookie if you visit a page with `abtest` query parameter
if (document.location.search.includes("abtest")) {
  document.cookie = "abtest=true; path=/;";
}

// Check if `abtest` cookie available or the url has `abtest` query parameter
if (
  document.cookie.includes("abtest") ||
  document.location.search.includes("abtest")
) {
  void (function injectCSS() {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.href = `http://localhost:8080/variation-${variation}.css`;
    document.head.appendChild(link);
  })();

  void (function injectJS() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = `http://localhost:8080/variation-${variation}.js`;
    document.body.appendChild(script);
  })();

  void (function injectLiveReloadScript() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = "http://localhost:35729/livereload.js?snipver=1";
    document.body.appendChild(script);
  })();

  console.log("Saabbir:", "UserScript is running!");
}
