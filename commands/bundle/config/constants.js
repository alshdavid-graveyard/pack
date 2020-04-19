const defaults = {
  cwd: process.cwd(),
  inName: 'index.ts',
  inName2: 'main.ts',
  inNameTsx: 'main.tsx',
  inLegacyName: 'nomodule.ts',
  outName: 'index.js',
  tsconfigName: 'tsconfig.json',
  styleName: 'style.css',
  assetsName: 'assets',
}

const modes = {
  prod: 'production',
  dev: 'development',
}

module.exports = {
  defaults,
  modes,
}