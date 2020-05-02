const argv = require('yargs').argv
const path = require('path')
const fs = require('fs-extra')

const webAssets = path.join(__dirname, 'assets', 'web')
let output = process.cwd()

const outArg = argv['out']
if (outArg && outArg[0] === '/') {
  output = outArg
} else if (outArg) {
  output = path.join(process.cwd(), argv['out'])
}

fs.copySync(webAssets, output, {
  recursive: true,
  overwrite: false
})