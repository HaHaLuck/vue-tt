//此配置为基础开发和打包配置  查找“待修改xx位置”按提示修改即可
var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//线上环境：'https://miniapp.by-health.com/projectName/' 测试环境：'https://h5-test.by-health.com/projectName/'
const publicPath = 'https://h5-test.by-health.com/projectName/';//静态资源位置  待修改1位置
module.exports = {
  entry: {
    main: './src/main.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.resolve(__dirname, 'src/')]
    }, {
      test: /\.(png|jpg|gif|svg|webp)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'images/[name].[ext]?[hash]'
      }
    },{
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'pages': path.resolve(__dirname, 'src/pages')
    },
    extensions: ['*', '.js', '.vue', '.less', '.css', '.json']
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  //生产环境
  module.exports.output = {
    path: path.resolve(__dirname, './dist/'),
    publicPath,
    chunkFilename: 'js/[name].[chunkhash].js',
    filename: 'js/[name].[chunkhash].js'
  };
  //打包不生成 map文件
  module.exports.devtool = false;
  module.exports.module.rules = (module.exports.module.rules || []).concat([{
    test: /\.vue$/,
    use: {
      loader: "vue-loader",
      options: {
        loaders: {
          css: ExtractTextPlugin.extract({
            use: 'css-loader'
          }),
          less: ExtractTextPlugin.extract({
            use: ["css-loader", "less-loader"]
          })
        }
      }
    }
  }, {
    test: /\.(jpe?g|png|gif|svg|webp)$/i,
    use: [{
      loader: 'img-loader',
      options: {
        pngquant: {
          quality: 50,
          speed: 3
        }
      }
    }]
  }, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader'
      }, {
        loader: 'less-loader'
      }]
    })
  }]);

  module.exports.plugins = (module.exports.plugins || []).concat([
    new CleanWebpackPlugin('dist/'),
  /*  new webpack.DllReferencePlugin({
      manifest: require('./dll/vue-manifest.json')
    }),*/
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({ //业务代码
      name: 'main',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
   /* new AddAssetHtmlPlugin([{
      filepath: './dll/vue.min.js',
      publicPath: publicPath + 'js/',
      outputPath: './js/',
      hash: true,
      includeSourcemap: false
    }])*/
  ])
} else if (process.env.NODE_ENV === 'development') {
  //开发环境
  //开启代码调试
  /*
  devtool
      eval: 速度最快，是能看出是什么文件第几行输出的，查看的是打包后的代码
      source-map: 速度一般， 能定位到源文件没被编译前的文件
  */
  module.exports.devtool = 'source-map';
  module.exports.output = {
    path: path.resolve(__dirname, './dist/'),
    filename: 'js/[name].js'
  };

  //开启 dev-server 热更新
  module.exports.devServer = {
    compress: true,
    hot: true,
    port: 9000,
    contentBase: path.resolve(__dirname, './dist/'),
    proxy: {
      '/maiyoucard': {//待修改2位置 接口转发
        target:'https://h5-test.by-health.com/' ,//待修改3位置
        changeOrigin: true,
        logLevel:'debug',
        pathRewrite: {
          '^/maiyoucard': 'maiyoucard'//待修改4位置
        }
      }
    }
  };
  module.exports.module.rules = (module.exports.module.rules || []).concat([{
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
      'less-loader',
    ],
  }, {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      loaders: {
        "css": ["vue-style-loader", {
          "loader": "css-loader",
          "options": {
            "sourceMap": true
          }
        }],
        "less": ["vue-style-loader", {
          "loader": "css-loader",
          "options": {
            "sourceMap": true
          }
        }, {
          "loader": "less-loader",
          "options": {
            "sourceMap": true
          }
        }],
      }
    }
  }]);
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.HotModuleReplacementPlugin()
  ])
}
