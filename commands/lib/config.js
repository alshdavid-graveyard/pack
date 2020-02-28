const path = require('path')
const glob = require('glob')
const typescript = require('rollup-plugin-typescript2')

const argv = require('yargs').argv

const getArg = arg => argv[arg] === 'undefined' ? undefined : argv[arg]

if (typeof argv.configIgnorePath === 'string') {
  const ext = argv.configIgnorePath
  argv.configIgnorePath = [ext]
}

if (typeof argv.configIgnorePath === 'undefined') {
  argv.configIgnorePath = []
}

const args = {
  in: getArg('configIn') || '',
  out: getArg('configOut') || './',
  ignorePath: getArg('configIgnorePath') || [],
}

const input = path.join(args.in, '**', '*.{ts,tsx}')

const tsconfig = require(path.join(process.cwd(), 'tsconfig'))

module.exports = {
  input: glob.sync(input),
  preserveModules: true,
  output: {
    format: 'esm',
    dir: args.out,
  },
  external: args.external,
  watch: {
    include: 'src/**'
  },
  plugins:[
    typescript({
      // clean: true,
      verbosity: 3,
      typescript: require('ttypescript'),
      tsconfigDefaults: { compilerOptions: {
        plugins: [
          { transform: 'typescript-transform-paths' },
          { transform: 'typescript-transform-paths', afterDeclarations: true },
        ]
      }}
    })
  ]
}