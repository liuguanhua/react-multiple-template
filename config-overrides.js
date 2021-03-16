const {
  override,
  addWebpackPlugin,
  addWebpackAlias,
  addDecoratorsLegacy,
  useBabelRc,
  overrideDevServer,
  removeModuleScopePlugin,
  babelInclude,
} = require('customize-cra')
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const utils = require('./config/utils')
const { getEntries, resolveApp } = utils
const multipleEntry = require('./react-app-rewire-multiple-entry')(getEntries())
const ANALYZER = process.env.ANALYZER

const useEntry = () => (config) => {
  multipleEntry.addMultiEntry(config)
  return config
}

// 查看打包后各包大小
const useAnalyzer = () => (config) => {
  ANALYZER && config.plugins.push(new BundleAnalyzerPlugin())
  return config
}

const useOutputPath = () => (config) => {
  const { mode: webpackEnv } = config
  const isEnvProduction = webpackEnv === 'production'
  const { output } = config
  if (isEnvProduction) {
    config = {
      ...config,
      output: {
        ...output,
        filename: '[name]/[name].[contenthash:8].js',
        chunkFilename: '[name]/[name].[contenthash:8].chunk.js',
      },
    }
    const defaultMiniCssExtractPlugin = config.plugins.filter(function (
      plugin
    ) {
      return plugin.constructor.name === 'MiniCssExtractPlugin'
    })[0]
    defaultMiniCssExtractPlugin.options.filename =
      '[name]/[name].[contenthash:8].css'
    defaultMiniCssExtractPlugin.options.chunkFilename =
      '[name]/[name].[contenthash:8].css'
  }
  return config
}

const useSplitChunks = () => (config) => {
  config.optimization.splitChunks = {
    chunks: 'initial',
    maxInitialRequests: Infinity,
    minSize: 0,
    cacheGroups: {
      commons: {
        minChunks: 2,
        name: 'commons',
        minSize: 0,
      },
      vendors: {
        //拆分第三方库
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: 5,
      },
      reactBase: {
        name: 'react-base',
        // test: (module) => {
        //   return /react|react-dom/.test(module.context);
        // },
        // test: /[\\/]node_modules[\\/](!react)(!react-dom)[\\/]/,
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        priority: 10,
      },
    },
  }

  return config
}

const devServerConfig = () => (config) => {
  return {
    ...config,
    // writeToDisk: true,
  }
}

const externals = [
  {
    module: 'react',
    entry:
      '//cdn.bootcdn.net/ajax/libs/react/17.0.1/umd/react.production.min.js',
    global: 'React',
  },
]
const useSMP = () => (config) => new SpeedMeasurePlugin().wrap(config)
const useExternal = (config) => {
  config.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
  }
  return config
}

module.exports = {
  webpack: override(
    useEntry(),
    addWebpackAlias({
      '@@': resolveApp(''),
      '@': resolveApp('src'),
      '@utils': resolveApp('utils'),
      '@pages': resolveApp('src/pages'),
      '@components': resolveApp('src/components'),
      '@assets': resolveApp('src/assets'),
      '@images': resolveApp('src/assets/images'),
      '@styles': resolveApp('src/assets/styles'),
      '@scripts': resolveApp('src/scripts'),
    }),
    addDecoratorsLegacy(),
    useBabelRc(),
    useAnalyzer(),
    useOutputPath(),
    useSplitChunks(),
    //ref:https://stackoverflow.com/a/61043925/7712404
    removeModuleScopePlugin(),
    babelInclude([resolveApp('src'), resolveApp('config')]),
    // useSMP(),
    addWebpackPlugin(
      // new HtmlWebpackExternalsPlugin({ externals }),
      // new HardSourceWebpackPlugin(),
      new ProgressBarPlugin({
        complete: '█',
        format: `${chalk.green('Building')} [ ${chalk.green(
          ':bar'
        )} ] ':msg:' ${chalk.bold('(:percent)')}`,
        clear: true,
      })
    )
  ),
  devServer: overrideDevServer(devServerConfig()),
}
