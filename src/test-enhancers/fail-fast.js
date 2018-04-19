module.exports = handler => context => {
	const {failFast} = context

	return failFast
		? handler(context)
		: handler(context).catch(() => undefined)
}
