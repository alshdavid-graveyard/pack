const defaults = {
  cwd: process.cwd(),
  inName: 'main.ts',
  inLegacyName: 'nomodule.ts',
  outName: 'index.js',
  tsconfigName: 'tsconfig.json',
  styleName: 'style.css'
}

const modes = {
  prod: 'production',
  dev: 'development',
}

module.exports = {
  defaults,
  modes,
}