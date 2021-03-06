var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');

var ENV = process.env.NODE_ENV || 'development';
var isProd = ENV === 'production';

module.exports = {
  debug: !isProd,
  cache: !isProd,
  devtool: isProd ? '#eval' : '#cheap-module-eval-source-map',
  context: path.join(__dirname, './client'),
  entry: isProd ? {
    'error_pages': ['./error_pages.js'],
    'inject': ['whatwg-fetch', './inject.js'],
    'home': ['whatwg-fetch', './home.js'],
    'cols.frame': './cols.frame.js'
  } : {
    'error_pages': ['./error_pages.js'],
    'transfer': './transfer.js',
    'inject': ['whatwg-fetch', './inject.js'],
    'parity-utils/inject': ['whatwg-fetch', './inject.js'],
    'home': ['whatwg-fetch', './home.js'],
    'home/cols.frame': './cols.frame'
  },
  output: {
    path: isProd ? path.join(__dirname, '..', 'src', 'web') : path.join(__dirname, 'target'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: isProd ? ['babel'] : [
          'react-hot',
          'babel'
        ]
      },
      {
        test: /\.js$/,
        include: /dapps-react-components/,
        loaders: isProd ? ['babel'] : [
          'react-hot',
          'babel'
        ]
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: [/client/, /src/],
        exclude: /(error_pages.css$)|(normalize.css$)/,
        loaders: [
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      },
      {
        test: /(error_pages.css)|(normalize.css)$/,
        include: [/client/, /src/],
        loader: ExtractTextPlugin.extract(
          'style',
          'css',
          'postcss'
        )
      },
      {
        test: /\.css$/,
        exclude: [/client/, /src/],
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg|)$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.(woff(2)|ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      }
    ],
    noParse: [
      /node_modules\/sinon/
    ]
  },
  resolve: {
    root: path.join(__dirname, 'node_modules'),
    fallback: path.join(__dirname, 'node_modules'),
    extensions: ['', '.js', '.jsx'],
    unsafeCache: true
  },
  resolveLoaders: {
    root: path.join(__dirname, 'node_modules'),
    fallback: path.join(__dirname, 'node_modules')
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: (function () {
    var plugins = [
      new WebpackErrorNotificationPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(ENV),
          RPC_ADDRESS: JSON.stringify(process.env.RPC_ADDRESS),
          LOGGING: JSON.stringify(!isProd)
        }
      }),
      new ExtractTextPlugin('styles.css')
    ];

    if (isProd) {
      plugins.push(new webpack.optimize.OccurrenceOrderPlugin(false));
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        screwIe8: true,
        compress: {
          warnings: false
        },
        output: {
          comments: false
        }
      }));
    }

    return plugins;
  }()),
  devServer: {
    contentBase: './client',
    hot: !isProd,
    proxy: {
      '/rpc/*': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/api/*': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/wallet/*': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
};
