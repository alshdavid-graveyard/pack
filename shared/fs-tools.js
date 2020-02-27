const fs = require('fs-extra')

const safeMkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true})
  }
}

const safeLink = (source, target) => {
  if (!fs.existsSync(target)) {
    fs.symlinkSync(source, target)
  }
}

const onExit = (fn) => {
  // process.stdin.resume();

  function exitHandler(options, exitCode) {
      if (options.cleanup) {
        fn()
      };
      if (options.exit) {
        process.exit();
      }
  }

  process.on('exit', exitHandler.bind(null,{cleanup:true}));
  process.on('SIGINT', exitHandler.bind(null, {exit:true}));
  process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
  process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));
  process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
}

module.exports = {
  safeLink,
  safeMkdir,
  onExit,
}
