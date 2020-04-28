/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const ENV = process.env.ENV || 'dev';
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';
const isProductionMode = ENV !== 'dev';

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'index.html'),
    templateParameters: {
      ENV: process.env.ENV,
    },
    favicon: path.resolve(__dirname, './src/images/favicon.ico'),
  }),
  new MiniCssExtractPlugin({
    filename: '[name]-[hash].css',
  }),
  new webpack.DefinePlugin({
    'process.env.ENV': JSON.stringify(ENV),
  }),
];
if (process.env.profile) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  mode: isProductionMode ? 'production' : 'development',
  output: {
    publicPath: '/',
    filename: isProductionMode ? '[name]-[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist'),
    crossOriginLoading: 'anonymous',
  },
  devtool: isProductionMode ? 'source-map' : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'awesome-typescript-loader'],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css$/,
        use: [
          {
            loader: isProductionMode
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: isProductionMode
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
          },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              sass: true,
              namedExport: true,
              camelCase: true,
              minimize: isProductionMode,
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('autoprefixer')(),
                require('postcss-plugin-px2rem')({
                  rootValue: 16,
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: isProductionMode ? 'compressed' : 'nested',
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
  },
  plugins,
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 5,
    },
    minimizer: isProductionMode
      ? [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
      : [],
  },
  devServer: {
    port,
    sockPort: port,
    host,
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist'),
    disableHostCheck: true,
    writeToDisk: true,
    open: true,
  },
};
