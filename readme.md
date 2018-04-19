# t

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

t focuses on minimality. Tests are files that export a function, most dependancies as arguments within. Here is a sample one

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

Or callbacks:

``` javascript
const {equal} = require('bring-your-assertion-library')
const someModule = require('./some-module')

module.exports = async ({done}) => someModule.doSomethingAsync(done)
```

or even:

``` javascript
const {equal} = require('bring-your-assertion-library')
const someModule = require('./some-module')

module.exports = async ({pass, fail}) => {
	if (someModule.isGood()) {
		pass()
	} else {
		fail('that is no good')
	}
}
```
