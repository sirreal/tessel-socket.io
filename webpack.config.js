module.exports = {
  entry: './src/client.js',
  output: {
    path: __dirname + '/dist',
    filename: 'client.js',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /src/,
        loader: 'babel-loader',
      },
    ],
  },
}
