const pTimeout = require('p-timeout');

module.exports = handler => async context => {
	const promisified = async () => await handler(context); // eslint-disable-line no-return-await

	return pTimeout(promisified(), context.timeout, '');
};
