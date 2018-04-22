# t
[![npm version](https://badge.fury.io/js/%40mariosant%2Ft.svg)](https://badge.fury.io/js/%40mariosant%2Ft) [![Build Status](https://travis-ci.org/mariosant/t.svg?branch=master)](https://travis-ci.org/mariosant/t)

A simple minimal test runner, that embraces a functional testing approach.

## Installation

Install it to your project with:

```
$ npm i @mariosant/t
```

You can then execute it like:

```
$ npx t
```

## Usage

t focuses on minimality. Tests are files that export a function. Here is a sample one

``` javascript
// let's call this file index.test.js
const {equal} = require('bring-your-assertion-library')
const someModule = require('./some-module')

module.exports = () => equal(someModule.color, 'red')
```

If you need async:

``` javascript
const {equal} = require('bring-your-assertion-library')
const someModule = require('./some-module')

module.exports = async () => {
	const color = await someModule.fetchAsyncColor()
	equal(color, 'red')
}
```
