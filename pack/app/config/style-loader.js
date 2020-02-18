const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path')
const { defaults } = require('./constants')

const loader = {
  cssExtract: require('mini-css-extract-plugin').loader,
  css: require.resolve('css-loader'),
  sass: require.resolve('sass-loader'),
}

const styleLoaders = [
  {
    test: /\.css$/,
    use: [
      {
        loader: loader.cssExtract,
        options: {
          hmr: process.env.NODE_ENV !== 'production',
        },
      },
      {
        loader: loader.css,
      },
    ],
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      {
        loader: loader.cssExtract,
        options: {
          hmr: process.env.NODE_ENV !== 'production',
        },
      },
      loader.css,
      loader.sass,
    ],
  },
]


const miniCssExtractPlugin = new MiniCssExtractPlugin({ 
  filename: path.join(defaults.styleName) 
})

module.exports = {
  miniCssExtractPlugin,
  styleLoaders
}