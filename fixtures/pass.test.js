const delay = require('delay');

module.exports = async _ => {
	console.log('Got in');
	await delay(1000);
	console.log('Going out');
};
