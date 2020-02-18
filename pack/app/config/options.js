const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { args } = require('./args')
const { modes, defaults } = require('./constants')

const getStats = (plugins, stats) => {
  if (stats) {
    plugins.push(new BundleAnalyzerPlugin())
  }
}

const getMode = () => {
  let mode = modes.dev
  if (args.prod) {
    mode = modes.prod
    process.env.NODE_ENV = modes.prod
  }
}

const getInputDir = (input) => {
  let inputDir = defaults.cwd
  if (input) {
    inputDir = path.join(defaults.cwd, input)
  }
  return inputDir
}


const getEntry = (inputDir, legacy = false, inName = defaults.inName) => {
  let entry = [path.join(inputDir, inName)]
  if (args.legacy) {
    entry.unshift(path.join(inputDir, defaults.inLegacyName))
  }
  return entry
}

const getOutDir = (out) => {
  let outDir = defaults.cwd
  if (out) {
    outDir = path.join(defaults.cwd, out)
  }
  return outDir
}

const getOutFile = (legacy = false) => {
  let outFile = 'index.js'
  if (legacy) {
    outFile = 'index.nomodule.js'
  }
  return outFile
}

const getTsConfig = (tsConfig) => {
  const userTsConfig = path.join(defaults.cwd, defaults.tsconfigName)
  let tsConfigPath = userTsConfig 
  if (args.tsConfig) {
    tsConfigPath = path.join(defaults.cwd, tsConfig || defaults.tsconfigName)
  }
  return tsConfigPath
}

module.exports = {
  getStats,
  getMode,
  getInputDir,
  getEntry,
  getOutDir,
  getOutFile,
  getTsConfig
}