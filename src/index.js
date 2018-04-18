const { map, mergeDeepRight } = require('ramda');
const PromisePool = require('es6-promise-pool');
const run = require('./worker');

const mergeWithDefaults = mergeDeepRight({
	timeout: 5000,
	failFast: true,
	concurrency: 4,
	session: {},
});

module.exports = (params, tests) => {
	const options = mergeWithDefaults(params);
	const promises = map(test => run(options)(test), [...tests]);

	return new PromisePool(promises, options.concurrency).start();
};
