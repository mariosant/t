const expect = require('unexpected');
const report = require('./report');
const delay = require('delay')
const mock = () => true;

const mockReporter = cb =>
	new Proxy(
		{},
		{
			get: (obj, property) => () => cb(property),
		},
	);

module.exports = async () => {
	const fn = report(async () => true);
	expect(() => fn({ reporter: mockReporter(mock) }), 'to be fulfilled');
};
