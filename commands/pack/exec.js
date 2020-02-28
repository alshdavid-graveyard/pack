const { execSync } = require('child_process');
const { linkPkg } = require('../../shared')

const bins = [
  'webpack', 
]

const packages = [
  'webpack', 
  'webpack-cli',
]

linkPkg(packages)
linkPkg(bins, '.bin')

execSync(`
  npx webpack \
    --config ${__dirname}/create-config.js \
    ${getArgs().join(' ')}`, 
    {stdio:'inherit'}
);

