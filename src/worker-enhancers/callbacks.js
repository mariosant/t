const { ifElse } = require('ramda');

const pass = () => Promise.resolve();

const fail = reason => Promise.reject(reason);

const done = ifElse(args => args, fail, pass);

module.exports = handler => (context = {}) =>
	handler({
		...context,
		pass,
		fail,
		done,
	});
