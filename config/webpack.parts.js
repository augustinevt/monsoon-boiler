const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const cssnano = require("cssnano");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require(
  "optimize-css-assets-webpack-plugin"
);

const PATHS = require('./paths');

// CODE

exports.loadJavascript = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        loader: ['babel-loader'],
      }
    ],
  },
});

// exports.loadMarkdown = ({include, exclude} = {}) => ({
//   module: {
//     rules: [
//       {
//         test: /\.md$/,
//         include,
//         exclude,
//         use: [
//           {
//             loader: "html-loader"
//           },
//           {
//             loader: "markdown-loader",
//             options: {
//             }
//           }
//         ],
//       }
//     ]
//   }
// });

exports.minifyJavaScript = () => ({
  plugins: [new UglifyWebpackPlugin()],
});

exports.loadRaw = ({include, exclude} = {}) => ({
  module: {
      rules: [
        {
          test: /\.md$/,
          include,
          exclude,
          use: 'raw-loader'
        }
      ]
    }
});

// STYLES

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false,
    }),
  ],
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')()
    ]),
  },
});

exports.loadStyles = ({include, exclude} = {}) => ({
   module: {
     rules: [
       {
         test: /\.(css|scss)$/,
         include,
         exclude,
         use: [
           { loader: 'style-loader', options: {sourceMap: true}},
           { loader: 'css-loader', options: {sourceMap: true, modules: false}},
           {
             loader: 'postcss-loader',
             options: {
               plugins: () => ([
                 require('autoprefixer')()
               ]),
             },
           },
           { loader: 'resolve-url-loader'},
           { loader: 'sass-loader', options: {
             sourceMap: true,
             includePaths: ['node_modules', 'src', '.']
           }}
         ]
       }
     ]
   }
 }
);

exports.extractCSS = ({ use } = {}) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    // `allChunks` is needed with CommonsChunkPlugin to extract
    // from extracted chunks as well.
    allChunks: true,
    filename: "static__styles__main.[contenthash:8].css",
  });

  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use
          })
        }
      ]
    },
    plugins: [plugin]
  };
};

// DEV SERVER

exports.devServer = ({host, port} = {}) => ({
  devServer: {
    hotOnly: true,
    historyApiFallback: true,
    stats: 'errors-only',
    host,
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
});

// SETUP


exports.setFreeVariable = (env) => {
  return {
    plugins: [new webpack.DefinePlugin(env)],
  };
};

exports.makeManifest = () => ({
  plugins: [
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ]
});

exports.HtmlWebpackPlugin = () => ({
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Monsoon Boilerplate',
      template: `${PATHS.public}/index.html`
    })
  ]
});
