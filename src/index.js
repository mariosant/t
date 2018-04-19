const { map, mergeDeepRight } = require('ramda');
const PromisePool = require('es6-promise-pool');
const enhance = require('./worker');

const mergeWithDefaults = mergeDeepRight({
	timeout: 5000,
	failFast: true,
	concurrency: 4,
	session: {},
});

module.exports = testFns => {
	const workerIterator = ([test, params]) => {
		const opts = mergeWithDefaults(params)
		return enhance(test)(opts)
	}

	const concurrency = testFns[0][1].concurrency

	return Promise.all(map(workerIterator, testFns))
		.catch(() => process.exit(127))
};
