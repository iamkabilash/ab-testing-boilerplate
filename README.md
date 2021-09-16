# Echo AB Testing Boilerplate

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

1. Clone this repo by typing following command in the terminal:

```sh
git clone https://github.com/Saabbir/echo-ab-testing-boilerplate.git
```

2. Open the project in your favorite code editor and run the following command from the project root:

```sh
npm install
```

3. While npm is installing the dependencies, install chrome extension [User JavaScript and CSS][user-js-and-css-url].

4. Once User JavaScript and CSS chrome extension has been installed, click the extension icon to setup a new script. Within the extension, copy and paste the following code into the **JS** pane and press `ctrl + s` to save the script.

```sh
function injectCSS() {
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.href = "http://localhost:8080/variation-1.css";
	document.head.appendChild(link);
}

function injectJS() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.src = "http://localhost:8080/variation-1.js";
	document.body.appendChild(script);
}

function injectLiveReloadScript() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.src = "http://localhost:35729/livereload.js?snipver=1";
	document.body.appendChild(script);
}

injectCSS();
injectJS();
injectLiveReloadScript();

console.log('A/B Test Script is running!');
```

_You won't need to worry about the above code. It won't change and it will be the same for all the time. It just injects your variation css and javascript along with livereload script to your target URL page._

5. Also, give this script a name and a target URL where your variation will run.

6. Now run following command from the project root and visit your target URL to see the variation:

```sh
npm run dev
```

_You will need to refresh the target URL once if that URL already loaded in the browser._

7. You can use the variation-1.js & variation-1.scss inside the variation-1 directory to create your AB Test variation or you can create your own folder structure. Just make sure to add the correct path for your variation js in webpack entry object.

8. Finally, when you're done with the local development, run following command to build the final javascript and css to use in the A/B testing tools.

```sh
npm run build
```

_The build files will be found inside the dist directory. Copy necessary codes from there to use in your A/B testing tool._

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[javascript-shield]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[nodejs-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[webpack-shield]: https://img.shields.io/badge/Webpack-2B3A42?style=for-the-badge&logo=webpack&logoColor=#75AFCC
[user-js-and-css-shield]: https://img.shields.io/badge/Chrome%20Extension-User%20JavaScript%20and%20CSS-%23FFDD57?style=for-the-badge
[user-js-and-css-url]: https://chrome.google.com/webstore/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld?hl=en
