const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    global: path.join(__dirname, '../global.ts'),
    main: [path.join(__dirname, '../scss/layouts/main.scss')],
    signin: [path.join(__dirname, '../scripts/signin/')],
    signup: [path.join(__dirname, '../scss/layouts/signup.scss')],
    home: [path.join(__dirname, '../scripts/home/index.ts')],
    webcomponents: [
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../bundles'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
