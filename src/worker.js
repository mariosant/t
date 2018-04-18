const { compose } = require('ramda');

module.exports = context =>
	compose(
		handler => handler(context),
		require('./worker-enhancers/callbacks'),
		require('./worker-enhancers/timeout'),
	);
