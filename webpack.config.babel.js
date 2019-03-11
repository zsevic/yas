import path from 'path'

export default {
  entry: ['whatwg-fetch', './src/index.js'],

  output: {
    filename: './bundle.js',
    path: path.join(__dirname, 'src'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  mode: 'production',

  node: {
    fs: 'empty',
  },
}
