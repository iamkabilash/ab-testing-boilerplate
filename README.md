## CLI steps

1. To get started, first install project dependencies using `npm install`.
2. Then create a project or select a project using `npm run cli`.
3. Then start the dev server using `npm run dev`.
4. Use `npm run build` to build the `dist` directory after finishing the local development.

## GUI + CLI steps

1. To get started, first install project dependencies using `npm install`.
2. Then create a project manually using GUI (Graphical User Interface).
3. Then write project path to `_project-path.txt` file in the root directory.
4. Then generate project boilerplate code using `npm run generate` or you can copy all the template files from `variation-template` directory manually.
5. Now run `npm run dev` to start local development.
6. Use `npm run build` to build the `dist` directory after finishing the local development.

## Setup User JavaScript and CSS

1. Install chrome extension [User JavaScript and CSS][user-js-and-css-url].

2. Once User JavaScript and CSS chrome extension has been installed, click the extension icon to setup a new script. Within the extension, copy and paste the following code into the **JS** pane and press `ctrl + s` to save the script.

```js
// Set which variation to show to the page
const variation = 1;

// Set `abtest` cookie if you visit a page with `abtest` string in the url anywhere
if (document.location.href.includes("abtest")) {
  document.cookie = "abtest=true; path=/; max-age=60*60*24";
}

// Check if `abtest` cookie available or the url contains string `abtest`
if (
  document.cookie.includes("abtest") ||
  document.location.href.includes("abtest")
) {
  void (function injectCSS() {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.href = `http://localhost:8080/variation-${variation}.css`;
    document.head.appendChild(link);
  })();

  void (function injectJS() {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = `http://localhost:8080/variation-${variation}.js`;
    document.body.appendChild(script);
  })();

  void (function injectLiveReloadScript() {
    const script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.src = "http://localhost:35729/livereload.js?snipver=1";
    document.body.appendChild(script);
  })();

  console.log("Saabbir:", "UserScript is running!");
}
```

_You won't need to worry about the code above. It won't change and it will be the same for all the time. It just injects your variation CSS and JavaScript along with livereload script to your target URL page._

3. Give this script a name and a target URL where you want your variation to run.

## Some more commands

To check currenty working project path/directory, run:

```sh
npm run pwd
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[javascript-shield]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[nodejs-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[webpack-shield]: https://img.shields.io/badge/Webpack-2B3A42?style=for-the-badge&logo=webpack&logoColor=#75AFCC
[user-js-and-css-shield]: https://img.shields.io/badge/Chrome%20Extension-User%20JavaScript%20and%20CSS-%23FFDD57?style=for-the-badge
[user-js-and-css-url]: https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en
