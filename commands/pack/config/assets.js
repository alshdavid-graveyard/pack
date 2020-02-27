const path = require('path')
const fs = require('fs-extra')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { defaults } = require('./constants')


const getAssetsPlugin = (inputDir = defaults.cwd) => {
  const assetsPath = path.join(inputDir, defaults.assetsName)
  if (!fs.existsSync(assetsPath)) {
    return []
  }
  const plugin = new CopyWebpackPlugin([
    { 
      from: assetsPath,
      to: defaults.assetsName
    }
  ])
  return [plugin]
}

module.exports = {
  getAssetsPlugin
}