const DefinePlugin = require('webpack').DefinePlugin

const parseEnvs = (envs) => {
  const env = {}
  for (const arg of envs) {
    const [ key, value ] = arg.split('=')
    env[key] = value || process.env[key]
  }
  return env
}

const createEnvironment = (envs) => {
  const env = parseEnvs(envs)
  const definePlugin = new DefinePlugin({
    '__environment': JSON.stringify(env)
  })
  return definePlugin
}

module.exports = {
  createEnvironment
}