function throttle(callback, time) {
  if (window.throttleTimer) return;
  window.throttleTimer = true;
  setTimeout(() => {
    callback();
    window.throttleTimer = false;
  }, time);
}

export default throttle;
