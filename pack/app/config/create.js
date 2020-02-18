const create = ({
  env,
  input,
  out,
  prod,
  legacy,
  tsConfig,
}) => {
  

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