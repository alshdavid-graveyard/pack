const argv = require('yargs').argv
const { execSync } = require('child_process');
const { linkPkg, getArgs } = require('../../shared')

const bins = [
  'rollup', 
  'tsc', 
  'ttsc'
]

const packages = [
  'rollup', 
  'typescript', 
  'ttypescript', 
  'typescript-transform-paths', 
  'rollup-plugin-typescript2', 
  'rollup-pluginutils',
  'glob'
]

linkPkg(packages)
linkPkg(bins, '.bin')



if (typeof argv.external === 'string') {
  const ext = argv.external
  argv.external = [ext]
}

if (typeof argv.external === 'undefined') {
  argv.external = []
}

let externals = ''
for (const ext of argv.external) {
  externals += `--config-external ${ext} `
}
console.log(externals)


execSync(`
  npx rollup \
    --config ${__dirname}/config.js \
    --config-in ${argv.in} \
    --config-out ${argv.out} \
    ${externals}
     `, 
    {stdio:'inherit'}
);