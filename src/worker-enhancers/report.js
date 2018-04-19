const pSeries = require('p-series')
const {ifElse} = require('ramda')

const tapReporter = context => ({
	suiteStarted: () => {
		console.log(`0..${context.totalTests - 1}`)
	},
	suiteEnded: () => undefined,
	testStarted: () => undefined,
	testPassed: () => console.log(`ok ${context.index} - ${context.description}`),
	testFailed: err => {
		console.log(`not ok ${context.index} - ${context.description}`);
		console.log(err);
		throw err
	},
})

module.exports = handler => async context => {
	const {suiteStarted, suiteEnded, testStarted, testPassed, testFailed} = tapReporter(context)

	if (context.index === 0) {
		suiteStarted()
	}

	testStarted()
	return handler(context)
		.then(testPassed)
		.catch(testFailed)
}
