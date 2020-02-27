const path = require('path')
const { execSync } = require('child_process');
const { safeMkdir, safeLink, getArgs } = require('../../shared')

const srcPaths = {
  webpack: path.resolve(__dirname, '../../node_modules/webpack'),
  webpackCli: path.resolve(__dirname, '../../node_modules/webpack-cli'),
  webpackCliBin: path.resolve(__dirname, '../../node_modules/.bin/webpack'),
}

const destPaths = {
  webpack: path.resolve(process.cwd(), './node_modules/webpack'),
  webpackCli: path.resolve(process.cwd(), './node_modules/webpack-cli'),
  webpackCliBin: path.resolve(process.cwd(), './node_modules/.bin/webpack'),
}

safeMkdir(path.resolve('node_modules'))
safeMkdir(path.resolve('node_modules', '.bin'))

safeLink(srcPaths.webpack, destPaths.webpack)
safeLink(srcPaths.webpackCli, destPaths.webpackCli)
safeLink(srcPaths.webpackCliBin, destPaths.webpackCliBin)

execSync(`
  npx webpack \
    --config ${__dirname}/create-config.js \
    ${getArgs().join(' ')}`, 
    {stdio:'inherit'}
);

