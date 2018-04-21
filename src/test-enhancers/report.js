const { dec, ifElse } = require('ramda');

const tapReporter = ({
	suiteStarted: context => console.log(`0..${context.totalTests}`),
	suiteEnded: context => null,
	testStarted: context => true,
	testPassed: context => console.log(`ok ${context.index} - ${context.description}`),
	testFailed: (context, err) => {
		console.log(`not ok ${context.index} - ${context.description}`);
		console.log(err.message);
		throw err;
	},
});

module.exports = handler => context => {
	const { suiteStarted, suiteEnded, testStarted, testPassed, testFailed } =
	context.reporter || tapReporter;

	if (context.index === 0) {
		suiteStarted(context);
	}

	if (context.index === dec(context.totalTests)) {
		suiteEnded(context);
	}

	testStarted(context)

	return handler(context)
		.then(() => testPassed(context))
		.catch(err => testFailed(context, err));
};
