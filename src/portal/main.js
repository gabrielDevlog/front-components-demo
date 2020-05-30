const { instantiateAt, on } = require("front-components");

// A small event counter
let eventsReceived = 0;
function updateCounter() {
  const counter = document.getElementById("portal-counter");
  counter.innerHTML = `Events received in portal: ${eventsReceived}`;
}

// Increment counter when incoming events from a
on("from-a", () => {
  eventsReceived++;
  updateCounter();
});

// Start service A
const aRoot = document.getElementById("a-root");
instantiateAt("service-a", aRoot);

// Start service B
const bRoot = document.getElementById("b-root");
instantiateAt("service-b", bRoot);

// Init event count
updateCounter();
