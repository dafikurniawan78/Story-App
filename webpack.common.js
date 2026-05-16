const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      // Bootstrap Icons font files
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views/index.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      title: 'Tambah Story',
      filename: 'add-story.html',
      template: path.resolve(__dirname, 'src/views/add-story.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      title: 'Tentang Kami',
      filename: 'about.html',
      template: path.resolve(__dirname, 'src/views/about.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      filename: 'login.html',
      template: path.resolve(__dirname, 'src/views/login.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      title: 'Register',
      filename: 'register.html',
      template: path.resolve(__dirname, 'src/views/register.html'),
      chunks: ['app'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
        {
          from: path.resolve(__dirname, 'src/data/'),
          to: path.resolve(__dirname, 'dist/data/'),
        },
      ],
    }),
  ],
};
