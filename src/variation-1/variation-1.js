import "./variation-1.scss";

alert("Hello from Echo AB Testing Boilerplate!");

// Start Variation JS
var TEST_NAME = {
  init: function () {
    // Add a test specific class to the body element
    document.body.classList.add("test_specific_class_name");

    this.mainCSS();
    this.mainJS();
  },
  mainCSS: function () {
    var styleEl = document.createElement("style");
    styleEl.setAttribute("type", "text/css");
    document.head.appendChild(styleEl).textContent = "";
  },
  mainJS: function () {
    // Get reference to the jQuery object
    var $ = jQuery;

    // Test specific JavaScript code goes here
  },
};

!(function pollingFunction() {
  // Return if the test already ran once.
  if (document.querySelector(".test_specific_class_name"))
    return "Test already ran once!";

  if (window.jQuery && jQuery("POLL_ELEMENT").length) {
    // Activate test
    TEST_NAME.init();

    console.log("Test Plan: TEST_PLAN_NAME V:1.0");
  } else {
    setTimeout(pollingFunction, 25);
  }
})(); // End Variation JS
