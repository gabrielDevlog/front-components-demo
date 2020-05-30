# Micro frontend composition

Easily compose front end services

- call js bundle and use them as service
- handle communication between services using "url as contract" and events

## Overview

In your micro-frontend index, register a new instance

```javascript
const { registerInstance } = require("front-components");

registerInstance({
  serviceId: "service-a",
  mount,
  unmount,
});

export function mount(div) {
  div.innerHtml = "Hello from service A";
  return Promise.resolve();
}

export function unmount(div) {
  div.innerHtml = "";
  return Promise.resolve();
}
```

In your portal, call this service

```javascript
const { instantiateAt } = require("front-components");

// Start service A
const aRoot = document.getElementById("a-root");
instantiateAt("service-a", aRoot);
```

And you have mounted service A inside this page

<!-- Live Demo -->
<div id="a-root"></div>
<div id="portal-counter"></div>

<script>
  __demoFn.unmountAll();
  __demoFn.startServiceA();
</script>

## Getting started

Install with `npm i -S front-components` and then ...

1/ Create a service using your favorite framework. Each service has to register itself using `registerInstance`, providing it a unique name, a mounting function and an unmounting function.

2/ Build your service using your favorite bundler

3/ In your portal, load your service bundle the way you want:

- script tag (`<script src="/my-script-url/my-script.js"></script>`),
- [systemJs](https://github.com/systemjs/systemjs),
- [import-html-entry](https://www.npmjs.com/package/import-html-entry),
- ...

4/ start an instance of your service using `instantiateAt`, providing it a service name and a dom element where the service will be mounted
