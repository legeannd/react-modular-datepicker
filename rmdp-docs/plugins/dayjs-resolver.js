const path = require('path')

module.exports = function (context, options) {
  return {
    name: 'dayjs-plugin-resolver',
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            'dayjs/plugin/localeData': path.resolve(
              __dirname,
              '../node_modules/dayjs/plugin/localeData.js'
            ),
            'dayjs/plugin/isToday': path.resolve(
              __dirname,
              '../node_modules/dayjs/plugin/isToday.js'
            ),
          },
          extensionAlias: {
            '.js': ['.js', '.ts', '.tsx'],
          },
        },
      }
    },
  }
}
