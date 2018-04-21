const expect = require('unexpected');
const report = require('./report');

const mock = () => true;

const mockReporter = cb =>
	new Proxy(
		{},
		{
			get: (obj, property) => () => cb(property),
		},
	);

module.exports = () => {
	const fn = report(async () => true);
	expect(() => fn({ reporter: mockReporter(mock) }), 'to be fulfilled');
};
