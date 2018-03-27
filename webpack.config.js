module.exports = {
  entry: ['whatwg-fetch', './index.js'],
  output: {
    filename: './script.js',
    path: __dirname
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
