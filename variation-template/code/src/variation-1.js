// Import main Sass/SCSS here
import "./variation-1.scss";

// Variation code running alert! Remove later.
alert("Hello from variation code!");

// Start Variation JS
void (function loadVariation(timeInFuture) {
  try {
    // Main Test object
    const test = {
      // Some test specific global variables
      id: "TEST_ID",
      name: "TEST_NAME",
      version: "Version 1.0",
      variation: "Variation 1",
      pollingElement: document.querySelector("POLLING_ELEMENT"),

      // Test init
      init: function () {
        // Add a test specific classname to the body element
        document.body.classList.add(test.id);

        // Below function calls order is important
        test.mainCSS();
        test.identifyElements();
        test.mainJS();
        test.setupEvents();
      },

      // Main CSS
      mainCSS: function () {
        const styleEl = document.createElement("style");
        styleEl.id = test.id + "__mainCSS";
        document.head.appendChild(styleEl).textContent = `
        /*
          Write your CSS here, if you don't want to write CSS in a separate CSS file.
        */
      `;
      },

      // Identify control elements in here
      identifyElements: function () {
        // Get jQuery reference
        const $ = jQuery;

        // Identify sample element
        // $(".sample-element").addClass("c-sample-element");
      },

      // Main JS
      mainJS: function () {
        // Get jQuery reference
        const $ = jQuery;

        // Manipulate elements in here
      },

      // Setup events
      setupEvents: function () {
        document.addEventListener("click", test.handleDocumentClicks);
      },

      // Handle all document clicks
      handleDocumentClicks: function (clickEvent) {
        // Get jQuery reference
        const $ = jQuery;

        // Handle element with class name ELEMENT_CLASS_NAME click
        if (clickEvent.target.classList.contains("ELEMENT_CLASS_NAME")) {
          // Do something on click of element with className ELEMENT_CLASS_NAME
        }
      },

      // Register all mutation observers here
      registerMutationObservers: function () {},
    };

    // Return if the test ran already!
    if (document.querySelector(`.${test.id}`)) return;

    // Polling conditions
    if (test.pollingElement && window.jQuery) {
      // Activate test
      test.init();

      // Register mutation observers here after test init
      test.registerMutationObservers();

      // Success log
      console.log(
        "Saabbir:",
        `${test.name}: ${test.variation}: ${test.version}`
      );
    } else {
      Date.now() < timeInFuture
        ? setTimeout(loadVariation.bind({}, timeInFuture), 25)
        : console.log("Saabbir:", "loadVariation timed out!");
    }
  } catch (error) {
    // Error log
    console.log("Saabbir: Test Initialization Error:", error);
  }
})(Date.now() + 60000);
// End Variation JS
