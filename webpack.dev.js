const common = require('./webpack.common');
const merge = require('webpack-merge');


const dev = {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000, // Defaults to 8080
    proxy: {
      '/json-api': "http://localhost:8090"
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]-[local]'
            }
          }]
      },
      {
        test: /\.(less)$/,
        use: ['style-loader','css-loader', 'less-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]-[local]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]-[local]'
            }
          }]
      }
    ]
  }
};


module.exports = merge(common,dev);