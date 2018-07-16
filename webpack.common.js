const path = require("path");


module.exports = {
  entry: [
    './src/app/index.js'
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./bundle.js",
    publicPath: '/'
  },
  resolve: {
    alias: {
      '../../theme.config$': path.join(__dirname, 'semantic-theme/theme.config')
    },
    extensions: ['*', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(txt|md)$/,
        use: 'raw-loader'
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      }
    ]
  }
};