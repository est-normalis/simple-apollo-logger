# @est-normalis/simple-apollo-logger

[![npm version](https://badge.fury.io/js/%40est-normalis%2Fsimple-apollo-logger.svg)](https://www.npmjs.com/package/@est-normalis/simple-apollo-logger)

A very simple logger for Apollo Server

**Warning** simple-apollo-logger is in alpha version.

## Installation

### yarn

```bash
yarn add @est-normalis/simple-apollo-logger
```

### npm

```bash
npm i @est-normalis/simple-apollo-logger
```

## Usage

To use this package you need to add plugin or extension to your ApolloServer

### Plugin

```typescript
[...]
import { apolloLogPlugin } from '@est-normalis/simple-apollo-logger'

const server = ApolloServer({
    plugins: [apolloLogPlugin()],
})
```

### Extension (deprecated)

```typescript
[...]
import logger from '@est-normalis/simple-apollo-logger'

const server = ApolloServer({
    extensions: [() => new logger()],
    [...]
})
```

Now you will be able to see logs in your console.

### Configuration

Simple-apollo-logger is highly customizable. You can pass options to it
when creating it's object.

### Plugin configuration

```typescript
[...]

const opts = {
    logger = customLogger
    logRequests = false
}

[...]
    plugins: [apolloLogPlugin(opts)],
[...]
```

### Extension configuration

```typescript
[...]

const opts = {
    logger = customLogger
    logRequests = false
}

[...]
    extensions: [() => new logger(opts)],
[...]
```

The options object will be merged with default settings and used by logger.

### Aviable options

Types of all options are aviable for typescript users via UserOptions interface.

#### logger

logger is a function which is called with a parameter containing prepared strings with data.

#### logRequests

logRequests enables request logging.

#### logResponses

logResponses enables respons logging.

#### prefix

prefix is a method executed before every log, which by default returns timestamp.

#### variableFilter

variableFilter in a settings object for filtering GraphQL variables content before logging it.
It is using recursive search inside object to find even nested variables with matching name.

##### Filter usage

It is the default filter included in this extension:

```typescript
variableFilter: {
        keywords: ["password"],
        replacementText: "[FILTERED]"
}
```

You can replace it with `false` value if you want to disable it.

#### ignoreSchemaRequest

ignoreSchemaRequest allows you to ignore requests with name "IntrospectionQuery"
which are usually requests fetching schema file.

**Warning:** you should not use this option in production since you can't be sure
if query with this name is really fetching the schema.

### Updating

#### 0.2.x to 0.3.x

##### Logger

logger is no longer an object responding to .log method,
so if you are using custom logger object you need to replace
it with custom logger method.

Example:

0.2.x:

```typescript
const opts = {
  logger: customLogger // customLogger has .log() method
}
```

0.3.x:

```typescript
const opts = {
  logger: msg => customLogger.log(msg)
}
```

If you were not using custom logger this update should not make any major changes.

#### 0.3.x to 0.4.x

This update should not result in major changes except for not logging headers anymore [reson](https://github.com/est-normalis/simple-apollo-logger/pull/18).
In this update TypeScript type definitions were also added (they replaced `any` type in `requestDidStart` function), but it should not
change way of how is the logger working.

##### Prefix

Default prefix was changed from:

```typescript
;`[${Date.now()}]`
```

to:

```typescript
;`[${Date.now()}] `
```

Output from logger with default options should remain the same,
however space between prefix and message was moved from concatenation
of these strings to prefix itself.

#### 0.4.x to 0.5.x

Version 0.5 introduces usage of new [plugin API](https://www.apollographql.com/docs/apollo-server/integrations/plugins/).
Using plugin instead of extension is highly recommended, but not obligatory.

To use new plugin API change delete your logging extension from server initialization:

```typescript
const server = ApolloServer({
    extensions: [() => new logger()], // remove this line
    [...]
})
```

Change default import to `apolloLogPlugin` named import:

before:

```typescript
import logger from '@est-normalis/simple-apollo-logger'
```

after

```typescript
import { apolloLogPlugin } from '@est-normalis/simple-apollo-logger'
```

and use it in server initialization

```typescript
const server = ApolloServer({
    plugins: [apolloLogPlugin()],
    [...]
})
```

Possible configuration options are not changed from version 0.4.
