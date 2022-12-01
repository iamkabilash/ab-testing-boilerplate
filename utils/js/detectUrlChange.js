/**
 * Detect URL change
 *
 * Learn more on https://phpcoder.tech/detect-url-change-in-javascript-without-refresh/
 *
 * @param {function} cb - Callback function
 */

function detectUrlChange(cb) {
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;

      // Do something on URL change
      cb();
    }
  }).observe(document, { subtree: true, childList: true });
}

export default detectUrlChange;
