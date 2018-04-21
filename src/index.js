const { compose, head, last, pathOr, map, mergeDeepRight } = require('ramda');
const pAll = require('p-all');

const enhance = compose(
	require('./test-enhancers/fail-fast'),
	require('./test-enhancers/report'),
	require('./test-enhancers/promisify'),
);

const mergeWithDefaults = mergeDeepRight({
	timeout: 5000,
	failFast: true,
	concurrency: 4,
});

module.exports = async testFns => {
	const workerIterator = ([test, params]) => {
		const opts = mergeWithDefaults(params);
		const enhancedTest = enhance(test);

		return enhancedTest(opts);
	};

	const { concurrency } = last(head(testFns) || []) || 4;

	await pAll(map(workerIterator, testFns), { concurrency }).catch(err => {
		console.error(err.message);
		process.exit(1);
	});
};
