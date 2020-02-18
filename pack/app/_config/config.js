const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { plugins, mode, entry, outDir, outFile } = require('./config/options')
const { loaders } = require('./config/loaders')
const { defaults } = require('./config/constants')
const { definePlugin } = require('./config/environment')

module.exports = {
  entry,
  mode,
  output: {
    filename: outFile,
    path: outDir
  },
  module: {
    rules: [
      ...loaders
    ]
  },
  plugins: [
    definePlugin,
    new MiniCssExtractPlugin({ 
      filename: path.join(defaults.styleName) 
    }),
    ...plugins
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
}
