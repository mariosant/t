const { compose } = require('ramda');

module.exports = compose(
		require('./worker-enhancers/fail-fast'),
		require('./worker-enhancers/callbacks'),
		require('./worker-enhancers/timeout'),
		require('./worker-enhancers/report'),
	);
