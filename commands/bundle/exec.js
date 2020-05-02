const { execSync } = require('child_process');
const { linkPkg, getArgs } = require('../../shared')
const argv = require('yargs').argv
const tmp = require('tmp')
const fs = require('fs-extra')
const options = require('./config/options')

const bins = [
  'webpack', 
]

const packages = [
  'webpack', 
  'webpack-cli',
]

const args = getArgs()

linkPkg(packages)
linkPkg(bins, '.bin')

if (!fs.existsSync(options.getTsConfig(argv['ts-config']))) {
  console.error('No tsconfig.json found')
  process.exit(1)
}

if (argv['stats'] === true || argv['serve'] === true) {
  tmp.setGracefulCleanup();
  const outDir = tmp.dirSync()
  for (const i in args) {
    if (args[i] === '--out') {
      args.splice(i, 1)
      args.splice(i, 1)
    }
  }
  args.push('--out')
  args.push(outDir.name)
}

if (argv['serve'] === true) {
  console.log('Serving on ' + (argv['port'] || 8080))
  execSync(`
    npx concurrently -p none --kill-others \
      "npx http-server -s -c=-1 -p ${argv['port'] || 8080} ${outDir.name}" \
      "npx webpack --config ${__dirname}/create-config.js --watch ${args.join(' ')}"
  `, 
  {stdio:'inherit'})
} else {
  execSync(`
    npx webpack \
      --config ${__dirname}/create-config.js \
      ${args.join(' ')}`, 
      {stdio:'inherit'}
  );
}


