const { registerInstance, emit } = require("front-components");

registerInstance({
  serviceId: "service-b",
  mount,
  unmount,
});

// A small layout
const title = document.createElement("h1");
title.innerHTML = "Service B";

const button = document.createElement("button");
button.onclick = () => emit("from-a");
button.innerHTML = "Emit";

const counter = document.createElement("div");
counter.innerHTML = "events received: 0";

// A div where b will be mounted
const bRoot = document.createElement("div");

const view = document.createElement("div");
view.appendChild(title);
view.appendChild(button);
view.appendChild(counter);
view.appendChild(bRoot);

// Mount / unmount this service
export function mount(div) {
  div.appendChild(view);
  return Promise.resolve();
}

export function unmount(div) {
  div.removeChild(view);
  return Promise.resolve();
}
