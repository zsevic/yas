module.exports = {
  entry: ['whatwg-fetch', './index.js'],
  output: {
    filename: './script.js'
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
