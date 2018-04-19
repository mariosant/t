const { compose, map, mergeDeepRight } = require('ramda');
const PromisePool = require('es6-promise-pool');

const enhance = compose(
	require('./test-enhancers/fail-fast'),
	require('./test-enhancers/timeout'),
	require('./test-enhancers/report'),
);

const mergeWithDefaults = mergeDeepRight({
	timeout: 5000,
	failFast: true,
	concurrency: 4,
	session: {},
});

module.exports = testFns => {
	const workerIterator = ([test, params]) => {
		const opts = mergeWithDefaults(params)
		const enhancedTest = enhance(test)
		return enhancedTest(opts)
	}

	const {concurrency} = testFns[0][1]

	return Promise.all(map(workerIterator, testFns))
		.catch(() => process.exit(1))
};
