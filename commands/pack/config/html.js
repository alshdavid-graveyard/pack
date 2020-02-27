const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const path = require('path')
const { defaults } = require('./constants')

function fromDir(startPath, filter) {
  const filepaths = []

  if (!fs.existsSync(startPath)) {
    return filepaths
  }

  var files = fs.readdirSync(startPath);

  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      filepaths.push(...fromDir(filename, filter)); //recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      filepaths.push(filename)
    };
  };

  return filepaths
};

const loadHtmlFiles = (input = defaults.cwd) => {
  const files = fromDir(input, '.html')
  const plugins = []

  for (const file of files) {
    plugins.push(new HtmlWebpackPlugin({
      filename: path.basename(file) ,
      template: file,
      inject: false
    }))
  }

  return plugins
}

module.exports = {
  loadHtmlFiles
}