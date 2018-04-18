#! /usr/bin/env node

const path = require('path');
const { map } = require('ramda');
const glob = require('glob-fs')({ gitIgnore: true });
const args = require('commander');
const t = require('.');

args
	.version('0.0.1')
	.option('-C, --concurrency <n>', 'Specify concurrency [4]', parseInt, 4)
	.option('-T, --timeout <ms>', 'Specify timeout [5000]', parseInt, 5000)
	.option(
		'-F, --files [glob]',
		'Which files contain tests [**/*.test.js]',
		'**/*.test.js',
	)
	.parse(process.argv);

const tests = map(
	f => require(path.resolve(process.cwd(), f)),
	glob.readdirSync(args.files),
);

t(
	{
		concurrency: args.concurrency,
		failFast: args.failFast,
		timeout: args.timeout,
	},
	tests,
);
