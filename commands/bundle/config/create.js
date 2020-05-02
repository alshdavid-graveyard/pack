const path = require('path')
const options = require('./options')
const { createEnvironment } = require('./environment')
const { createTSLoader, createTsPathsPlugin } = require('./ts-loaders')
const { miniCssExtractPlugin, styleLoaders } = require('./style-loader')
const { loadHtmlFiles } = require('./html')
const { getAssetsPlugin } = require('./assets')
const WorkerPlugin = require('worker-plugin')

const create = ({
  env,
  input = './',
  out,
  prod,
  legacy,
  tsConfig,
  stats,
}) => {
  const inputDir = options.getInputDir(input)
  return {
    entry: options.getEntry(inputDir, legacy),
    mode: options.getMode(prod),
    output: {
      filename: options.getOutFile(legacy),
      path: options.getOutDir(out)
    },
    module: {
      rules: [
        ...styleLoaders,
        ...createTSLoader(
          options.getMode(prod), 
          options.getTsConfig(tsConfig), 
          legacy
        )
      ]
    },
    plugins: [
      new WorkerPlugin(),
      ...getAssetsPlugin(inputDir),
      ...loadHtmlFiles(input),
      miniCssExtractPlugin,
      ...options.getStats(stats),
      createEnvironment(env),
    ],
    resolve: {
      plugins: [
        ...createTsPathsPlugin(tsConfig),
      ],
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    }
  }
}

module.exports = {
  create
}