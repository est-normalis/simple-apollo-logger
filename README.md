# @est-normalis/simple-apollo-logger

[![npm version](https://badge.fury.io/js/%40est-normalis%2Fsimple-apollo-logger.svg)](https://badge.fury.io/js/%40est-normalis%2Fsimple-apollo-logger)

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
