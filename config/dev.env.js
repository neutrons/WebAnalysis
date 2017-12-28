var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  IS_OFFLINE: process.env.IS_OFFLINE,
  FETCH_SANS_URL: process.env.FETCH_SANS_URL,
  FETCH_TAS_URL: process.env.FETCH_TAS_URL,
})
