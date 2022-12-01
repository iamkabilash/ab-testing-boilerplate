/**
 * Detect a network call using `PerformanceObserver` Web API
 */

function detectNetworkCall__method_1() {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (
        entry.initiatorType === "xmlhttprequest" &&
        entry.name.match(/cartSummary/)
      ) {
        console.log("Detected cartSummary network call.");
      }
    }
  });
  observer.observe({
    entryTypes: ["resource"],
  });
}

/**
 * Detect a network call by overriding XMLHttpRequest send method
 */

function detectNetworkCall__method_2() {
  var send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function () {
    this.addEventListener("load", function (e) {
      if (
        this.responseURL.match(/cartSummary/) &&
        this.status === 200 &&
        this.readyState === 4
      ) {
        console.log("Detected cartSummary network call.");
      }
    });
    return send.apply(this, arguments);
  };
}

/**
 * nodejs get all folders in directory
 * Ref: https://www.codegrepper.com/code-examples/javascript/javascript+get+all+folder+names
 */

const { readdirSync } = require("fs");

function getDirectories(source) {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}
