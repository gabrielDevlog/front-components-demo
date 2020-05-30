# Front-components-demo

A documentation and a demo site for front-components.

Powered with `parcel-bundler` and `pnpm`.

## What can I do ?

- `pnpm i`: install all dependencies
- `pnpm run dev`: launch a dev server
- `pnpm run doc`: build a doc + demo in `docs` folder

## All is in src

Js files corresponding to portal and services are in `src`, and bundled with `parcel-bundler` following `src/index.html`.

Documentation generator is `docsify`. It uses markdown files in `src` folder. `parcel-plugin-static-files-copy` copy all markdown to `docs` folder for dev & build time.
