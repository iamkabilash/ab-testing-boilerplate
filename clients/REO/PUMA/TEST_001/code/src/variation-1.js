// Import main Sass/SCSS here
import "./variation-1.scss";

// Variation code running alert! Remove later.
alert("Hello from AB Testing Boilerplate!");

// Start Variation JS
void (function loadVariation() {
  const test = {
    id: "TEST_ID",
    name: "TEST_NAME",
    version: "Version 1.0",
    variation: "Variation 1",
    polling_element: "POLLING_ELEMENT",
    init: function () {
      // Add a test specific classname to the body element
      document.body.classList.add(
        test.id,
        test.id + "--" + test.variation.toLowerCase().split(" ").join("-")
      );

      // Below function calls order is important
      test.preSetupVariables();
      test.preSetupEvents();
      test.mainCSS();
      test.mainJS();
      test.postSetupVariables();
      test.postSetupEvents();
      test.registerMutationObservers();
    },
    preSetupVariables: function () {
      // Setup test independent/global variables
    },
    preSetupEvents: function () {
      // Setup test independent/global events
      document.addEventListener("click", test.handleDocumentClicks);
    },
    mainCSS: function () {
      const styleEl = document.createElement("style");
      styleEl.id = test.id + "__mainCSS";
      document.head.appendChild(styleEl).textContent = `
        /*
          Write your CSS here, if you don't want to write CSS in a separate CSS file.
        */
      `;
    },
    mainJS: function () {
      /*-----------------------------------------\
      // 01 - DEFINE VARIABLES
      /-----------------------------------------*/

      // Get jQuery reference
      const $ = jQuery;

      /*-----------------------------------------\
      // 02 - IDENTIFY ELEMENTS
      /-----------------------------------------*/

      // Identify ELEMENT

      /*-----------------------------------------\
      // 03 - MANIPULATE ELEMENTS
      /-----------------------------------------*/

      // Manipulate ELEMENT
    },
    postSetupVariables: function () {
      // Setup test dependent variables
      // test.modal = document.querySelector(".c-exit-intent-modal");
    },
    postSetupEvents: function () {
      // Setup test dependent events
      // test.modal.addEventListener("click", test.handleModalClick);
    },
    handleDocumentClicks: function (clickEvent) {
      if (clickEvent.target.classList.contains("ELEMENT_CLASS_NAME")) {
        // Do something on click of element with className ELEMENT_CLASS_NAME
      }
    },
    registerMutationObservers: function () {
      // Setup mutation observers for this test in here
    },
  };

  // Polling conditions
  if (
    !document.querySelector(`.${test.id}`) &&
    document.querySelector(test.polling_element || "body") &&
    window.jQuery
  ) {
    try {
      // Activate test
      test.init();

      // Register mutation observers here after test init
      test.registerMutationObservers();

      // Success log
      console.log(
        "Saabbir:",
        `${test.name}: ${test.variation}: ${test.version}`
      );
    } catch (error) {
      // Error log
      console.log("Saabbir:", `${test.name}: Initialization Error:`, error);
    }
  } else {
    setTimeout(loadVariation, 25);
  }
})();
// End Variation JS
