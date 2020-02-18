const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { args } = require('./args')
const { modes, defaults } = require('./constants')

const plugins = []

// Stats
if (args.stats) {
  plugins.push(new BundleAnalyzerPlugin())
}

// Mode
let mode = modes.dev
if (args.prod) {
  mode = modes.prod
  process.env.NODE_ENV = modes.prod
}

// Input Directory, use cwd as default
let inputDir = defaults.cwd
if (args.in) {
  inputDir = path.join(defaults.cwd, args.in)
}

// Input Files
let entry = [path.join(inputDir, defaults.inName)]
if (args.legacy) {
  entry.unshift(path.join(inputDir, defaults.inLegacyName))
}

// Output files
let outDir = defaults.cwd
if (args.out) {
  outDir = path.join(defaults.cwd, args.out)
}

let outFile = 'index.js'
if (args.legacy) {
  outFile = 'index.nomodule.js'
}

// TSConfig Location
const userTsConfig = path.join(defaults.cwd, defaults.tsconfigName)
let tsConfigPath = userTsConfig 
if (args.tsConfig) {
  tsConfigPath = path.join(defaults.cwd, args.tsConfig || defaults.tsconfigName)
}

module.exports = {
  plugins,
  mode,
  inputDir,
  entry,
  outDir,
  tsConfigPath,
  outFile
}