const path = require('path')
const { modes, defaults } = require('./constants')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const loader = {
  typeScript: require.resolve('ts-loader'),
  babel: require.resolve('babel-loader'),
}

const babelPresets = {
  env: require.resolve("@babel/preset-env")
}

const typeScriptLoaderConfig = {
  loader: loader.typeScript,
  options: {
    configFile: '',
  }
}

const babelLoaderConfig = {
  loader: loader.babel,
  options: {
    presets: [[babelPresets.env, {
      modules: false,
      targets: { esmodules: true }
    }]],
  }
}

const devLoaders = [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      typeScriptLoaderConfig,
    ]
  }
]

const prodLoaders = [
  {
    test: /\.js$/,
    exclude: [
      /node_modules\/core-js/,
      /node_modules\/regenerator-runtime/,
    ],
    use: [
      loader.babel,
    ]
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      babelLoaderConfig,
      typeScriptLoaderConfig,
    ]
  }
]

const createTsPathsPlugin = (configFile = defaults.tsconfigName) => {
  const config = require(path.join(defaults.cwd, configFile))
  if (!config.compilerOptions.baseUrl) {
    return []
  }
  return [new TsconfigPathsPlugin({ configFile })]
}

const createTSLoader = (
  mode = modes.dev, 
  tsConfigPath = defaults.tsconfigName, 
  legacy = false
) => {
  typeScriptLoaderConfig.options.configFile = tsConfigPath
  if (mode === modes.dev) {
    return devLoaders
  }
  if (legacy) {
    babelLoaderConfig.options.presets[0][1].targets = { ie: 11 }
  }
  return prodLoaders
}

module.exports = {
  createTSLoader,
  createTsPathsPlugin
}