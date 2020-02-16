const { mode, tsConfigPath } = require('./options')
const { modes } = require('./constants')
const { args } = require('./args')

const loader = {
  cssExtract: require('mini-css-extract-plugin').loader,
  typeScript: require.resolve('ts-loader'),
  babel: require.resolve('babel-loader'),
  css: require.resolve('css-loader'),
  linaria: require.resolve('linaria/loader'),
  sass: require.resolve('sass-loader'),
}

const babelPresets = {
  env: require.resolve("@babel/preset-env")
}

const linariaLoaderConfig = {
  loader: loader.linaria,
  options: { sourceMap: mode },
}

const typeScriptLoaderConfig = {
  loader: loader.typeScript,
  options: {
    configFile: tsConfigPath,
  }
}

const styleLoaders = [
  {
    test: /\.css$/,
    use: [
      {
        loader: loader.cssExtract,
        options: {
          hmr: process.env.NODE_ENV !== 'production',
        },
      },
      {
        loader: loader.css,
      },
    ],
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      {
        loader: loader.cssExtract,
        options: {
          hmr: process.env.NODE_ENV !== 'production',
        },
      },
      loader.css,
      loader.sass,
    ],
  },
]

const devLoaders = [
  ...styleLoaders,
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      typeScriptLoaderConfig,
      linariaLoaderConfig
    ]
  }
]

const babelLoaderConfig = {
  loader: loader.babel,
  options: {
    presets: [[babelPresets.env, {
      modules: false,
      targets: { esmodules: true }
    }]],
  }
}

if (args.legacy) {
  babelLoaderConfig.options.presets[0][1].targets = { ie: 11 }
}

const prodLoaders = [
  ...styleLoaders,
  {
    test: /\.js$/,
    exclude: [
      /node_modules\/core-js/,
      /node_modules\/regenerator-runtime/,
    ],
    use: [
      loader.babel,
      loader.linaria
    ]
  },
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      babelLoaderConfig,
      typeScriptLoaderConfig,
      linariaLoaderConfig
    ]
  }
]

if (mode === modes.prod) {
  module.exports.loaders = prodLoaders
} else {
  module.exports.loaders = devLoaders
}