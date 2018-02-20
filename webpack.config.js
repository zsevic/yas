module.exports = {
  entry: ['whatwg-fetch', './index.js'],
  output: {
    filename: './script.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
