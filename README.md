# @est-normalis/simple-apollo-logger

[![npm version](https://badge.fury.io/js/%40est-normalis%2Fsimple-apollo-logger.svg)](https://www.npmjs.com/package/@est-normalis/simple-apollo-logger)

A very simple logger for Apollo Server

**Warning** simple-apollo-logger is in alpha version.

## Installation

### yarn

``` bash
yarn add @est-normalis/simple-apollo-logger
```

### npm

``` bash
npm i @est-normalis/simple-apollo-logger
```

## Usage

To use this package you need to add extension to your ApolloServer

``` typescript
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

``` typescript
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

logger is an object which is called by log method with prepared strings with data.

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

``` typescript
variableFilter: {
        keywords: ["password"],
        replacementText: "[FILTERED]"
}
```

You can replace it with `false` value if you want to disable it.
