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

if (typeof argv.ignorePath === 'undefined') {
  argv.ignorePath = []
}

if (typeof argv.ignorePath === 'string') {
  const ext = argv.ignorePath
  argv.ignorePath = [ext]
}

let ignorePaths = ''
for (const ext of argv.ignorePath) {
  ignorePaths += `--config-ignore-path ${ext} `
}

execSync(`
  npx rollup \
    --config ${__dirname}/config.js \
    --config-in ${argv.in} \
    --config-out ${argv.out} \
    ${ignorePaths}
     `, 
    {stdio:'inherit'}
);