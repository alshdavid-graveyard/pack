const path = require('path')

const srcPaths = {
  rollup: path.resolve(__dirname, '../node_modules/rollup'),
  typescript: path.resolve(__dirname, '../node_modules/typescript'),
  ttypescript: path.resolve(__dirname, '../node_modules/ttypescript'),
  typescriptTransformPaths: path.resolve(__dirname, '../node_modules/typescript-transform-paths'),
  tsc: path.resolve(__dirname, '../node_modules/.bin/tsc'),
  ttsc: path.resolve(__dirname, '../node_modules/.bin/ttsc'),
}

const destPaths = {
  typescript: path.resolve(process.cwd(), './node_modules/typescript'),
  typescriptTransformPaths: path.resolve(process.cwd(), './node_modules/typescript-transform-paths'),
  tsc: path.resolve(process.cwd(), './node_modules/.bin/tsc'),
  ttypescript: path.resolve(process.cwd(), './node_modules/ttypescript'),
  ttsc: path.resolve(process.cwd(), './node_modules/.bin/ttsc'),
}

console.log('make lib')