// Import main Sass/SCSS here
import "./variation-1.scss";

// Variation code running alert! Remove later.
alert("Hello from Echo AB Testing Boilerplate!");

// Start Variation JS
void (function loadVariation() {
  // Main variation/application code
  var test = {
    init: function () {
      // Add a test specific classname to the body element
      document.body.classList.add("test_specific_class_name");

      // Below function calls order is important
      test.preSetupVariables();
      test.preSetupEvents();
      test.mainCSS();
      test.mainJS();
      test.postSetupVariables();
      test.postSetupEvents();
    },
    preSetupVariables: function () {
      // Setup test independent/global variables
      test.name = "TEST_PLAN_NAME";
      test.version = "Version 1.0";
      test.variation = "Variation 1";
    },
    preSetupEvents: function () {
      // Setup test independent/global events
      document.addEventListener("click", test.handleDocumentClicks);
    },
    mainCSS: function () {
      var styleEl = document.createElement("style");
      styleEl.setAttribute("type", "text/css");
      document.head.appendChild(styleEl).textContent = `
        .test_specific_class_name * {
          border: 2px solid red;
        }
      `;
    },
    mainJS: function () {
      // Get jQuery reference
      var $ = jQuery;

      // Test specific JavaScript code goes here
    },
    postSetupVariables: function () {
      // Setup test dependent variables
      // test.modal = document.querySelector(".c-exit-intent-modal");
    },
    postSetupEvents: function () {
      // Setup test dependent events
      // test.modal.addEventListener("click", test.handleModalClick);
    },
    handleDocumentClicks: function (e) {
      if (e.target.className.includes("ELEMENT_CLASS_NAME")) {
        // Do something on click of element with className ELEMENT_CLASS_NAME
      }
    },
  };

  // Polling conditions
  if (
    !document.querySelector(".test_specific_class_name") &&
    window.jQuery &&
    jQuery("POLL_ELEMENT").length
  ) {
    try {
      // Activate test
      test.init();

      // Success log
      console.log(
        "Saabbir:",
        `${test.name}: ${test.variation}: ${test.version}`
      );
    } catch (error) {
      // Error log
      console.log("Saabbir:", `${test.name}: Initialization error:`, error);
    }
  } else {
    setTimeout(loadVariation, 25);
  }
})(); // End Variation JS
