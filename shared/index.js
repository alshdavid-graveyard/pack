module.exports = {
  ...require('./fs-tools'),
  ...require('./strings'),
}

module.exports.getArgs = () => {
  const args = [ ...process.argv ]
  args.shift()
  args.shift()
  args.shift()
  return args
}