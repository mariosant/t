const { prop, is } = require('ramda');
const expect = require('unexpected');
const delay = require('delay');
const promisify = require('./promisify');

const hasThen = prop('then');

const fn = promisify(() => true);
const asyncFn = promisify(async () => true);

module.exports = async () => {
	expect(hasThen(fn()), 'to be truthy');
	expect(hasThen(asyncFn()), 'to be truthy');
};
