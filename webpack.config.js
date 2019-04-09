const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/script/Popstar.js'),
  output: {
    publicPath: '',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/assets/')
    }
  },
  module: {
    rules: [{
        test: /\.jsx?|es6$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        // 图片格式正则
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          // 配置 url-loader 的可选项
          options: {
            // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
            limit: 10000,
            // 超出限制，创建的文件格式
            // dist/images/[图片名].[hash].[图片格式]
            name: 'assets/img/[name].[hash:6].[ext]'
          }
        }]
      }
    ]
  },
  // 插件列表
  plugins: [
    // 输出的文件路径
    new ExtractTextPlugin("css/[name].[hash:6].css"),
    // new webpack.optimize.CommonsChunkPlugin({
    //   // vendor 的意义和之前相同
    //   // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度
    //   names: ['vendor', 'manifest'],
    //   // 配合 manifest 文件使用
    //   minChunks: Infinity
    // }),
    new HtmlWebpackPlugin({
      template: 'src/popstar.html'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: 'static',
      ignore: ['.*']
    }])
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {}
    }
  }
}