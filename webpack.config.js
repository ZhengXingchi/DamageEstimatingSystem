const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports={
	devtool:"eval-source-map",
	entry:{
		login:"./app/js/login/login.js",
    lgi_phone:"./app/js/login/lgi_phone.js"

	},
	output:{
		path:path.resolve(__dirname, './public/js'),
		filename:"[name].js"
	},
	devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true
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
	        use: 'url-loader?limit=2000&name=[path][name].[ext]'
	   	  },
        {
          test: /\.html$/,
          use:[{
            loader:'html-loader'
          }]
      }
        ,
	   	  {
          	include:path.resolve(__dirname, './app/dll') ,
          	use:{
             	loader: 'file-loader',
             	options: {
              	name: '../../public/dll/[name].[ext]'
             	}

            }
         

        }
	  ]
	},
   plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.DllReferencePlugin({
      		context: __dirname,
      		manifest: require('./public/dll/vendors-manifest.json')
    	}),
        new HtmlWebpackPlugin({
          filename:"../login/login.html",
          template:path.resolve(__dirname, './app/login/login.ejs'),
          inject:'head',
          chunks:['login']
      }),
      new HtmlWebpackPlugin({
          filename:"../login/lgi_phone.html",
          template:path.resolve(__dirname, './app/login/lgi_phone.ejs'),
          inject:'head',
          chunks:['lgi_phone']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',      
        filename: '[name].js',
        minChunks: 2,
      }),
      new ExtractTextPlugin('[name].css'),
      new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  })
    ]
}


