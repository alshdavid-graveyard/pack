const { args } = require('./args')
const DefinePlugin = require('webpack').DefinePlugin

const definePlugin = new DefinePlugin({
  '__environment': JSON.stringify(args.env)
})

module.exports = {
  definePlugin
}