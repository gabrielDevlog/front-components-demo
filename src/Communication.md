# Communication

Communication between services and portal (where all services are composed) can be made using:

- url as a contract
- events

Each service, including the portal, has:

- access to a router
- access to an event bus

There is two kind of services:

- global service: has access to browser router and a global event bus. The portal, where all services are composed, is considered a global service.
- controlled service: has access to a specific router, detached from browser router. It emits and listen in a specific event bus, also detached from global event bus.

When calling `instantiateAt`, you can specify which can of service you want:

- `instantiateAt('service-a', domElement, { isControlled: false }) // start a global service, last arguments can be omitted here`
- `instantiateAt('service-a', domElement, { isControlled: true }) // start a controlled service`

In both cases, `instantiateAt` return what we call `serviceControls`. ServiceControls is an abstraction layer to interact with:

- service router
- service event bus

## Events

To emit and listen to events, you can us `emit` and `on` utilities.

```javascript
import { emit, on } from "front-components";

emit("my-event");
on("my-event", (data) => console.log(data));
```

Portal always emit/listen to global event bus.
Global service emit/listen to global event bus.
Controlled service emit/listen to a scoped event bus.

### Example 1: portal and global service

Here is a service A which mount a react application. It emit an event when mounted. Notice that this event might be emitted in a global bus or a scoped event bus. Service has no knowledge of this.

```javascript
// ... service-a/index.js
import { emit } from "front-components";
import { getReactRouterHistory } from "front-components-history";

function mount(domElement) {
  ReactDOM.render(<App />, domElement); // Mount a react app
  emit("ready", { foo: "bar" }); // emit an event to service event bus (shared or global)
}

function unmount(domElement) {
  ReactDOM.unmountComponentAtNode(domElement);
}

registerInstance({
  serviceId: "service-A",
  mount,
  unmount,
});
```

Here the portal start service A as global. Portal can listen to service event in global event bus.

```javascript
// ... portal/index.js
import { instantiateAt, on } from "front-components";

// Listen to global events
on("ready", (data) => {
  console.log(data); // Once service-a will be mounted, this will be logged
});

// Instantiate service A
const div = document.getElementById("a-root");
instantiateAt("service-A", div);
```

By default, event will be emitted in a shared event bus. Two types of services have access to this shared bus:

- portal
- a global service

To interact with a service from its caller, you can use `serviceControls`, which is returned by `instantiateAt`.

```javascript
// Start a new instance of service A
const serviceControls = await instantiateAt("service-a", domElement);

// Route service-a to /login
serviceControls.history.push("/login");

// Listen to events emitted by service-a
serviceControls.events.on("my-event", () => {
  console.log("events");
});
```

### Example 2: portal and controlled service

Same service A than in example 1, nothing changed.

```javascript
// ... service-a/index.js
import { emit } from "front-components";
import { getReactRouterHistory } from "front-components-history";

function mount(domElement) {
  ReactDOM.render(<App />, domElement); // Mount a react app
  emit("ready", { foo: "bar" }); // emit an event to service event bus (shared or global)
}

function unmount(domElement) {
  ReactDOM.unmountComponentAtNode(domElement);
}

registerInstance({
  serviceId: "service-A",
  mount,
  unmount,
});
```

That time portal start service A as controlled. Service A has no access global event bus. To interact with service A, portal has to use its controls.

```javascript
// ... portal/index.js
import { instantiateAt, on } from "front-components";

// Instantiate service A
const div = document.getElementById("a-root");
const serviceControls = await instantiateAt("service-A", div);

// Listen to events emitted by service-a in its scoped bus
serviceControls.events.on("ready", () => {
  console.log("events");
});
```

## Routing
