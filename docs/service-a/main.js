const { registerInstance, emit } = require("front-components");

registerInstance({
  serviceId: "service-a",
  mount,
  unmount,
});

// A small layout
const title = document.createElement("h1");
title.innerHTML = "Service A";

const button = document.createElement("button");
button.onclick = () => emit("from-a");
button.innerHTML = "Emit";

const counter = document.createElement("div");
counter.innerHTML = "events received: 0";

const view = document.createElement("div");
view.appendChild(title);
view.appendChild(button);
view.appendChild(counter);

// Mount / unmount this service
export function mount(div) {
  div.appendChild(view);
  return Promise.resolve();
}

export function unmount(div) {
  div.removeChild(view);
  return Promise.resolve();
}
