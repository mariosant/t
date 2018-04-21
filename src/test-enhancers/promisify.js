const {ifElse, prop} = require('ramda')

module.exports = handler => async context => await handler(context)
