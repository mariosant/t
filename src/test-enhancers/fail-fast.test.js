const expect = require('unexpected')
const failFast = require('./fail-fast')

module.exports = () => {
	const fn = failFast(async () => true)
	const rejectFn = failFast(async () => {
		throw new Error('Testing ability to throw')
	})

	expect(() => fn({failFast: false}), 'to be fulfilled')
	expect(() => rejectFn({failFast: false}), 'to be fulfilled')
	expect(() => rejectFn({failFast: true}), 'to be rejected')
}
