#! /usr/bin/env node

const path = require('path');
const { addIndex, map } = require('ramda');
const globby = require('globby');
const args = require('commander');
const t = require('.');

const mapIndexed = addIndex(map);

args
	.version(require('../package.json').version)
	.option('--exclude <glob>', 'Specify which files should be excluded', 'node_modules/**/*')
	.option('--no-fail-fast', 'Do not stop testing after first fail')
	.option('-C, --concurrency <n>', 'Specify concurrency [4]', parseInt, 4)
	.option('-T, --timeout <ms>', 'Specify timeout [5000]', parseInt, 5000)
	.option(
		'-F, --files [glob]',
		'Which files contain tests [**/*.test.js]',
		'**/*.test.js',
	)
	.parse(process.argv);

const testFilenames = globby.sync([
	args.files,
	`!node_modules/**`,
	`!${args.exclude}`,
])

const tests = mapIndexed(
	(filename, i) => [
		require(path.resolve(process.cwd(), filename)),
		{
			concurrency: args.concurrency,
			failFast: args.failFast,
			timeout: args.timeout,
			description: filename,
			totalTests: testFilenames.length,
			index: i,
		},
	],
	testFilenames,
);

t(tests);
