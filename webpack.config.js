const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const ReactToHtmlPlugin = require('react-to-html-webpack-plugin')

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
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },

    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    // new ReactToHtmlPlugin('index.html', 'index.js', {
    //   static: true,
    //   template: ejs.compile(fs.readFileSync(__dirname + '/src/template.ejs', 'utf-8'))
    // }),
  ],
  postcss: [
    require('autoprefixer'),
  ],
}
