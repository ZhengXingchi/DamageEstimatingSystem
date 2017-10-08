const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    vendors: ['bootstrap/dist/css/bootstrap.min.css','bootstrap/dist/js/bootstrap.min.js', 'angular','jquery']
  },

  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './public/dll'),
    library
  },
    module: {
    rules: [
      {
          test: /\.css$/,
          use:ExtractTextPlugin.extract( 
            {

              fallback: "style-loader",
              use: "css-loader"
            })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: 'url-loader?limit=2000&name=./fonts/[name].[ext]'
      }
        
    ]
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, 'public/dll/[name]-manifest.json'),
      // This must match the output.library option above
      name: library
    }),
    new ExtractTextPlugin('[name].dll.css')
  ]
}