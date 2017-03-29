var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    proxy: './src/proxy/proxy',
    client: './src/client/client'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'XDomainObjectProxy.[name].js',
    library: ['XDomainObjectProxy', '[name]'],
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'client'
    }), // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'proxy.html',
      template: './src/proxy/proxy.ejs',
      title: 'proxy',
      chunks: ['proxy'],
      inject: 'head'
    })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
