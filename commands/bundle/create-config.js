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

if (args.legacy) {
  module.exports = [
    require('./config/create').create({ ...args, legacy: false }), 
    require('./config/create').create({ ...args, legacy: true }), 
  ]
} else {
  module.exports = [
    require('./config/create').create({ ...args, legacy: false }), 
  ]
}
