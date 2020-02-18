const create = ({
  env,
  input,
  out,
  prod,
  legacy,
  tsConfig,
}) => {
  // Mode
  let mode = modes.dev
  if (prod) {
    mode = modes.prod
    process.env.NODE_ENV = modes.prod
  }

  // Input Directory, use cwd as default
  let inputDir = defaults.cwd
  if (input) {
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

  const config = {
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
}