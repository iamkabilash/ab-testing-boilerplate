// ==UserScript==
// @name         Inject variations
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*abtest=true
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function () {
  "use strict";

  // Add CSS using GM.xmlHttpRequest
  // GM.xmlHttpRequest({
  //   method: "GET",
  //   url: "http://localhost:8080/variation-1.css",
  //   onload: function (response) {
  //     var css = response.responseText;
  //     if (css) {
  //       const styleEl = document.createElement("style");
  //       styleEl.type = "text/css";
  //       styleEl.id = "variation-css";
  //       document.head.appendChild(styleEl).innerHTML = css;
  //     }
  //   },
  // });

  // Add JS using GM.xmlHttpRequest
  // GM.xmlHttpRequest({
  //   method: "GET",
  //   url: "http://localhost:8080/variation-1.js",
  //   onload: function (response) {
  //     var js = response.responseText;
  //     if (js) {
  //       const scriptEl = document.createElement("script");
  //       scriptEl.type = "text/javascript";
  //       scriptEl.id = "variation-js";
  //       document.body.appendChild(scriptEl).innerHTML = js;
  //     }
  //   },
  // });

  function injectCSS() {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.href = "http://localhost:8080/variation-1.css";
    document.head.appendChild(link);
  }

  function injectJS() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = "http://localhost:8080/variation-1.js";
    document.body.appendChild(script);
  }

  function injectLiveReloadScript() {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = "http://localhost:35729/livereload.js?snipver=1";
    document.body.appendChild(script);
  }

  injectCSS();
  injectJS();
  injectLiveReloadScript();

  console.log("Saabbir:", "Tampermonkey UserScript is running!");
})();
