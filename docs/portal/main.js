const Toastify = require("toastify-js");
require("toastify-js/src/toastify.css");

const { instantiateAt, unmountFrom, on } = require("front-components");

// A small event counter
let eventsReceived = 0;

// Increment counter when incoming events from a
on("from-a", () => {
  eventsReceived++;
  Toastify({
    text: `Portal received ${eventsReceived} events`,
    duration: 1000,
  }).showToast();
});

/// DEMO UTILITIES

// Start a service at given DOM node
function startServiceA() {
  const aRoot = document.getElementById("a-root");
  return instantiateAt("service-a", aRoot);
}

// Unmount all services
async function unmountAll() {
  const aRoot = document.getElementById("a-root");
  if (aRoot) {
    await unmountFrom("service-a", aRoot);
  }

  const bRoot = document.getElementById("b-root");
  if (bRoot) {
    await unmountFrom("service-b", bRoot);
  }
}

// We can call those from markdown pages
window.__demoFn = {
  startServiceA,
  unmountAll,
};
