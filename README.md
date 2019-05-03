Packages installation

First, we have to install the main package, as well as graphql-js (and it's typings) which is a peer dependency of TypeGraphQL:

npm i graphql @types/graphql type-graphql

Also, the reflect-metadata shim is required to make the type reflection work:

npm i reflect-metadata

We must ensure that it is imported at the top of our entry file (before we use/import type-graphql or our resolvers):

import "reflect-metadata";

TypeScript configuration

It's important to set these options in the tsconfig.json file of our project:

{
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true
}

TypeGraphQL is designed to work with Node.js LTS (8, 10) and the latest stable releases. It uses features from ES7 (ES2016) so we should set our tsconfig.json file appropriately:

{
  "target": "es2016" // or newer if your node.js version supports this
}

Due to using the graphql-subscription dependency that relies on an AsyncIterator, we may also have to provide the esnext.asynciterable to the lib option:

{
  "lib": ["es2016", "esnext.asynciterable"]
}

All in all, the minimal tsconfig.json file example looks like this:

{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "lib": ["es2016", "esnext.asynciterable"],
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
