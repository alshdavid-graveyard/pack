const argv = require('yargs').argv

if (typeof argv.env === 'string') {
  const env = argv.env
  argv.env = [env]
}

const args = {
  stats: argv.stats,
  env: argv.env || [],
  input: argv.in,
  out: argv.out,
  prod: argv.prod,
  legacy: argv.legacy,
  tsConfig: argv['ts-config']
}

module.exports = require('./config/create').create(args)
