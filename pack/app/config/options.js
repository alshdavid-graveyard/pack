const path = require('path')
const fs = require('fs-extra')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { modes, defaults } = require('./constants')

const getStats = (stats) => {
  if (stats) {
    return [new BundleAnalyzerPlugin()]
  }
  return []
}

const getMode = (prod) => {
  let mode = modes.dev
  if (prod) {
    mode = modes.prod
    process.env.NODE_ENV = modes.prod
  }
  return mode
}

const getInputDir = (input) => {
  let inputDir = defaults.cwd
  if (input) {
    inputDir = path.join(defaults.cwd, input)
  }
  return inputDir
}


const getEntry = (inputDir = defaults.cwd, legacy = false) => {
  let mainFile = path.join(inputDir, defaults.inNameTsx)
  if (!fs.existsSync(mainFile)) {
    mainFile = path.join(inputDir, defaults.inName)
  }
  if (!fs.existsSync(mainFile)) {
    console.error('No main.ts / main.tsx file')
    process.exit(1)
  }
  const entry = [mainFile]
  if (legacy && fs.existsSync(path.join(inputDir, defaults.inLegacyName))) {
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

const getTsConfig = (tsConfig = defaults.tsconfigName) => {
  let tsConfigPath = path.join(defaults.cwd, tsConfig)
  if (!fs.existsSync(tsConfigPath)) {
    tsConfigPath = path.join(defaults.cwd, defaults.tsconfigName)
  } else if (!fs.existsSync(tsConfigPath)) {
    console.error('No tsconfig.json found')
    process.exit(1)
  }
  if (tsConfig) {
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