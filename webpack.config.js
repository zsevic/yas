const path = require('path')

module.exports = {
  entry: ['whatwg-fetch', './src/index.js'],
  output: {
    filename: './script.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  mode: 'production'
}
