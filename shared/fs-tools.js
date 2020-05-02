const path = require('path')
const fs = require('fs-extra')

const safeMkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true})
  }
}

const safeLink = (source, target) => {
  if (fs.existsSync(target)) {
    fs.removeSync(target)
  }
  fs.symlinkSync(source, target)
}

const onExit = (fn) => {
  // handle onexit
}

const linkPkg = (pkgs, prefix = '') => {
  const safePath = (...p) => path.join(...[...p].filter(i => i))

  safeMkdir(path.resolve('node_modules'))
  safeMkdir(path.resolve('node_modules', '.cache'))
  
  if (prefix) {
    safeMkdir(path.resolve('node_modules', prefix))
  }
  
  for (const pkg of pkgs) {
    const srcPath = safePath('..', 'node_modules', prefix, pkg)
    const destPath = safePath('node_modules', prefix, pkg)
    const src = path.resolve(__dirname, srcPath)
    const dest = path.resolve(process.cwd(), destPath)
    safeLink(src, dest)
  }
}

module.exports = {
  safeLink,
  safeMkdir,
  onExit,
  linkPkg,
}
