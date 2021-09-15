[![LinkedIn][linkedin-shield]][linkedin-url]

### Languages

![Javascript][javascript-shield]

### Frameworks

![Node js][nodejs-shield]

# How to

1. Clone this repo by typing following command in the terminal:

```sh
git clone https://github.com/Saabbir/echo-ab-testing-boilerplate.git
```

2. Open the project in your favorite code editor and run the following command from the project root:

```sh
npm install
```

3. While npm is installing the dependencies, install chrome extension User JavaScript and CSS.

4. Once User JavaScript and CSS chrome extension installation is complete, click User JavaScript and CSS extension to setup a new script.
   Within the javascript pane of the User JavaScript and CSS extension, copy and paste the following code and press `ctrl + s` to save:

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

*You won't need to worry about the above code. It won't change and it will be the same for all the time. It just injects your variation css and javascript along with livereload script to your target URL page.*

5. Also, give this script a name and a target URL where your A/B test script will run.

6. Now run following command from the project root and visit your target URL to see the variation:

```sh
npm run dev
```

*You may need to refresh the target URL once if you were visited that page/URL already.*

7. You can use the variation-1.js & variation-1.scss inside the variation-1 directory to create your AB Test variation or you can create your own folder structure. Just make sure to add the correct path for your variation js in webpack entry object.

8. Finally, when you're done with the local development, run following command to build the final javascript and css to use in the A/B testing tools.

```sh
npm run build
```

*The build files will be found inside the dist directory. Copy necessary codes from here to use in your A/B testing tool.*

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[linkedin-url]: https://www.linkedin.com/in/thesaabbir
[javascript-shield]: https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E
[nodejs-shield]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
