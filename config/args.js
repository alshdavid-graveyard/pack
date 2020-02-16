const hasArg = arg => process.argv.includes(`--${arg}`)

const extractValue = (target, defaultValue = '') => {
  const arg = process.argv.find(arg => arg.includes(`--${target}=`))
  if (!arg) {
    return defaultValue
  }
  return arg.replace(`--${target}=`, '')
}

const args = {
  prod: hasArg('prod'),
  legacy: hasArg('legacy'),
  clean: hasArg('clean'),
  in: extractValue('in'),
  out: extractValue('out'),
  tsConfig: extractValue('ts-config'),
  env: {}
}

let envPending = false
for (const arg of Object.values(process.argv)) {
  if (envPending === true) {
    envPending = false
    const [ key, value ] = arg.split('=')
    args.env[key] = value || process.env[key]
  }
  if (arg === '--env') {
    envPending = true
  }
}

module.exports = {
  args
}