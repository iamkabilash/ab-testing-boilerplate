# AB Testing Boilerplate

## Technology used

![Javascript][javascript-shield] ![Node js][nodejs-shield] ![Webpack][webpack-shield]

## Chrome Extension

[![User JavaScript and CSS][user-js-and-css-shield]][user-js-and-css-url]

## Features:

- Compile SCSS into CSS
- Transpile modern JavaScript (ES6+) into ES5
- CSS autoprefixer support
- Souremap support
- Livereload enabled
- Console log removed from the build files

## Getting Started

_Follow below steps in order_

1. Download the zip file from this link https://github.com/Saabbir/ab-testing-boilerplate/archive/refs/heads/master.zip

Or you can clone this repo by typing following command in the terminal:

```sh
git clone https://github.com/Saabbir/ab-testing-boilerplate.git
```

2. Open the project in your favorite code editor and run the following command from the project root:

```sh
npm install
```

3. While npm is installing the dependencies, install chrome extension [User JavaScript and CSS][user-js-and-css-url].

4. Once User JavaScript and CSS chrome extension has been installed, click the extension icon to setup a new script. Within the extension, copy and paste the following code into the **JS** pane and press `ctrl + s` to save the script.

```js
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
```

_You won't need to worry about the above code. It won't change and it will be the same for all the time. It just injects your variation css and javascript along with livereload script to your target URL page._

5. Also, give this script a name and a target URL where you want your variation to run.

6. After that, go back to your code editor and write your currently working project path into `_project-path.txt` file in the root directory. This is very important as some of the command you will run later will start from here.

7. After setting the project path, you can generate some boilerplate code into your project, by running `npm run create` command. It will generate some boilerplate code along with a file named `target-url.txt`. You can set your target url into this file and by doing that whenever you run `npm run dev` command, it will open your target url into your browser automatically.

```sh
npm run create
```

8. When you're done setting the project path and generating project boilerplate code, it's time to start local development. Run following command and it will start the development server from your specified project path.

```sh
npm run dev
```

9. Now start working on your project by writing some code into the project javascript and scss file and see the magic.

10. Finally, when you're done with the local development, run following command to build the final javascript and css to use in the A/B testing tool.

```sh
npm run build
```

_The build files will be found inside the `dist` directory. Copy necessary codes from there to use in your A/B testing tool._

<!-- ## Notes

If you prefer to use Tampermonkey instead of User JavaScript and CSS, you can do that and use following userscript for Tampermonkey which does the same thing as above.

```js
// ==UserScript==
// @name         Inject variations
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http://*abtest=true
// @include      https://*abtest=true
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

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
``` -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[javascript-shield]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[nodejs-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[webpack-shield]: https://img.shields.io/badge/Webpack-2B3A42?style=for-the-badge&logo=webpack&logoColor=#75AFCC
[user-js-and-css-shield]: https://img.shields.io/badge/Chrome%20Extension-User%20JavaScript%20and%20CSS-%23FFDD57?style=for-the-badge
[user-js-and-css-url]: https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en
