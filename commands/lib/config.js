const path = require('path')
const glob = require('glob')
const typescript = require('rollup-plugin-typescript2')

const argv = require('yargs').argv

const getArg = arg => argv[arg] === 'undefined' ? undefined : argv[arg]

if (typeof argv.configExternal === 'string') {
  const ext = argv.configExternal
  argv.configExternal = [ext]
}

if (typeof argv.configExternal === 'undefined') {
  argv.configExternal = []
}

const args = {
  in: getArg('configIn') || '',
  out: getArg('configOut') || './',
  external: getArg('configExternal') || [],
}

const input = path.join(args.in, '**', '*.{ts,tsx}')

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
      typescript: require('ttypescript'),
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            { transform: 'typescript-transform-paths' },
            { transform: 'typescript-transform-paths', afterDeclarations: true },
          ]
        }
      }
    })
  ]
}